import assert from 'node:assert/strict';
import {
  calculateWorkoutSetStats,
  countCompletedDays,
  getNextIncompleteExerciseId,
  isExerciseCompleteInState
} from '../src/core/workout-progress.js';
import {
  getActiveGymVisit,
  getCurrentWeekVisits,
  getLatestVisitOnDate,
  getWeeklyGymMinutes
} from '../src/core/gym-visits.js';
import { distanceMeters } from '../src/services/geolocation.js';

const exercises = [
  { id: 'a', sets: 3, requiredSets: 3 },
  { id: 'b', sets: 3, requiredSets: 2 }
];

assert.equal(isExerciseCompleteInState({ a: [true, true] }, exercises[0]), false,
  'An undersized completion array must not count as a completed exercise');
assert.equal(isExerciseCompleteInState({ a: [true, true, true] }, exercises[0]), true);
assert.deepEqual(
  calculateWorkoutSetStats(exercises, { a: [true, true, true], b: [true, false, true] }),
  { done: 4, total: 5, pct: 80 }
);
assert.equal(getNextIncompleteExerciseId(exercises, { a: [true, true, true], b: [true] }), 'b');
assert.equal(countCompletedDays({ 1: { exercises }, 2: { exercises: [] } }, {
  a: [true, true, true], b: [true, true]
}), 1);

const reference = new Date(2026, 9, 7, 12, 0, 0); // Wednesday, local time
const monday = new Date(2026, 9, 5, 10, 0, 0).toISOString();
const tuesday = new Date(2026, 9, 6, 10, 0, 0).toISOString();
const previousSunday = new Date(2026, 9, 4, 23, 59, 0).toISOString();
const visits = [
  { checkIn: previousSunday, checkOut: new Date(2026, 9, 5, 0, 30, 0).toISOString() },
  { checkIn: monday, checkOut: new Date(2026, 9, 5, 11, 0, 0).toISOString() },
  { checkIn: tuesday, checkOut: new Date(2026, 9, 6, 10, 30, 0).toISOString() },
  { checkIn: new Date(2026, 9, 7, 11, 0, 0).toISOString(), checkOut: null }
];

assert.equal(getCurrentWeekVisits(visits, reference).length, 3);
assert.equal(getActiveGymVisit(visits), visits[3]);
assert.equal(getWeeklyGymMinutes(visits, reference, new Date(2026, 9, 7, 12, 0, 0).getTime()), 150);
assert.equal(getLatestVisitOnDate(visits, reference), visits[3]);

const zeroDistance = distanceMeters(22.273556, 73.180375, 22.273556, 73.180375);
assert.ok(Number.isFinite(zeroDistance));
assert.ok(zeroDistance < 0.001);


const storageModule = await import('../src/core/storage.js');

globalThis.localStorage = {
  getItem() {
    return JSON.stringify({
      completed: ['invalid'],
      logs: null,
      gymVisits: [{ checkIn: '2026-10-11T10:00:00.000Z' }, 'invalid'],
      weeklySets: 'invalid',
      weekMigrations: null,
      biometricCredentialId: 123,
      biometricUserId: 'user-id',
      developmentMode: 1,
      waterReminderEnabled: 0,
      waterReminderNextAt: '12345',
      darkMode: 'yes',
      steps: 999,
      stepMeta: { stale: true }
    });
  },
  setItem() {}
};

const normalized = storageModule.loadState();
assert.deepEqual(normalized.completed, {});
assert.deepEqual(normalized.logs, {});
assert.equal(normalized.gymVisits.length, 1);
assert.deepEqual(normalized.weeklySets, {});
assert.deepEqual(normalized.weekMigrations, {});
assert.equal(normalized.biometricCredentialId, null);
assert.equal(normalized.biometricUserId, 'user-id');
assert.equal(normalized.developmentMode, true);
assert.equal(normalized.waterReminderEnabled, false);
assert.equal(normalized.waterReminderNextAt, 12345);
assert.equal(normalized.darkMode, true);
assert.equal('steps' in normalized, false);
assert.equal('stepMeta' in normalized, false);

globalThis.localStorage = {
  getItem() { throw new Error('blocked'); },
  setItem() { throw new Error('quota'); }
};
const fallback = storageModule.loadState();
assert.deepEqual(fallback.completed, {});
assert.equal(storageModule.saveState(fallback), false);

console.log('PASS core behavior tests');
