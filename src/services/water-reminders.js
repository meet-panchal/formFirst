import {
  notificationSupport,
  requestNotificationPermission,
  showSystemNotification
} from './notifications.js';
import { softHaptic } from '../ui/haptics.js';

const APP_ICON = './icons/icon-192.png';

export function createWaterReminderController({
  state,
  save,
  intervalMs,
  showToast
}) {
  let timerId = null;

  function clearTimer() {
    if (!timerId) return;
    clearTimeout(timerId);
    timerId = null;
  }

  function statusText() {
    if (!state.waterReminderEnabled) return 'Every 30 minutes';
    if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
      return 'Notifications are blocked in system settings';
    }
    return 'On · every 30 minutes';
  }

  async function showReminderNotification() {
    if (!state.waterReminderEnabled) return false;
    try {
      return await showSystemNotification('Time to drink water', {
        body: 'Take a quick hydration break.',
        icon: APP_ICON,
        badge: APP_ICON,
        tag: 'form-first-water-reminder',
        renotify: true,
        silent: false
      });
    } catch (error) {
      console.warn('Water reminder notification failed', error);
      return false;
    }
  }

  async function showTestNotification(button) {
    if (!state.developmentMode) return false;
    if (!notificationSupport().supported) {
      showToast('Notifications are not available in this browser', 'info');
      return false;
    }

    const setButtonState = (label, busy = false) => {
      if (!button) return;
      button.disabled = busy;
      button.classList.toggle('is-busy', busy);
      const labelNode = button.querySelector('span:last-child');
      if (labelNode) labelNode.textContent = label;
    };

    setButtonState('Preparing…', true);
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      setButtonState('Test Notification', false);
      showToast('Allow notifications in iOS Settings to run the test', 'info');
      return false;
    }

    try {
      const sent = await showSystemNotification('Form First', {
        body: 'Hydration reminder 💧 Take a few sips of water before your next set.',
        icon: APP_ICON,
        badge: APP_ICON,
        tag: 'form-first-development-test',
        renotify: true,
        silent: false,
        data: { source: 'development-test', url: './index.html' }
      });
      if (!sent) throw new Error('Service worker notification API unavailable');

      softHaptic(7);
      setButtonState('Notification Sent', false);
      button?.classList.add('is-sent');
      setTimeout(() => {
        if (!button?.isConnected) return;
        setButtonState('Test Notification', false);
        button.classList.remove('is-sent');
      }, 1_500);
      return true;
    } catch (error) {
      console.warn('Test notification failed', error);
      setButtonState('Test Notification', false);
      showToast(
        window.isSecureContext
          ? 'Could not send the test notification'
          : 'Notifications need HTTPS or an installed PWA',
        'info'
      );
      return false;
    }
  }

  function schedule({ fresh = false } = {}) {
    clearTimer();
    if (!state.waterReminderEnabled) return;

    const now = Date.now();
    if (fresh || !state.waterReminderNextAt) state.waterReminderNextAt = now + intervalMs;
    if (state.waterReminderNextAt <= now) {
      void showReminderNotification();
      state.waterReminderNextAt = now + intervalMs;
      save();
    }

    const delay = Math.max(1_000, state.waterReminderNextAt - Date.now());
    timerId = setTimeout(async () => {
      if (!state.waterReminderEnabled) return;
      await showReminderNotification();
      state.waterReminderNextAt = Date.now() + intervalMs;
      save();
      schedule();
    }, delay);
    save();
  }

  async function enable(button, copy) {
    if (!notificationSupport().supported) {
      if (copy) copy.textContent = 'System notifications are not supported in this browser.';
      return false;
    }

    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      state.waterReminderEnabled = false;
      state.waterReminderNextAt = null;
      save();
      clearTimer();
      button?.classList.remove('is-on');
      button?.setAttribute('aria-checked', 'false');
      if (copy) copy.textContent = permission === 'denied'
        ? 'Notifications are blocked in system settings.'
        : 'Notification permission is required.';
      return false;
    }

    state.waterReminderEnabled = true;
    state.waterReminderNextAt = Date.now() + intervalMs;
    save();
    schedule();
    button?.classList.add('is-on');
    button?.setAttribute('aria-checked', 'true');
    if (copy) copy.textContent = 'On · every 30 minutes';
    softHaptic(7);
    return true;
  }

  function disable(button, copy) {
    state.waterReminderEnabled = false;
    state.waterReminderNextAt = null;
    save();
    clearTimer();
    button?.classList.remove('is-on');
    button?.setAttribute('aria-checked', 'false');
    if (copy) copy.textContent = 'Every 30 minutes';
    softHaptic(5);
  }

  return Object.freeze({
    statusText,
    schedule,
    enable,
    disable,
    showTestNotification,
    dispose: clearTimer
  });
}
