(() => {
  const MAX_SPLASH_WAIT_MS = 10_000;
  const FALLBACK_HOLD_MS = 360;
  const splash = document.getElementById('brandSplash');
  const video = document.getElementById('brandSplashVideo');
  if (!splash || !video) return;

  const standalone = Boolean(
    window.matchMedia?.('(display-mode: standalone)').matches
    || window.navigator.standalone === true
  );
  if (!standalone) {
    splash.hidden = true;
    return;
  }

  const reducedMotion = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  let appReady = document.documentElement.classList.contains('app-ready');
  let visualReady = false;
  let fallbackFrame = false;
  let finished = false;
  let fallbackTimer = null;
  let maximumTimer = null;

  const finishWhenReady = () => {
    if (finished || !appReady || !visualReady) return;
    finished = true;
    clearTimeout(fallbackTimer);
    clearTimeout(maximumTimer);

    // Keep the final decoded video frame under the fade. Swapping to a separate
    // PNG at this point caused a visible one-frame jump on iPhone.
    if (fallbackFrame) splash.classList.add('show-final');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      splash.classList.add('is-leaving');
      window.setTimeout(() => splash.remove(), 360);
    }));
  };

  const markVisualReady = ({ useFallback = false } = {}) => {
    if (visualReady) return;
    visualReady = true;
    fallbackFrame = useFallback;
    if (useFallback) {
      video.pause();
      splash.classList.add('show-final');
      fallbackTimer = window.setTimeout(finishWhenReady, FALLBACK_HOLD_MS);
      return;
    }
    finishWhenReady();
  };

  const onAppReady = () => {
    appReady = true;
    finishWhenReady();
  };
  window.addEventListener('formfirst:ready', onAppReady, { once: true });

  if (reducedMotion) {
    markVisualReady({ useFallback: true });
  } else {
    video.addEventListener('ended', () => markVisualReady(), { once: true });
    video.addEventListener('error', () => markVisualReady({ useFallback: true }), { once: true });
    video.addEventListener('playing', () => {
      clearTimeout(fallbackTimer);
      // The hard stop is a recovery guard for a stalled decoder, not the normal
      // splash duration. A successful video is allowed to reach its end event.
      maximumTimer = window.setTimeout(() => markVisualReady({ useFallback: true }), MAX_SPLASH_WAIT_MS);
    }, { once: true });

    maximumTimer = window.setTimeout(() => markVisualReady({ useFallback: true }), MAX_SPLASH_WAIT_MS);
    try {
      video.currentTime = 0;
      const playback = video.play();
      playback?.catch?.(() => markVisualReady({ useFallback: true }));
    } catch {
      markVisualReady({ useFallback: true });
    }
  }

  // The module app normally signals readiness after its first render. This
  // additional guard prevents a broken import from leaving the launch layer up.
  window.setTimeout(() => {
    if (!appReady) onAppReady();
  }, 12_000);
})();
