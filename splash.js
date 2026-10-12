(() => {
  const SPLASH_SESSION_KEY = 'formfirst-brand-splash-shown';
  const MAX_SPLASH_MS = 2_800;

  const splash = document.getElementById('brandSplash');
  const video = document.getElementById('brandSplashVideo');
  if (!splash || !video) return;

  const reducedMotion = Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  const standalone = Boolean(
    window.matchMedia?.('(display-mode: standalone)').matches
    || window.navigator.standalone === true
  );

  const readSplashShown = () => {
    try { return sessionStorage.getItem(SPLASH_SESSION_KEY) === '1'; }
    catch { return false; }
  };

  const markSplashShown = () => {
    try { sessionStorage.setItem(SPLASH_SESSION_KEY, '1'); }
    catch { /* Session storage is optional for the launch experience. */ }
  };

  if (!standalone || readSplashShown()) {
    splash.hidden = true;
    return;
  }

  markSplashShown();

  let finished = false;
  let fallbackTimer = null;
  const finish = () => {
    if (finished) return;
    finished = true;
    if (fallbackTimer) clearTimeout(fallbackTimer);
    splash.classList.add('show-final');
    window.setTimeout(() => splash.classList.add('is-leaving'), reducedMotion ? 220 : 120);
    window.setTimeout(() => splash.remove(), reducedMotion ? 380 : 520);
  };

  if (reducedMotion) {
    fallbackTimer = window.setTimeout(finish, 420);
    return;
  }

  video.addEventListener('ended', finish, { once: true });
  video.addEventListener('error', finish, { once: true });

  fallbackTimer = window.setTimeout(finish, MAX_SPLASH_MS);
  const playback = video.play();
  playback?.catch?.(() => {
    if (fallbackTimer) clearTimeout(fallbackTimer);
    fallbackTimer = window.setTimeout(finish, 700);
  });
})();
