export function getRequiredSetCount(exercise) {
  return Number(exercise?.requiredSets || exercise?.sets || 0);
}

export function getCompletedSetCount(completedSets, exercise) {
  const required = getRequiredSetCount(exercise);
  return (completedSets?.[exercise.id] || []).slice(0, required).filter(Boolean).length;
}

export function isExerciseCompleteInState(completedSets, exercise) {
  const required = getRequiredSetCount(exercise);
  return required > 0 && getCompletedSetCount(completedSets, exercise) >= required;
}

export function calculateWorkoutSetStats(exercises, completedSets) {
  const list = Array.isArray(exercises) ? exercises : [];
  const total = list.reduce((sum, exercise) => sum + getRequiredSetCount(exercise), 0);
  const done = list.reduce((sum, exercise) => sum + getCompletedSetCount(completedSets, exercise), 0);
  return {
    done,
    total,
    pct: total ? Math.min(100, Math.round((done / total) * 100)) : 0
  };
}

export function calculateDayStats(day, weeklySets = {}) {
  return calculateWorkoutSetStats(day?.exercises || [], weeklySets);
}

export function countCompletedDays(days, weeklySets = {}) {
  return Object.values(days || {}).filter(day => {
    const stats = calculateDayStats(day, weeklySets);
    return stats.total > 0 && stats.done >= stats.total;
  }).length;
}

export function getNextIncompleteExerciseId(exercises, completedSets) {
  const list = Array.isArray(exercises) ? exercises : [];
  return list.find(exercise => !isExerciseCompleteInState(completedSets, exercise))?.id || list[0]?.id || null;
}

export function getFirstIncompleteDay(days, weeklySets = {}) {
  const ordered = Object.keys(days || {}).map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  return ordered.find(dayNumber => {
    const stats = calculateDayStats(days[dayNumber], weeklySets);
    return stats.total > 0 && stats.done < stats.total;
  }) ?? null;
}

export function getNextIncompleteDay(days, weeklySets = {}, afterDay = 0) {
  const ordered = Object.keys(days || {}).map(Number).filter(Number.isFinite).sort((a, b) => a - b);
  const incomplete = ordered.filter(dayNumber => {
    const stats = calculateDayStats(days[dayNumber], weeklySets);
    return stats.total > 0 && stats.done < stats.total;
  });
  return incomplete.find(dayNumber => dayNumber > Number(afterDay)) ?? incomplete[0] ?? null;
}
