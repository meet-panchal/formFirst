export function buildWeekGoalMarkup({ completed, total, flameIcon }) {
  return `<div class="week-goal ${completed === total ? 'is-complete' : ''}" aria-label="${completed} of ${total} workout days completed this week">
    <span class="week-goal-icon" aria-hidden="true">${flameIcon}</span>
    <span class="week-goal-copy"><small>Weekly goal</small><strong>${completed === total ? 'Week complete' : `${completed}/${total} training days`}</strong></span>
    <span class="week-goal-dots" aria-hidden="true">${Array.from({ length: total }, (_, index) => `<i class="${index < completed ? 'done' : ''}"></i>`).join('')}</span>
  </div>`;
}

export function buildWorkoutSectionMarkup({ name, day, exercises, state, checkIcon, chevronIcon, exerciseListMeta }) {
  const list = exercises.filter(exercise => exercise.section === name);
  const isMain = name === 'Main Workout';
  const subtitle = isMain ? day.mainSubtitle : day.coreSubtitle;
  const sectionRequired = list.reduce((sum, exercise) => sum + (exercise.requiredSets || exercise.sets), 0);
  const sectionComplete = list.reduce((sum, exercise) => {
    const required = exercise.requiredSets || exercise.sets;
    return sum + (state.completed[exercise.id] || []).slice(0, required).filter(Boolean).length;
  }, 0);
  const sectionPercent = sectionRequired ? Math.round((sectionComplete / sectionRequired) * 100) : 0;
  const sectionDone = sectionRequired > 0 && sectionComplete >= sectionRequired;

  return `<section class="section note-section workout-block-section">
    <article class="day-block-card ${isMain ? 'main-block' : 'finish-block'} ${sectionDone ? 'section-complete' : ''}" style="--section-progress:${sectionPercent}%">
      <div class="day-block-head">
        <div class="day-block-heading-row">
          <div>
            <h2>${isMain ? 'Main Workout' : 'Core & Cardio'}</h2>
            <p>${subtitle}</p>
          </div>
          <span class="day-block-count" aria-label="${list.length} exercises">${list.length}</span>
        </div>
        <div class="section-game-row" aria-label="${sectionComplete} of ${sectionRequired} working sets completed">
          <span class="section-game-copy"><strong>${sectionComplete}/${sectionRequired}</strong> working sets</span>
          <span class="section-game-status">${sectionDone ? 'Complete' : `${sectionPercent}%`} </span>
        </div>
        <span class="section-progress-rail" aria-hidden="true"><i></i></span>
      </div>
      <div class="day-exercise-list">
        ${list.map(exercise => {
          const required = exercise.requiredSets || exercise.sets;
          const complete = (state.completed[exercise.id] || []).slice(0, required).filter(Boolean).length;
          const done = complete >= required;
          return `<button class="day-exercise-row ${done ? 'is-complete' : ''}" data-exercise="${exercise.id}">
            <span class="day-exercise-number">${done ? checkIcon : exercise.number}</span>
            <span class="day-exercise-copy">
              <strong>${exercise.name}</strong>
              <span class="day-exercise-meta">${exerciseListMeta(exercise).map(item => `<span>${item}</span>`).join('')}</span>
              <span class="set-progress-chip ${done ? 'is-complete' : ''}" style="--set-progress:${Math.max(0, Math.min(100, (complete / required) * 100))}%" aria-label="${complete} of ${required} working sets completed">
                <span class="set-progress-copy"><strong>${complete}/${required}</strong><span>${done ? 'sets complete' : 'working sets'}</span></span>
                <span class="set-progress-track" aria-hidden="true"><i></i></span>
              </span>
            </span>
            <span class="day-exercise-chevron">${chevronIcon}</span>
          </button>`;
        }).join('')}
      </div>
    </article>
  </section>`;
}

export function buildWorkoutMarkup({
  daySwitch,
  restoreTabState,
  activeDay,
  day,
  days,
  warmupOpen,
  isDayComplete,
  settingsIcon,
  checkIcon,
  playIcon,
  progressPercent,
  doneCount,
  totalSets,
  weekGoalMarkup,
  sectionsMarkup
}) {
  return `<main class="screen ${daySwitch ? 'day-switch-static' : restoreTabState ? '' : 'view-enter'} note-theme note-workout">
    <header class="topbar note-topbar workout-topbar">
      <span class="topbar-spacer" aria-hidden="true"></span>
      <span class="topbar-spacer" aria-hidden="true"></span>
      <button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${settingsIcon}</button>
    </header>
    <div class="container note-workout-container">
      <section class="workout-header note-workout-header">
        <div class="note-kicker">Day ${activeDay} · ${day.title}</div>
        <div class="day-strip" aria-label="Training days">
          ${days.map(([number]) => {
            const complete = isDayComplete(number);
            return `<button class="day-pill ${Number(number) === activeDay ? 'active' : ''} ${complete ? 'day-complete' : ''}" data-day="${number}"><strong>Day ${number}</strong>${complete ? `<span class="day-complete-mark" aria-label="Day ${number} complete">${checkIcon}</span>` : ''}</button>`;
          }).join('')}
        </div>
        <article class="summary-card note-summary-card compact-summary-card">
          <div class="summary-row">
            <div class="summary-progress-copy"><h2>Day ${activeDay} workout</h2><div class="summary-set-status ${doneCount === totalSets ? 'is-complete' : ''}"><span class="summary-set-count">${doneCount}/${totalSets}</span><span>working sets completed</span></div></div>
            <div class="progress-ring" style="--progress:${progressPercent * 3.6}deg"><strong>${progressPercent}%</strong></div>
          </div>
          ${weekGoalMarkup}
          <button class="primary-btn compact-start-btn" id="startWorkout">${playIcon}<span>${doneCount ? 'Continue Workout' : 'Start Workout'}</span></button>
        </article>
      </section>
      <section class="section note-section compact-warmup-section">
        <article class="group-card warmup note-group-card ${warmupOpen ? 'open' : ''}" id="warmupCard" aria-expanded="${warmupOpen ? 'true' : 'false'}">
          <div class="warmup-flow compact-warmup-flow" id="warmupToggle" role="button" tabindex="0" aria-expanded="${warmupOpen ? 'true' : 'false'}" aria-label="Show warm-up notes">
            <div class="warmup-summary">
              <div class="warmup-copy">
                <span class="warmup-label">Warm-up</span>
                <strong class="warmup-heading">${day.warmup.duration}</strong>
                <p class="warmup-intro">${day.warmup.intro}</p>
              </div>
              <img class="warmup-illustration" src="${day.warmup.image || './assets/warmup/upper-body-mobility-cutout-cropped.webp'}" alt="" aria-hidden="true" draggable="false" loading="eager" decoding="async" />
            </div>
            <div class="warmup-details"><strong class="warmup-detail-name">${day.warmup.name}</strong>${day.warmup.details} Keep the effort easy and use the warm-up to check how your joints and movement feel before the first working set.</div>
          </div>
        </article>
      </section>
      ${sectionsMarkup}
    </div>
  </main>`;
}
