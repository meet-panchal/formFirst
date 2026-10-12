import { localDateKey, weekStartDate } from './date-time.js';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function getCurrentWeekVisits(visits, date = new Date()) {
  const start = weekStartDate(date).getTime();
  const end = start + WEEK_MS;

  return (Array.isArray(visits) ? visits : []).filter(visit => {
    const checkInTime = new Date(visit?.checkIn).getTime();
    return Number.isFinite(checkInTime) && checkInTime >= start && checkInTime < end;
  });
}

export function getActiveGymVisit(visits) {
  const list = Array.isArray(visits) ? visits : [];
  for (let index = list.length - 1; index >= 0; index -= 1) {
    const visit = list[index];
    if (visit?.checkIn && !visit.checkOut) return visit;
  }
  return null;
}

export function getWeeklyGymMinutes(visits, date = new Date(), now = Date.now()) {
  const milliseconds = getCurrentWeekVisits(visits, date).reduce((total, visit) => {
    const start = new Date(visit.checkIn).getTime();
    const end = visit.checkOut ? new Date(visit.checkOut).getTime() : now;
    if (!Number.isFinite(start) || !Number.isFinite(end)) return total;
    return total + Math.max(0, end - start);
  }, 0);

  return Math.round(milliseconds / 60_000);
}

export function getLatestVisitOnDate(visits, date = new Date()) {
  const target = localDateKey(date);
  const list = Array.isArray(visits) ? visits : [];

  for (let index = list.length - 1; index >= 0; index -= 1) {
    const visit = list[index];
    if (visit?.checkIn && localDateKey(new Date(visit.checkIn)) === target) return visit;
  }

  return null;
}
