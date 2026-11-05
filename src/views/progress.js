export function buildGymStatusMarkup({ active, visits, formatDuration, formatClockTime, formatShortDate }) {
  const latest = visits[visits.length - 1];
  if (active) {
    const elapsed = formatDuration(Date.now() - new Date(active.checkIn).getTime());
    return `<div class="gym-live-status is-active"><span class="gym-status-dot"></span><div><strong>Checked in</strong><small>Since ${formatClockTime(active.checkIn)} · <span id="gymSessionDuration">${elapsed}</span></small></div></div>`;
  }
  if (latest) {
    const duration = latest.checkOut ? formatDuration(new Date(latest.checkOut) - new Date(latest.checkIn)) : '—';
    return `<div class="gym-live-status"><span class="gym-status-dot"></span><div><strong>Ready to check in</strong><small>Last visit ${formatShortDate(latest.checkIn)} · ${duration}</small></div></div>`;
  }
  return `<div class="gym-live-status"><span class="gym-status-dot"></span><div><strong>Ready to check in</strong><small>No verified gym visit logged this week</small></div></div>`;
}

export function buildGymTodayTimesMarkup({ visit, formatClockTime }) {
  if (!visit) return '';
  return `<div class="gym-today-times" aria-label="Today's gym attendance times">
    <div><small>Check-in</small><strong>${formatClockTime(visit.checkIn)}</strong></div>
    <span class="gym-time-divider" aria-hidden="true"></span>
    <div><small>Check-out</small><strong>${visit.checkOut ? formatClockTime(visit.checkOut) : 'In progress'}</strong></div>
  </div>`;
}

export function buildProgressMarkup({
  restoreTabState,
  percent,
  done,
  total,
  workoutsDone,
  visitsCount,
  gymMinutesLabel,
  active,
  gymStatusMarkup,
  gymTodayTimesMarkup,
  settingsIcon,
  locationIcon,
  faceIdIcon,
  checkIcon,
  checkInPending
}) {
  return `<main class="screen ${restoreTabState ? '' : 'view-enter'} note-theme nav-screen">
    <header class="topbar note-topbar workout-topbar"><span class="topbar-spacer" aria-hidden="true"></span><span class="topbar-spacer" aria-hidden="true"></span><button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${settingsIcon}</button></header>
    <div class="container nav-page-container progress-hub">
      <section class="nav-hero-card progress-hero-card">
        <div><span class="note-kicker">This week</span><h1>${percent}% complete</h1><p>${done} of ${total} planned working sets finished</p></div>
        <div class="nav-progress-ring" style="--progress:${percent * 3.6}deg"><strong>${percent}%</strong></div>
      </section>

      <section class="progress-metric-grid" aria-label="Weekly training metrics">
        <article class="progress-metric"><small>Workouts</small><strong>${workoutsDone}<span>/5</span></strong><p>planned days complete</p></article>
        <article class="progress-metric"><small>Working sets</small><strong>${done}<span>/${total}</span></strong><p>completed this week</p></article>
        <article class="progress-metric"><small>Gym visits</small><strong>${visitsCount}</strong><p>verified check-ins</p></article>
        <article class="progress-metric"><small>Gym time</small><strong>${gymMinutesLabel}</strong><p>logged this week</p></article>
      </section>

      <section class="progress-feature-card gym-card ios-card-enter">
        <div class="progress-card-head"><div><span class="note-kicker">Gym attendance</span><h2>Check-in</h2></div><span class="privacy-chip"><span class="chip-icon">${locationIcon}</span>100 m</span></div>
        ${gymStatusMarkup}
        ${gymTodayTimesMarkup}
        <div class="biometric-strip"><span class="biometric-icon">${faceIdIcon}</span><div><strong>Face ID protected</strong><small>Location + device identity are verified before check-in.</small></div></div>
        <div class="gym-actions gym-actions-single">
          ${active
            ? `<button class="gym-action primary is-checked-in" id="gymVisitToggle"><span class="button-icon">${checkIcon}</span><span>Checked in</span></button>`
            : checkInPending
              ? `<button class="gym-action primary faceid-action is-busy" id="gymVisitToggle" disabled aria-disabled="true" aria-busy="true"><span class="button-spinner" aria-hidden="true"></span><span>Verifying location…</span></button>`
              : `<button class="gym-action primary faceid-action" id="gymVisitToggle"><span class="button-icon">${faceIdIcon}</span><span>Check in with Face ID</span></button>`}
        </div>
      </section>
    </div>
  </main>`;
}
