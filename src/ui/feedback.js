import { GYM_LOCATION } from '../config.js';
import { formatClockTime } from '../core/date-time.js';
import { ICON } from './icons.js';
import { softHaptic } from './haptics.js';

let dismissTimer = null;
let removeTimer = null;

export function dismissFeedbackNotice({ swiped = false } = {}) {
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }

  const banner = document.getElementById('recoveryRewardBanner');
  if (!banner) return;

  banner.style.removeProperty('transform');
  banner.style.removeProperty('opacity');
  banner.style.removeProperty('transition');
  if (swiped) {
    banner.classList.add('is-swiped-away');
  } else {
    banner.classList.remove('show');
  }
  if (removeTimer) clearTimeout(removeTimer);
  removeTimer = window.setTimeout(() => {
    banner.remove();
    removeTimer = null;
  }, 320);
}

function replaceNotice({ className, role = 'status', ariaLive = 'polite', markup, duration, haptic }) {
  dismissFeedbackNotice();
  document.getElementById('recoveryRewardBanner')?.remove();

  const banner = document.createElement('aside');
  banner.id = 'recoveryRewardBanner';
  banner.className = className;
  banner.setAttribute('role', role);
  banner.setAttribute('aria-live', ariaLive);
  banner.innerHTML = markup;
  document.body.appendChild(banner);

  // Match iOS notification behavior: no close affordance; swipe the notice up to dismiss.
  let swipe = null;
  banner.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' || event.button !== 0 || event.target.closest('button, a, input')) return;
    swipe = { id: event.pointerId, startY: event.clientY, currentY: event.clientY, startedAt: performance.now(), moved: false };
    try { banner.setPointerCapture(event.pointerId); } catch { /* Pointer capture is optional. */ }
  });
  banner.addEventListener('pointermove', event => {
    if (!swipe || swipe.id !== event.pointerId) return;
    const deltaY = event.clientY - swipe.startY;
    if (deltaY >= 0) return;
    swipe.currentY = event.clientY;
    swipe.moved = Math.abs(deltaY) > 6;
    if (!swipe.moved) return;
    event.preventDefault();
    banner.style.transition = 'none';
    banner.style.transform = `translate3d(-50%, ${deltaY}px, 0) scale(${Math.max(.94, 1 - Math.abs(deltaY) / 700)})`;
    banner.style.opacity = String(Math.max(0, 1 - Math.abs(deltaY) / 110));
  });
  const finishSwipe = event => {
    if (!swipe || swipe.id !== event.pointerId) return;
    const current = swipe;
    swipe = null;
    const deltaY = current.currentY - current.startY;
    const elapsed = Math.max(1, performance.now() - current.startedAt);
    const upwardVelocity = Math.max(0, -deltaY / elapsed);
    if (deltaY <= -48 || (deltaY <= -24 && upwardVelocity > .35)) {
      dismissFeedbackNotice({ swiped: true });
      return;
    }
    banner.style.removeProperty('transform');
    banner.style.removeProperty('opacity');
    banner.style.removeProperty('transition');
  };
  banner.addEventListener('pointerup', finishSwipe);
  banner.addEventListener('pointercancel', finishSwipe);
  requestAnimationFrame(() => banner.classList.add('show'));
  if (haptic) softHaptic(haptic);

  if (duration > 0) dismissTimer = window.setTimeout(dismissFeedbackNotice, duration);
  return banner;
}

