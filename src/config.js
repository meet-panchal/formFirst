export const GYM_LOCATION = Object.freeze({
  lat: 22.273556,
  lng: 73.180375,
  radiusMeters: 100,
  accuracyMeters: 100
});

export const WATER_REMINDER_INTERVAL_MS = 30 * 60 * 1000;

// Public-only Web Push configuration. The matching VAPID private key must stay on the push server.
// Set both values after a push backend is deployed; the app intentionally keeps the control disabled otherwise.
export const WEB_PUSH_CONFIG = Object.freeze({
  applicationServerPublicKey: '',
  subscriptionEndpoint: ''
});
