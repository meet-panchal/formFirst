import { WEB_PUSH_CONFIG } from '../config.js';

export function isWebPushConfigured() {
  return Boolean(WEB_PUSH_CONFIG.applicationServerPublicKey && WEB_PUSH_CONFIG.subscriptionEndpoint);
}

function isIOSHomeScreenApp() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!isIOS) return true;
  return window.navigator.standalone === true
    || window.matchMedia?.('(display-mode: standalone)').matches === true;
}

function supportsWebPush() {
  return typeof window !== 'undefined'
    && window.isSecureContext
    && 'serviceWorker' in navigator
    && 'PushManager' in window
    && 'Notification' in window;
}

function decodeApplicationServerKey(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const raw = atob(padded);
  return Uint8Array.from(raw, character => character.charCodeAt(0));
}

export async function getWebPushState() {
  if (!supportsWebPush()) return { supported: false, configured: isWebPushConfigured(), subscribed: false, permission: 'unsupported', reason: 'unsupported' };
  if (!isIOSHomeScreenApp()) return { supported: false, configured: isWebPushConfigured(), subscribed: false, permission: Notification.permission, reason: 'install-required' };
  let subscription = null;
  try {
    const registration = await navigator.serviceWorker.getRegistration('./');
    subscription = await registration?.pushManager?.getSubscription();
  } catch { /* The settings UI can still show capability without a subscription. */ }
  return {
    supported: true,
    configured: isWebPushConfigured(),
    subscribed: Boolean(subscription),
    permission: Notification.permission
  };
}

// Call only from an explicit user action (for example, the Settings switch).
// The POST/DELETE endpoint must store/remove the serialized PushSubscription on the server.
export async function enableWebPush() {
  if (!supportsWebPush()) return { ok: false, reason: 'unsupported' };
  if (!isIOSHomeScreenApp()) return { ok: false, reason: 'install-required' };
  if (!isWebPushConfigured()) return { ok: false, reason: 'server-not-configured' };

  const permission = Notification.permission === 'default'
    ? await Notification.requestPermission()
    : Notification.permission;
  if (permission !== 'granted') return { ok: false, reason: permission };

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  const createdHere = !subscription;
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: decodeApplicationServerKey(WEB_PUSH_CONFIG.applicationServerPublicKey)
    });
  }

  try {
    const response = await fetch(WEB_PUSH_CONFIG.subscriptionEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription.toJSON())
    });
    if (!response.ok) throw new Error(`Push subscription endpoint returned ${response.status}`);
  } catch (error) {
    if (createdHere) await subscription.unsubscribe().catch(() => false);
    throw error;
  }

  return { ok: true, subscription };
}

export async function disableWebPush() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return { ok: false, reason: 'unsupported' };
  const registration = await navigator.serviceWorker.getRegistration('./');
  const subscription = await registration?.pushManager?.getSubscription();
  if (!subscription) return { ok: true, alreadyDisabled: true };

  let serverRemovalSucceeded = !isWebPushConfigured();
  if (isWebPushConfigured()) {
    try {
      const response = await fetch(WEB_PUSH_CONFIG.subscriptionEndpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint })
      });
      serverRemovalSucceeded = response.ok;
    } catch { serverRemovalSucceeded = false; }
  }

  const browserRemovalSucceeded = await subscription.unsubscribe();
  return { ok: browserRemovalSucceeded, serverRemovalSucceeded };
}
