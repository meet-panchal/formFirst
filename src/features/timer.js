import { ICON } from '../ui/icons.js';
import { softHaptic } from '../ui/haptics.js';

const TIMER_PRESETS = Object.freeze([60, 90, 120]);
const DEFAULT_TIMER_SECONDS = 90;

export function createTimerFeature({
  app,
  isDevelopmentMode,
  onOpenSettings,
  onTestNotification,
  onRecoveryComplete
}) {
  let initialSeconds = DEFAULT_TIMER_SECONDS;
  let remainingSeconds = DEFAULT_TIMER_SECONDS;
  let remainingMs = DEFAULT_TIMER_SECONDS * 1_000;
  let deadline = 0;
  let animationFrameId = null;
  let lastDisplayedSecond = remainingSeconds;

  function formatTimer(seconds) {
    const safeSeconds = Math.max(0, Math.ceil(Number(seconds) || 0));
    const minutes = Math.floor(safeSeconds / 60);
    const secondsPart = safeSeconds % 60;
    return `${minutes}:${String(secondsPart).padStart(2, '0')}`;
  }

  function progressPercent() {
    const totalMs = Math.max(1, initialSeconds * 1_000);
    return Math.max(0, Math.min(100, (remainingMs / totalMs) * 100));
  }

  function pulseNumber() {
    const dial = document.getElementById('timerDial');
    if (!dial || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    dial.classList.remove('timer-tick');
    void dial.offsetWidth;
    dial.classList.add('timer-tick');
    window.setTimeout(() => dial.classList.remove('timer-tick'), 340);
  }

  function resetToReady() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    deadline = 0;
    remainingSeconds = initialSeconds;
    remainingMs = initialSeconds * 1_000;
    lastDisplayedSecond = initialSeconds;
  }

  function updateUI({ tick = false } = {}) {
    remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1_000));
    const readout = document.getElementById('timerReadout');
    if (readout) readout.textContent = formatTimer(remainingSeconds);

    const progress = progressPercent();
    const dial = document.getElementById('timerDial');
    if (dial) {
      dial.style.setProperty('--timer-progress', `${progress}%`);
      dial.classList.toggle('is-running', Boolean(animationFrameId));
      dial.classList.toggle('is-urgent', Boolean(animationFrameId) && remainingSeconds > 0 && remainingSeconds <= 10);
    }

    const arc = document.getElementById('timerRingProgress');
    if (arc) arc.style.strokeDashoffset = String(100 - progress);
    if (tick && animationFrameId && remainingSeconds > 0 && remainingSeconds <= 10) pulseNumber();

    const startButton = document.getElementById('timerStart');
    if (startButton) {
      startButton.innerHTML = `<span class="button-icon">${animationFrameId ? ICON.pause : ICON.play}</span><span>${animationFrameId ? 'Pause' : 'Start'}</span>`;
    }
  }

  function stop() {
    if (animationFrameId) {
      remainingMs = Math.max(0, deadline - performance.now());
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
      deadline = 0;
    }
    lastDisplayedSecond = Math.max(0, Math.ceil(remainingMs / 1_000));
    updateUI();
  }

  function frame(now) {
    if (!animationFrameId) return;

    remainingMs = Math.max(0, deadline - now);
    const displayedSecond = Math.max(0, Math.ceil(remainingMs / 1_000));
    const tick = displayedSecond !== lastDisplayedSecond;
    if (tick) lastDisplayedSecond = displayedSecond;

    if (remainingMs <= 0) {
      const completedDuration = initialSeconds;
      animationFrameId = null;
      deadline = 0;
      softHaptic([12, 42, 18]);
      onRecoveryComplete?.(completedDuration);
      resetToReady();
      updateUI();
      return;
    }

    updateUI({ tick });
    animationFrameId = requestAnimationFrame(frame);
  }

  function startOrPause() {
    if (animationFrameId) {
      stop();
      return;
    }
    if (remainingMs <= 0) resetToReady();

    const dial = document.getElementById('timerDial');
    const readout = document.getElementById('timerReadout');
    const arc = document.getElementById('timerRingProgress');
    const startButton = document.getElementById('timerStart');
    const stableMs = Math.max(0, Math.round(remainingMs));

    remainingMs = stableMs;
    remainingSeconds = Math.max(0, Math.ceil(stableMs / 1_000));
    lastDisplayedSecond = remainingSeconds;
    dial?.classList.remove('timer-tick', 'is-urgent');
    dial?.classList.add('timer-start-stable');
    if (readout) readout.textContent = formatTimer(remainingSeconds);
    if (arc) arc.style.strokeDashoffset = String(100 - progressPercent());

    deadline = performance.now() + stableMs;
    animationFrameId = requestAnimationFrame(frame);
    dial?.classList.add('is-running');
    if (startButton) startButton.innerHTML = `<span class="button-icon">${ICON.pause}</span><span>Pause</span>`;
    requestAnimationFrame(() => requestAnimationFrame(() => dial?.classList.remove('timer-start-stable')));
  }

  function selectPreset(seconds) {
    stop();
    initialSeconds = Number(seconds);
    remainingSeconds = initialSeconds;
    remainingMs = initialSeconds * 1_000;
    lastDisplayedSecond = initialSeconds;
    app.querySelectorAll('[data-timer-preset]').forEach(button => {
      button.classList.toggle('active', Number(button.dataset.timerPreset) === initialSeconds);
    });
    updateUI();
  }

  function reset() {
    stop();
    remainingSeconds = initialSeconds;
    remainingMs = initialSeconds * 1_000;
    lastDisplayedSecond = initialSeconds;
    updateUI();
  }

  function syncDevelopmentModeUI() {
    const controls = document.getElementById('timerControls');
    let testButton = document.getElementById('testNotificationBtn');

    if (isDevelopmentMode() && controls && !testButton) {
      testButton = document.createElement('button');
      testButton.className = 'test-notification-btn';
      testButton.id = 'testNotificationBtn';
      testButton.type = 'button';
      testButton.innerHTML = `<span class="button-icon">${ICON.bell}</span><span>Test Notification</span>`;
      controls.appendChild(testButton);
      testButton.addEventListener('click', event => onTestNotification?.(event.currentTarget));
    } else if (!isDevelopmentMode()) {
      testButton?.remove();
    }
  }

  function render() {
    const progress = progressPercent();
    app.innerHTML = `<main class="screen note-theme nav-screen">
      <header class="topbar note-topbar workout-topbar"><span class="topbar-spacer" aria-hidden="true"></span><span class="topbar-spacer" aria-hidden="true"></span><button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${ICON.settings}</button></header>
      <div class="container nav-page-container timer-page">
        <section class="timer-note-card">
          <span class="note-kicker">Recovery</span><p>Keep the break intentional, then get back to your next set.</p>
          <div class="timer-dial ${animationFrameId ? 'is-running' : ''}" id="timerDial" style="--timer-progress:${progress}%">
            <svg class="timer-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle class="timer-ring-track" cx="60" cy="60" r="52" pathLength="100"></circle>
              <circle class="timer-ring-progress" id="timerRingProgress" cx="60" cy="60" r="52" pathLength="100" stroke-dasharray="100" stroke-dashoffset="${100 - progress}"></circle>
            </svg>
            <div class="timer-dial-content"><strong id="timerReadout">${formatTimer(remainingMs / 1_000)}</strong><small>remaining</small></div>
          </div>
          <div class="timer-controls" id="timerControls">
            <div class="timer-presets">${TIMER_PRESETS.map(seconds => `<button data-timer-preset="${seconds}" class="${initialSeconds === seconds ? 'active' : ''}">${seconds}s</button>`).join('')}</div>
            <div class="timer-actions"><button class="secondary-timer-btn" id="timerReset"><span class="button-icon">${ICON.restart}</span><span>Reset</span></button><button class="primary-timer-btn" id="timerStart"><span class="button-icon">${animationFrameId ? ICON.pause : ICON.play}</span><span>${animationFrameId ? 'Pause' : 'Start'}</span></button></div>
            ${isDevelopmentMode() ? `<button class="test-notification-btn" id="testNotificationBtn" type="button"><span class="button-icon">${ICON.bell}</span><span>Test Notification</span></button>` : ''}
          </div>
        </section>
      </div>
    </main>`;

    app.querySelectorAll('[data-timer-preset]').forEach(button => {
      button.addEventListener('click', () => selectPreset(button.dataset.timerPreset));
    });
    document.getElementById('timerStart')?.addEventListener('click', startOrPause);
    document.getElementById('timerReset')?.addEventListener('click', reset);
    document.getElementById('testNotificationBtn')?.addEventListener('click', event => onTestNotification?.(event.currentTarget));
    document.getElementById('moreBtn')?.addEventListener('click', () => onOpenSettings?.());
    updateUI();
  }

  return Object.freeze({
    render,
    syncDevelopmentModeUI
  });
}
