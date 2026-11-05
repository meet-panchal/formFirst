import { GYM_CHECK_IN_REASON, verifyGymCheckIn } from '../services/gym-checkin.js';
import { getActiveGymVisit } from '../core/gym-visits.js';
import { ICON } from '../ui/icons.js';

export function createGymAttendanceFeature({
  state,
  save,
  onUpdate,
  showToast,
  showGymCheckInNotice,
  onContinue,
  hasWorkoutProgress
}) {
  let pending = false;

  async function requestCheckIn() {
    if (pending) return;

    const button = document.getElementById('gymVisitToggle');
    const resetButton = () => {
      pending = false;
      if (!button) return;
      button.disabled = false;
      button.removeAttribute('aria-busy');
      button.removeAttribute('aria-disabled');
      button.classList.remove('is-busy');
      button.innerHTML = `<span class="button-icon">${ICON.faceId}</span><span>Check in with Face ID</span>`;
    };

    pending = true;
    if (button) {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.setAttribute('aria-disabled', 'true');
      button.classList.add('is-busy');
      button.innerHTML = '<span class="button-spinner" aria-hidden="true"></span><span>Verifying location…</span>';
    }

    const result = await verifyGymCheckIn({
      developmentMode: state.developmentMode,
      credentialId: state.biometricCredentialId,
      userId: state.biometricUserId,
      onBiometricStart: ({ enrolling }) => {
        if (button) button.innerHTML = `<span class="button-icon face-scan">${ICON.faceId}</span><span>Confirm with Face ID…</span>`;
        if (enrolling) showToast('Set up Face ID for Form First');
      }
    });

    if (!result.ok) {
      resetButton();
      if (result.reason === GYM_CHECK_IN_REASON.INACCURATE_LOCATION) {
        showGymCheckInNotice({ kind: 'accuracy', distance: result.distance, accuracy: result.accuracy, onRetry: requestCheckIn });
        return;
      }
      if (result.reason === GYM_CHECK_IN_REASON.OUTSIDE_GYM) {
        showGymCheckInNotice({ kind: 'away', distance: result.distance, accuracy: result.accuracy, onRetry: requestCheckIn });
        return;
      }

      const messages = {
        [GYM_CHECK_IN_REASON.GEOLOCATION_UNSUPPORTED]: 'Location is not available in this browser',
        [GYM_CHECK_IN_REASON.INSECURE_CONTEXT]: 'Gym check-in needs HTTPS or an installed PWA',
        [GYM_CHECK_IN_REASON.LOCATION_PERMISSION_DENIED]: 'Allow precise location to verify gym check-in',
        [GYM_CHECK_IN_REASON.LOCATION_UNAVAILABLE]: 'Could not get a reliable location',
        [GYM_CHECK_IN_REASON.BIOMETRIC_UNSUPPORTED]: 'Face ID verification needs a supported iPhone PWA over HTTPS',
        [GYM_CHECK_IN_REASON.BIOMETRIC_CANCELLED]: 'Face ID verification cancelled',
        [GYM_CHECK_IN_REASON.BIOMETRIC_ERROR]: 'Face ID verification could not be completed'
      };
      showToast(messages[result.reason] || 'Face ID verification could not be completed');
      return;
    }

    const checkInTime = new Date().toISOString();
    state.biometricCredentialId = result.credentialId;
    state.biometricUserId = result.userId;
    state.gymVisits.push({
      id: `visit-${Date.now()}`,
      checkIn: checkInTime,
      checkOut: null,
      verifiedDistance: Math.round(result.distance),
      accuracy: Math.round(result.accuracy),
      biometricVerified: true
    });
    save();
    pending = false;
    onUpdate();

    requestAnimationFrame(() => showGymCheckInNotice({
      kind: 'success',
      distance: result.distance,
      accuracy: result.accuracy,
      checkInTime,
      hasWorkoutProgress: hasWorkoutProgress(),
      onContinue
    }));
  }

  function checkOut() {
    const active = getActiveGymVisit(state.gymVisits);
    if (!active) {
      showToast('No active gym session');
      return;
    }
    active.checkOut = new Date().toISOString();
    save();
    onUpdate();
    setTimeout(() => showToast('Gym session checked out'), 80);
  }

  return {
    requestCheckIn,
    checkOut,
    isPending: () => pending
  };
}
