import { ICON } from './icons.js';
import { softHaptic } from './haptics.js';

export function openSettingsSheet({
  state,
  waterReminderStatus,
  onDarkModeChange,
  onDevelopmentModeChange,
  onWaterReminderChange,
  onResetWeek
}) {
  document.querySelector('.settings-overlay')?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'settings-overlay';
  overlay.innerHTML = `<div class="settings-sheet" role="dialog" aria-modal="true" aria-label="Settings">
    <div class="settings-grabber"></div>
    <div class="settings-header"><h2>Settings</h2><button class="settings-close bare-icon-button" id="settingsClose" aria-label="Close settings">${ICON.close}</button></div>
    <div class="settings-group">
      <div class="settings-row appearance-row"><div class="settings-row-copy"><strong>Dark Mode</strong></div>
        <button class="theme-toggle ${state.darkMode ? 'is-dark' : ''}" id="themeToggle" type="button" role="switch" aria-checked="${state.darkMode}" aria-label="Dark Mode">
          <span class="theme-toggle-track" aria-hidden="true">
            <span class="theme-stars"><i></i><i></i><i></i><i></i></span>
            <span class="theme-cloud theme-cloud-a"></span>
            <span class="theme-cloud theme-cloud-b"></span>
            <span class="theme-toggle-orb">
              <svg class="theme-sun" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="6.2" fill="#FFD84D"/><g stroke="#FFD84D" stroke-width="1.8" stroke-linecap="round"><path d="M16 3.7v3M16 25.3v3M3.7 16h3M25.3 16h3M7.3 7.3l2.1 2.1M22.6 22.6l2.1 2.1M24.7 7.3l-2.1 2.1M9.4 22.6l-2.1 2.1"/></g></svg>
              <svg class="theme-moon" viewBox="0 0 32 32" fill="none" aria-hidden="true"><defs><mask id="themeMoonCut"><rect width="32" height="32" fill="white"/><circle cx="20.8" cy="11.4" r="9.2" fill="black"/></mask></defs><circle cx="15.7" cy="16" r="9.2" fill="#D9FBFF" mask="url(#themeMoonCut)"/><circle cx="12.5" cy="12.8" r="1" fill="#A4DDE4" opacity=".52"/><circle cx="13.8" cy="20.1" r=".8" fill="#A4DDE4" opacity=".42"/></svg>
            </span>
          </span>
        </button>
      </div>
    </div>
    <div class="settings-group">
      <div class="settings-row"><div class="settings-row-copy"><strong>Development Mode</strong><small>Allow set logging without check-in.</small></div><button class="ios-switch ${state.developmentMode ? 'is-on' : ''}" id="developmentModeToggle" role="switch" aria-checked="${state.developmentMode}"><span></span></button></div>
    </div>
    ${state.developmentMode ? '<div class="settings-dev-note">Development Mode bypasses the gym check-in gate. Turn it off for normal workout tracking.</div>' : ''}
    <div class="settings-group">
      <div class="settings-row"><div class="settings-row-copy"><strong>Water Reminder</strong><small id="waterReminderCopy">${waterReminderStatus}</small></div><button class="ios-switch ${state.waterReminderEnabled ? 'is-on' : ''}" id="waterReminderToggle" role="switch" aria-checked="${state.waterReminderEnabled}" aria-label="Water reminder every 30 minutes"><span></span></button></div>
    </div>
    <div class="settings-group">
      <button class="settings-action-row destructive" id="startNewWeekBtn" type="button"><span class="settings-action-icon" aria-hidden="true">${ICON.restart}</span><span class="settings-row-copy"><strong>Start New Week</strong><small>Reset this week's progress and gym visits.</small></span><span class="settings-action-chevron" aria-hidden="true">${ICON.chevron}</span></button>
      <div class="week-reset-confirm" id="weekResetConfirm" hidden><div class="week-reset-copy"><strong>Reset this week?</strong><small>Older weekly completion history stays saved. This week's progress starts from zero.</small></div><div class="week-reset-actions"><button type="button" class="week-reset-cancel" id="weekResetCancel">Cancel</button><button type="button" class="week-reset-go" id="weekResetGo">Start New Week</button></div></div>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('show')));

  const sheet = overlay.querySelector('.settings-sheet');
  let drag = null;
  let closeTimer = null;

  const close = () => {
    if (overlay.classList.contains('closing')) return;
    overlay.classList.add('closing');
    overlay.classList.remove('show');
    closeTimer = window.setTimeout(() => overlay.remove(), 430);
  };

  const resetDragStyles = () => {
    sheet?.classList.remove('is-dragging');
    sheet?.style.removeProperty('transform');
    sheet?.style.removeProperty('opacity');
    overlay.style.removeProperty('background');
    overlay.style.removeProperty('backdrop-filter');
    overlay.style.removeProperty('-webkit-backdrop-filter');
  };

  const dragStart = event => {
    if ((event.pointerType === 'mouse' && event.button !== 0) || overlay.classList.contains('closing') || event.target.closest('button,input,a')) return;
    drag = {
      id: event.pointerId,
      startY: event.clientY,
      startedAt: performance.now(),
      distance: 0
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    sheet?.classList.add('is-dragging');
  };

  const dragMove = event => {
    if (!drag || event.pointerId !== drag.id || !sheet) return;
    const distance = Math.max(0, event.clientY - drag.startY);
    drag.distance = distance;
    if (distance < 2) return;

    event.preventDefault();
    const progress = Math.min(1, distance / Math.max(220, sheet.offsetHeight * 0.52));
    sheet.style.setProperty('transform', `translate3d(0,${distance}px,0)`, 'important');
    sheet.style.setProperty('opacity', String(1 - progress * 0.08), 'important');
    const maxShade = state.darkMode ? 0.42 : 0.20;
    overlay.style.setProperty('background', `rgba(0,0,0,${Math.max(0, maxShade * (1 - progress))})`, 'important');
    overlay.style.setProperty('backdrop-filter', `blur(${Math.max(0, 2 * (1 - progress))}px)`, 'important');
    overlay.style.setProperty('-webkit-backdrop-filter', `blur(${Math.max(0, 2 * (1 - progress))}px)`, 'important');
  };

  const dragEnd = event => {
    if (!drag || event.pointerId !== drag.id || !sheet) return;
    const elapsed = Math.max(1, performance.now() - drag.startedAt);
    const velocity = drag.distance / elapsed;
    const shouldClose = drag.distance > Math.min(118, sheet.offsetHeight * 0.22) || velocity > 0.58;
    drag = null;
    resetDragStyles();

    if (shouldClose) {
      softHaptic(4);
      close();
      return;
    }

    sheet.classList.add('is-snapping-back');
    window.setTimeout(() => sheet.classList.remove('is-snapping-back'), 340);
  };

  sheet?.addEventListener('pointerdown', dragStart);
  sheet?.addEventListener('pointermove', dragMove, { passive: false });
  sheet?.addEventListener('pointerup', dragEnd);
  sheet?.addEventListener('pointercancel', dragEnd);

  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  overlay.querySelector('#settingsClose')?.addEventListener('click', close);

  overlay.querySelector('#themeToggle')?.addEventListener('click', event => {
    const enabled = !state.darkMode;
    const button = event.currentTarget;
    button.classList.toggle('is-dark', enabled);
    button.setAttribute('aria-checked', String(enabled));
    softHaptic(6);
    onDarkModeChange?.(enabled);
  });

  overlay.querySelector('#developmentModeToggle')?.addEventListener('click', event => {
    const enabled = !state.developmentMode;
    const button = event.currentTarget;
    button.classList.toggle('is-on', enabled);
    button.setAttribute('aria-checked', String(enabled));
    softHaptic(6);
    onDevelopmentModeChange?.(enabled);
  });

  overlay.querySelector('#waterReminderToggle')?.addEventListener('click', async event => {
    await onWaterReminderChange?.({
      button: event.currentTarget,
      copy: overlay.querySelector('#waterReminderCopy'),
      enabled: state.waterReminderEnabled
    });
  });

  const startNewWeekButton = overlay.querySelector('#startNewWeekBtn');
  const confirmation = overlay.querySelector('#weekResetConfirm');
  startNewWeekButton?.addEventListener('click', () => {
    startNewWeekButton.hidden = true;
    confirmation.hidden = false;
    requestAnimationFrame(() => confirmation.classList.add('show'));
    softHaptic(7);
  });
  overlay.querySelector('#weekResetCancel')?.addEventListener('click', () => {
    confirmation.classList.remove('show');
    setTimeout(() => {
      confirmation.hidden = true;
      startNewWeekButton.hidden = false;
    }, 180);
  });
  overlay.querySelector('#weekResetGo')?.addEventListener('click', () => {
    softHaptic([12, 34, 18]);
    close();
    onResetWeek?.();
  });

  return () => {
    if (closeTimer) clearTimeout(closeTimer);
    overlay.remove();
  };
}