function notificationCopyForMessage(message, type = 'info') {
  const normalized = String(message || '').trim();
  const entries = [
    ['Location is not available in this browser', 'Location unavailable', 'This browser can’t provide the location needed for gym attendance.'],
    ['Gym check-in needs HTTPS or an installed PWA', 'Secure app required', 'Open Form First from HTTPS or the installed Home Screen app before checking in.'],
    ['Set up Face ID for Form First', 'Face ID setup', 'Finish the Face ID prompt before Form First records a verified gym visit.'],
    ['Face ID verification needs a supported iPhone PWA over HTTPS', 'Face ID unavailable', 'Use the installed iPhone PWA over HTTPS to verify gym attendance with Face ID.'],
    ['Face ID verification cancelled', 'Face ID cancelled', 'No check-in was recorded. You can try again whenever you’re ready.'],
    ['Face ID verification could not be completed', 'Face ID not verified', 'Form First couldn’t verify device identity, so no check-in was recorded.'],
    ['Allow precise location to verify gym check-in', 'Precise location needed', 'Enable Precise Location for Form First, then try checking in again.'],
    ['Could not get a reliable location', 'Location unavailable', 'Form First couldn’t get a reliable GPS reading. Move to a clearer area and try again.'],
    ['No active gym session', 'No active gym session', 'There isn’t a current verified visit to check out.'],
    ['Gym session checked out', 'Gym session complete', 'Today’s check-out time has been saved.'],
    ['Notifications are not available in this browser', 'Notifications unavailable', 'This browser can’t display Form First system notifications.'],
    ['Allow notifications in iOS Settings to run the test', 'Notification permission needed', 'Allow Form First notifications in iOS Settings, then run the test again.'],
    ['Could not send the test notification', 'Test notification failed', 'Form First couldn’t deliver the sample notification on this device.'],
    ['New week started', 'New week started', 'This week’s completion progress and gym visits were reset while your reps and weights were kept.'],
    ['Form guide unavailable for this exercise', 'Form guide unavailable', 'No verified external form guide is mapped to this exercise yet.']
  ];

  const matched = entries.find(([needle]) => normalized.includes(needle));
  if (matched) {
    return {
      eyebrow: type === 'success' ? 'Completed' : 'Form First',
      title: matched[1],
      message: matched[2]
    };
  }

  return {
    eyebrow: type === 'success' ? 'Completed' : 'Form First',
    title: normalized || 'Update',
    message: type === 'success' ? 'The update has been saved.' : 'Review this message, then continue when you’re ready.'
  };
}

export function showAppNotice({
  kind = 'info',
  eyebrow = 'Form First',
  title = 'Update',
  message = '',
  icon = null,
  footnote = '',
  actionLabel = '',
  onAction = null,
  duration = 7_000
} = {}) {
  const badgeIcon = icon || (kind === 'success' ? ICON.check : ICON.info || ICON.location);
  const banner = replaceNotice({
    className: `recovery-reward-banner app-feedback-notice app-feedback-generic is-${kind}`,
    role: kind === 'success' ? 'status' : 'alert',
    ariaLive: kind === 'success' ? 'polite' : 'assertive',
    duration,
    haptic: kind === 'success' ? [8, 34, 12] : 6,
    markup: `
      <div class="recovery-reward-head">
        <div class="recovery-reward-badge" aria-hidden="true">
          <span class="recovery-reward-rays"></span>
          <span class="recovery-reward-check">${badgeIcon}</span>
        </div>
        <div class="recovery-reward-copy">
          <span class="recovery-reward-eyebrow">${eyebrow}</span>
          <strong>${title}</strong>
          <span>${message}</span>
        </div>
      </div>
      <div class="recovery-reward-progress app-feedback-generic-body ${actionLabel ? 'has-action' : ''}">
        <span class="recovery-reward-next">${footnote || (kind === 'success' ? 'Saved in Form First' : 'Your current page and workout state are preserved.')}</span>
        ${actionLabel ? `<button class="recovery-reward-action" type="button"><span>${actionLabel}</span>${ICON.chevron}</button>` : ''}
      </div>`
  });

  banner.querySelector('.recovery-reward-action')?.addEventListener('click', () => {
    dismissFeedbackNotice();
    softHaptic(7);
    onAction?.();
  });
}

export function showToast(message, type = 'info') {
  const copy = notificationCopyForMessage(message, type);
  showAppNotice({
    kind: type === 'success' ? 'success' : type === 'lock' ? 'warning' : 'info',
    eyebrow: copy.eyebrow,
    title: copy.title,
    message: copy.message,
    icon: type === 'lock' ? ICON.faceId || ICON.info : type === 'success' ? ICON.check : ICON.info,
    duration: type === 'success' ? 6_500 : 8_000
  });
}

