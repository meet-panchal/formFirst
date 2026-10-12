const DEFAULT_TIMEOUT_MS = 5_000;

export function notificationSupport() {
  return {
    supported: typeof Notification !== 'undefined' && 'serviceWorker' in navigator,
    permission: typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  };
}

export async function requestNotificationPermission() {
  if (typeof Notification === 'undefined') return 'unsupported';
  if (Notification.permission !== 'default') return Notification.permission;
  try { return await Notification.requestPermission(); }
  catch { return 'denied'; }
}

export async function getNotificationRegistration({ serviceWorkerUrl = './sw.js', timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (!('serviceWorker' in navigator)) return null;
  let registration = await navigator.serviceWorker.getRegistration();
  if (!registration) registration = await navigator.serviceWorker.register(serviceWorkerUrl);
  if (registration?.active) return registration;
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Service worker activation timed out')), timeoutMs))
  ]);
}

export async function showSystemNotification(title, options = {}) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return false;
  const registration = await getNotificationRegistration();
  if (!registration?.showNotification) return false;
  await registration.showNotification(title, options);
  return true;
}
