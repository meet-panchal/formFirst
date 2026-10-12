const STORAGE_KEY = 'formfirst-5day-plan-v2';

const DEFAULT_STATE = Object.freeze({
  completed: {},
  logs: {},
  gymVisits: [],
  weeklySets: {},
  weekMigrations: {},
  biometricCredentialId: null,
  biometricUserId: null,
  developmentMode: false,
  waterReminderEnabled: false,
  waterReminderNextAt: null,
  darkMode: false
});

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function recordOrEmpty(value) {
  return isRecord(value) ? value : {};
}

function freshDefaultState() {
  return {
    ...DEFAULT_STATE,
    completed: {},
    logs: {},
    gymVisits: [],
    weeklySets: {},
    weekMigrations: {}
  };
}

function normalizeState(saved = {}) {
  const source = isRecord(saved) ? saved : {};
  const nextReminderAt = Number(source.waterReminderNextAt);
  const state = {
    ...freshDefaultState(),
    ...source,
    completed: recordOrEmpty(source.completed),
    logs: recordOrEmpty(source.logs),
    gymVisits: Array.isArray(source.gymVisits) ? source.gymVisits.filter(isRecord) : [],
    weeklySets: recordOrEmpty(source.weeklySets),
    weekMigrations: recordOrEmpty(source.weekMigrations),
    biometricCredentialId: typeof source.biometricCredentialId === 'string' ? source.biometricCredentialId : null,
    biometricUserId: typeof source.biometricUserId === 'string' ? source.biometricUserId : null,
    developmentMode: Boolean(source.developmentMode),
    waterReminderEnabled: Boolean(source.waterReminderEnabled),
    waterReminderNextAt: Number.isFinite(nextReminderAt) ? nextReminderAt : null,
    darkMode: Boolean(source.darkMode)
  };

  // Retired prototype fields are intentionally discarded during hydration.
  delete state.steps;
  delete state.stepMeta;
  return state;
}

export function loadState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return normalizeState(serialized ? JSON.parse(serialized) : {});
  } catch {
    return freshDefaultState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn('Form First state could not be persisted', error);
    return false;
  }
}
