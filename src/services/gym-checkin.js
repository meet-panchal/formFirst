import { GYM_LOCATION } from '../config.js';
import { distanceMeters, getCurrentPosition } from './geolocation.js';
import { verifyPlatformBiometric } from './biometrics.js';

export const GYM_CHECK_IN_REASON = Object.freeze({
  GEOLOCATION_UNSUPPORTED: 'geolocation-unsupported',
  INSECURE_CONTEXT: 'insecure-context',
  LOCATION_PERMISSION_DENIED: 'location-permission-denied',
  LOCATION_UNAVAILABLE: 'location-unavailable',
  INACCURATE_LOCATION: 'inaccurate-location',
  OUTSIDE_GYM: 'outside-gym',
  BIOMETRIC_UNSUPPORTED: 'biometric-unsupported',
  BIOMETRIC_CANCELLED: 'biometric-cancelled',
  BIOMETRIC_ERROR: 'biometric-error'
});

export async function verifyGymCheckIn({
  developmentMode = false,
  credentialId = null,
  userId = null,
  gymLocation = GYM_LOCATION,
  onBiometricStart = null
} = {}) {
  if (!navigator.geolocation) {
    return { ok: false, reason: GYM_CHECK_IN_REASON.GEOLOCATION_UNSUPPORTED };
  }

  if (!window.isSecureContext) {
    return { ok: false, reason: GYM_CHECK_IN_REASON.INSECURE_CONTEXT };
  }

  let position;
  try {
    position = await getCurrentPosition();
  } catch (error) {
    return {
      ok: false,
      reason: error?.code === 1
        ? GYM_CHECK_IN_REASON.LOCATION_PERMISSION_DENIED
        : GYM_CHECK_IN_REASON.LOCATION_UNAVAILABLE
    };
  }

  const { latitude, longitude, accuracy } = position.coords;
  const distance = distanceMeters(latitude, longitude, gymLocation.lat, gymLocation.lng);
  const locationContext = { distance, accuracy };

  // Development Mode intentionally bypasses only the GPS accuracy gate.
  // Distance and biometric verification still apply.
  if (!developmentMode && accuracy > gymLocation.accuracyMeters) {
    return { ok: false, reason: GYM_CHECK_IN_REASON.INACCURATE_LOCATION, ...locationContext };
  }

  if (distance > gymLocation.radiusMeters) {
    return { ok: false, reason: GYM_CHECK_IN_REASON.OUTSIDE_GYM, ...locationContext };
  }

  onBiometricStart?.({ enrolling: !credentialId, ...locationContext });
  const biometric = await verifyPlatformBiometric({ credentialId, userId });
  if (!biometric.ok) {
    const reason = biometric.reason === 'unsupported'
      ? GYM_CHECK_IN_REASON.BIOMETRIC_UNSUPPORTED
      : biometric.reason === 'cancelled'
        ? GYM_CHECK_IN_REASON.BIOMETRIC_CANCELLED
        : GYM_CHECK_IN_REASON.BIOMETRIC_ERROR;

    return { ok: false, reason, ...locationContext };
  }

  return {
    ok: true,
    ...locationContext,
    credentialId: biometric.credentialId,
    userId: biometric.userId,
    enrolled: Boolean(biometric.enrolled)
  };
}
