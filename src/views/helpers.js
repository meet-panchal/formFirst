export function setWord(count) {
  return Number(count) === 1 ? 'set' : 'sets';
}

export function noteBullets(items, limit = 3) {
  const clean = (items || [])
    .flatMap(item => String(item).split(/(?<=[.!?])\s+/))
    .map(item => item.trim().replace(/[.!?]+$/, ''))
    .filter(Boolean)
    .slice(0, limit);

  return `<ul class="note-bullet-list">${clean.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

export function exerciseListMeta(exercise) {
  const count = exercise.setsLabel || exercise.sets;
  const setsText = `${count} ${String(count) === '1' ? 'set' : 'sets'}`;

  if (exercise.logType === 'time' || exercise.id === 'deadbug-plank') {
    return [setsText, exercise.reps, `${exercise.rest} rest`];
  }
  if (exercise.logType === 'cardio' || exercise.id === 'cardio') {
    return [setsText, exercise.reps, 'conditioning'];
  }
  if (exercise.logType === 'repsOnly') {
    return [setsText, `${exercise.reps} reps`, `${exercise.rest} rest`];
  }
  return [setsText, exercise.reps, `${exercise.rest} rest`];
}

export function exerciseDetailMeta(exercise) {
  const count = exercise.setsLabel || exercise.sets;
  const setsText = `${count} ${String(count) === '1' ? 'set' : 'sets'}`;

  if (exercise.logType === 'time' || exercise.id === 'deadbug-plank') {
    return `${setsText} · ${exercise.reps} · ${exercise.rest} rest`;
  }
  if (exercise.logType === 'cardio' || exercise.id === 'cardio') {
    return `${setsText} · ${exercise.reps} · steady conditioning`;
  }
  return `${setsText} · ${exercise.reps} reps · ${exercise.rest} rest`;
}