export function showGymCheckInNotice({
  kind = 'success',
  distance = null,
  accuracy = null,
  checkInTime = null,
  hasWorkoutProgress = false,
  onContinue,
  onRetry
} = {}) {
  const isSuccess = kind === 'success';
  const isAccuracy = kind === 'accuracy';
  const safeDistance = Number.isFinite(distance) ? Math.max(0, Math.round(distance)) : null;
  const safeAccuracy = Number.isFinite(accuracy) ? Math.max(0, Math.round(accuracy)) : null;
  const actionLabel = isSuccess ? (hasWorkoutProgress ? 'Continue Workout' : 'Start Workout') : 'Try Again';
  const eyebrow = isSuccess ? 'Check-In Verified' : isAccuracy ? 'Location Needs Attention' : 'Check-In Unavailable';
  const title = isSuccess ? 'You’re Checked In' : isAccuracy ? 'Get a Clearer Location Signal' : 'You’re Outside the Gym Area';
  const supporting = isSuccess
    ? 'Location and Face ID are verified.'
    : isAccuracy
      ? 'Move to an open area so Form First can get a more reliable location, then try again.'
      : `Move within ${GYM_LOCATION.radiusMeters} m of the gym to check in.`;
  const footnote = isSuccess
    ? `Checked in at ${formatClockTime(checkInTime || new Date())}`
    : isAccuracy
      ? 'A clearer signal helps prevent an incorrect gym check-in.'
      : 'Move closer to the gym, then try again.';
  const metrics = isSuccess
    ? `<div><small>Distance</small><strong>${safeDistance === null ? '—' : `${safeDistance} m`}</strong></div>
       <div><small>Accuracy</small><strong>${safeAccuracy === null ? '—' : `${safeAccuracy} m`}</strong></div>
       <div><small>Check-In</small><strong>${formatClockTime(checkInTime || new Date())}</strong></div>`
    : `<div><small>Current Accuracy</small><strong>${safeAccuracy === null ? '—' : `${safeAccuracy} m`}</strong></div>
       <div><small>Distance From Gym</small><strong>${safeDistance === null ? '—' : `${safeDistance} m`}</strong></div>`;

  const banner = replaceNotice({
    className: `recovery-reward-banner app-feedback-notice ${isSuccess ? 'is-success' : isAccuracy ? 'is-accuracy' : 'is-away'}`,
    role: isSuccess ? 'status' : 'alert',
    ariaLive: isSuccess ? 'polite' : 'assertive',
    duration: isSuccess ? 9_000 : 12_000,
    haptic: isSuccess ? [10, 45, 14] : 8,
    markup: `
      <div class="recovery-reward-head">
        <div class="recovery-reward-badge" aria-hidden="true">
          <span class="recovery-reward-rays"></span>
          <span class="recovery-reward-check">${isSuccess ? ICON.check : ICON.location}</span>
        </div>
        <div class="recovery-reward-copy">
          <span class="recovery-reward-eyebrow">${eyebrow}</span>
          <strong>${title}</strong>
          <span>${supporting}</span>
        </div>
      </div>
      <div class="recovery-reward-progress app-feedback-progress ${isSuccess ? '' : 'is-retry'}">
        <div class="app-feedback-metrics" aria-label="Check-in details">${metrics}</div>
        <span class="recovery-reward-next">${footnote}</span>
        <button class="recovery-reward-action" type="button"><span>${actionLabel}</span>${isSuccess ? ICON.chevron : ICON.restart}</button>
      </div>`
  });

  banner.querySelector('.recovery-reward-action')?.addEventListener('click', () => {
    dismissFeedbackNotice();
    softHaptic(7);
    if (isSuccess) onContinue?.();
    else onRetry?.();
  });
}

export function showRecoveryRewardNotice({ durationSeconds, dayNumber, stats, onContinue }) {
  const remaining = Math.max(0, stats.total - stats.done);
  const dayPercent = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
  const banner = replaceNotice({
    className: 'recovery-reward-banner',
    duration: 8_500,
    markup: `
      <div class="recovery-reward-head">
        <div class="recovery-reward-badge" aria-hidden="true">
          <span class="recovery-reward-rays"></span>
          <span class="recovery-reward-check">${ICON.check}</span>
        </div>
        <div class="recovery-reward-copy">
          <span class="recovery-reward-eyebrow">Recovery complete</span>
          <strong>Ready for your next set</strong>
          <span>${durationSeconds}s rest finished</span>
        </div>
      </div>
      <div class="recovery-reward-progress" aria-label="Day ${dayNumber} workout progress">
        <div class="recovery-reward-progress-row"><span>Day ${dayNumber}</span><strong>${stats.done}/${stats.total} sets</strong></div>
        <div class="recovery-reward-track" aria-hidden="true"><i style="width:${dayPercent}%"></i></div>
        <span class="recovery-reward-next">${remaining ? `${remaining} working set${remaining === 1 ? '' : 's'} left today` : 'Today’s workout is complete'}</span>
        <button class="recovery-reward-action" type="button"><span>Continue workout</span>${ICON.chevron}</button>
      </div>`
  });

  banner.querySelector('.recovery-reward-action')?.addEventListener('click', () => {
    dismissFeedbackNotice();
    softHaptic(7);
    onContinue?.();
  });
}
