import { exerciseDetailMeta, noteBullets } from './helpers.js';

export function renderSetLineMarkup(exercise, index, done, locked, logs, icons) {
  const log = (logs[exercise.id] || [])[index] || {};
  const optional = index >= (exercise.requiredSets || exercise.sets);
  const indexMarkup = `<div class="set-index"><strong>${index + 1}</strong><small>${optional ? 'opt.' : 'set'}</small></div>`;
  const checkMarkup = `<button class="check-btn ${done ? 'done' : ''}" data-check="${index}" ${locked ? 'disabled aria-disabled="true"' : ''} aria-label="${done ? 'Unmark' : 'Complete'} set ${index + 1}">${done ? icons.check : '<span class="check-dot"></span>'}</button>`;

  if (exercise.logType === 'time' || exercise.id === 'deadbug-plank') {
    return `<div class="set-line compact-set-line timed-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>seconds</span><input data-log="duration" data-index="${index}" data-ex="${exercise.id}" ${locked ? 'disabled aria-disabled="true"' : ''} inputmode="numeric" type="number" min="0" value="${log.duration || ''}" placeholder="${String(exercise.reps).replace(/[^0-9–-]/g, '')}"/></label>
      <div class="set-prescription"><span>goal</span><strong>${exercise.reps}</strong></div>
      ${checkMarkup}
    </div>`;
  }

  if (exercise.logType === 'cardio' || exercise.id === 'cardio') {
    return `<div class="set-line compact-set-line timed-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>minutes</span><input data-log="duration" data-index="${index}" data-ex="${exercise.id}" ${locked ? 'disabled aria-disabled="true"' : ''} inputmode="numeric" type="number" min="0" value="${log.duration || ''}" placeholder="${String(exercise.reps).match(/\d+/)?.[0] || '15'}"/></label>
      <label class="input-wrap compact-input"><span>level</span><input data-log="level" data-index="${index}" data-ex="${exercise.id}" ${locked ? 'disabled aria-disabled="true"' : ''} inputmode="decimal" type="number" min="0" step="0.5" value="${log.level || ''}" placeholder="opt."/></label>
      ${checkMarkup}
    </div>`;
  }

  if (exercise.logType === 'repsOnly') {
    return `<div class="set-line compact-set-line reps-only-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>reps</span><input data-log="reps" data-index="${index}" data-ex="${exercise.id}" ${locked ? 'disabled aria-disabled="true"' : ''} inputmode="numeric" type="number" min="0" value="${log.reps !== undefined && log.reps !== '' ? log.reps : 13}" placeholder="13"/></label>
      <div class="set-prescription"><span>goal</span><strong>${exercise.reps}</strong></div>
      ${checkMarkup}
    </div>`;
  }

  return `<div class="set-line compact-set-line">
    ${indexMarkup}
    <label class="input-wrap compact-input"><span>kg</span><input data-log="weight" data-index="${index}" data-ex="${exercise.id}" ${locked ? 'disabled aria-disabled="true"' : ''} inputmode="decimal" type="number" min="0" step="0.5" value="${log.weight || ''}" placeholder="0"/></label>
    <label class="input-wrap compact-input"><span>reps</span><input data-log="reps" data-index="${index}" data-ex="${exercise.id}" ${locked ? 'disabled aria-disabled="true"' : ''} inputmode="numeric" type="number" min="0" value="${log.reps !== undefined && log.reps !== '' ? log.reps : 13}" placeholder="13"/></label>
    ${checkMarkup}
  </div>`;
}

export function buildExerciseDetailMarkup({
  activeDay,
  dayTitle,
  exercise,
  completed,
  canLogSets,
  developmentMode,
  underlay,
  icons,
  movementMarkup,
  targetMarkup,
  renderSetLine
}) {
  return `<div class="edge-back-stage">${underlay}<main class="detail-screen view-enter note-theme">
    <header class="topbar note-topbar">
      <button class="icon-btn note-icon-btn" id="backBtn" aria-label="Back to workout">${icons.back}</button>
      <span class="topbar-spacer" aria-hidden="true"></span>
      <button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${icons.settings}</button>
    </header>
    <div class="detail-content note-detail-content">
      <section class="detail-heading note-heading">
        <div class="note-kicker">Day ${activeDay} · ${dayTitle}</div>
        <h1>${exercise.name}</h1>
        <div class="detail-meta note-detail-meta">${exerciseDetailMeta(exercise)}</div>
      </section>

      ${movementMarkup(exercise)}

      <section class="detail-section">
        <div class="note-card target-card ${([1, 2, 3, 4, 5].includes(activeDay) ? 'day1-target-card' : '')}">${targetMarkup(exercise)}</div>
      </section>

      <section class="detail-section">
        <h2>How to perform</h2>
        <article class="note-card reading-card note-list-card">
          ${noteBullets(exercise.steps, 3)}
        </article>
      </section>

      <section class="detail-section" id="watchFormSection">
        <h2>Watch your form</h2>
        <article class="note-card caution-card note-list-card">
          ${noteBullets(exercise.watchouts, 3)}
        </article>
      </section>

      <section class="detail-section log-sets-section ${canLogSets ? '' : 'is-locked'}">
        <div class="section-title-row"><h2>${exercise.sets === 1 ? 'Log set' : 'Log sets'}</h2>${developmentMode ? '<span class="section-caption dev-mode-caption">Development mode</span>' : ''}</div>
        ${!canLogSets ? `<button class="log-gate-card" id="logGateCard" type="button" aria-label="Go to Gym Attendance to check in"><span class="log-gate-icon">${icons.location}</span><span class="log-gate-copy"><strong>Check in to log entries</strong><small>Open Gym Attendance to unlock your sets.</small></span><span class="log-gate-chevron">${icons.chevron}</span></button>` : ''}
        <div class="log-sets-layout ${exercise.sets === 1 ? 'single-set-layout' : ''}">
          <div class="set-card compact-set-card">
            ${Array.from({ length: exercise.sets }, (_, index) => renderSetLine(exercise, index, completed[index], !canLogSets)).join('')}
          </div>
          <button class="log-watch-form-btn" id="watchFormBtn" type="button"><span>Watch</span><strong>Form</strong><span class="watch-form-arrow">${icons.external}</span></button>
        </div>
      </section>
    </div>
  </main></div>`;
}
