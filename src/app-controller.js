import { DAYS } from './data/workouts.js';
import { WATER_REMINDER_INTERVAL_MS } from './config.js';
import { localDateKey, weekStartDate, formatClockTime, formatShortDate, formatDuration } from './core/date-time.js';
import { loadState, saveState } from './core/storage.js';
import {
  getActiveGymVisit,
  getCurrentWeekVisits,
  getLatestVisitOnDate,
  getWeeklyGymMinutes
} from './core/gym-visits.js';
import {
  calculateDayStats,
  calculateWorkoutSetStats,
  countCompletedDays,
  getCompletedSetCount,
  getNextIncompleteExerciseId,
  getFirstIncompleteDay,
  getNextIncompleteDay,
  getRequiredSetCount,
  isExerciseCompleteInState
} from './core/workout-progress.js';
import { createGymAttendanceFeature } from './features/gym-attendance.js';
import { createWaterReminderController } from './services/water-reminders.js';
import { createTimerFeature } from './features/timer.js';
import { celebrateDayCompletion, celebrateSetCompletion } from './ui/celebrations.js';
import { installEdgeBackGesture } from './ui/edge-back.js';
import { targetMarkup, movementMarkup } from './ui/exercise-media.js';
import {
  showGymCheckInNotice,
  showRecoveryRewardNotice,
  showToast
} from './ui/feedback.js';
import { openFormGuide } from './ui/form-guide.js';
import { softHaptic } from './ui/haptics.js';
import { ICON } from './ui/icons.js';
import { openSettingsSheet } from './ui/settings-sheet.js';
import { applyTheme } from './ui/theme.js';
import { setWord, exerciseListMeta } from './views/helpers.js';
import { buildWeekGoalMarkup, buildWorkoutMarkup, buildWorkoutSectionMarkup } from './views/workout.js';
import { buildGymStatusMarkup, buildGymTodayTimesMarkup, buildProgressMarkup } from './views/progress.js';
import { buildExerciseDetailMarkup, renderSetLineMarkup } from './views/exercise-detail.js';

const app = document.getElementById('app');

let activeDay = 1;
let exercises = DAYS[activeDay].exercises;



const state = loadState();
const save = () => saveState(state);
const waterReminders = createWaterReminderController({
  state,
  save,
  intervalMs: WATER_REMINDER_INTERVAL_MS,
  showToast
});
const gymAttendance = createGymAttendanceFeature({
  state,
  save,
  onUpdate: () => renderProgress(),
  showToast,
  showGymCheckInNotice,
  onContinue: () => continueWorkoutFlow(),
  hasWorkoutProgress: () => doneCount() > 0
});
let currentView = 'workout';
let currentExerciseId = null;
let workoutScroll = 0;
let progressClockInterval = null;
let workoutSnapshotMarkup = '';
const tabViewState = {
  workout: { scrollY: 0, warmupOpen: false, subview: 'workout', exerciseId: null, detailScrollY: 0 },
  progress: { scrollY: 0 },
  timer: { scrollY: 0 }
};

function captureTabViewState(){
  if(currentView==='workout'){
    tabViewState.workout.scrollY=window.scrollY;
    tabViewState.workout.warmupOpen=Boolean(document.getElementById('warmupCard')?.classList.contains('open'));
    tabViewState.workout.subview='workout';
    tabViewState.workout.exerciseId=null;
    tabViewState.workout.detailScrollY=0;
  } else if(currentView==='detail'){
    tabViewState.workout.subview='detail';
    tabViewState.workout.exerciseId=currentExerciseId;
    tabViewState.workout.detailScrollY=window.scrollY;
  } else if(currentView==='progress'){
    tabViewState.progress.scrollY=window.scrollY;
  } else if(currentView==='timer'){
    tabViewState.timer.scrollY=window.scrollY;
  }
}
function restoreTabScroll(view){
  const top=Math.max(0,Number(tabViewState[view]?.scrollY)||0);
  requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo({top,behavior:'instant'})));
}
function restoreWorkoutTabState(){
  const saved=tabViewState.workout;
  if(saved.subview==='detail' && saved.exerciseId && exercises.some(ex=>ex.id===saved.exerciseId)){
    openExercise(saved.exerciseId,{restoreTabState:true});
    return;
  }
  renderWorkout({restoreTabState:true});
}

function captureWorkoutSnapshot(){
  const current=app.querySelector('.note-workout');
  if(!current) return workoutSnapshotMarkup;
  const clone=current.cloneNode(true);
  clone.classList.remove('view-enter','day-switch-static');
  clone.classList.add('edge-back-underlay-screen');
  clone.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  clone.querySelectorAll('button,input,a,[tabindex]').forEach(node=>{
    node.setAttribute('tabindex','-1');
    node.setAttribute('aria-hidden','true');
  });
  const header=clone.querySelector('.topbar');
  const headerMarkup=header ? header.outerHTML : '';
  header?.remove();
  workoutSnapshotMarkup=`<div class="edge-back-underlay-header">${headerMarkup}</div><div class="edge-back-underlay-body">${clone.innerHTML}</div>`;
  return workoutSnapshotMarkup;
}




applyTheme(state.darkMode,false);
function weekKey(date=new Date()){ return localDateKey(weekStartDate(date)); }
function weekBucket(date=new Date()){
  const key=weekKey(date);
  if(!state.weeklySets[key]) state.weeklySets[key]={};
  return state.weeklySets[key];
}
function migrateCurrentSetsToWeek(){
  const key=weekKey();
  if(state.weekMigrations[key]) return;
  const bucket=weekBucket();
  Object.entries(state.completed || {}).forEach(([id,arr])=>{ if(Array.isArray(arr)) bucket[id]=[...arr]; });
  state.weekMigrations[key]=true;
  save();
}
function currentWeekVisits(){ return getCurrentWeekVisits(state.gymVisits); }
function activeGymVisit(){ return getActiveGymVisit(state.gymVisits); }
function canLogSets(){ return Boolean(activeGymVisit() || state.developmentMode); }
function weeklyGymMinutes(){ return getWeeklyGymMinutes(state.gymVisits); }
function stopProgressClock(){ if(progressClockInterval){ clearInterval(progressClockInterval); progressClockInterval=null; } }

migrateCurrentSetsToWeek();
function currentWorkoutStats(){ return calculateWorkoutSetStats(exercises,state.completed); }
function doneCount(){ return currentWorkoutStats().done; }
function totalSets(){ return currentWorkoutStats().total; }
function percent(){ return currentWorkoutStats().pct; }
function isDayComplete(dayNumber){ const stats=dayStats(Number(dayNumber)); return stats.total>0 && stats.done>=stats.total; }
function getInitialIncompleteDay(){
  const firstIncomplete = getFirstIncompleteDay(DAYS, weekBucket());
  return firstIncomplete ?? Math.min(...Object.keys(DAYS).map(Number));
}
function getNextDayInSequence(afterDay=activeDay){
  return getNextIncompleteDay(DAYS, weekBucket(), afterDay);
}
activeDay = getInitialIncompleteDay();
exercises = DAYS[activeDay].exercises;
function completedDaysThisWeek(){ return countCompletedDays(DAYS,weekBucket()); }

function exerciseRequiredCount(ex){ return getRequiredSetCount(ex); }
function exerciseCompletedCount(ex){ return getCompletedSetCount(state.completed,ex); }
function isExerciseComplete(ex){ return isExerciseCompleteInState(state.completed,ex); }
function updateDetailGameUI(ex){
  const required=exerciseRequiredCount(ex), complete=exerciseCompletedCount(ex), pct=required?Math.round(complete/required*100):0;
  const meter=document.getElementById('exerciseGameMeter');
  const copy=document.getElementById('exerciseGameCopy');
  const rail=document.getElementById('exerciseGameRail');
  if(meter) meter.classList.toggle('is-complete',complete>=required);
  if(copy) copy.innerHTML=complete>=required?`<strong>${complete}/${required}</strong><span>Exercise complete</span>`:`<strong>${complete}/${required}</strong><span>${required-complete} ${setWord(required-complete)} left</span>`;
  if(rail) rail.style.setProperty('--exercise-progress',`${pct}%`);
}


function selectDay(day){
  const nextDay = Number(day);
  if (nextDay === activeDay || !DAYS[nextDay]) return;

  activeDay = nextDay;
  exercises = DAYS[activeDay].exercises;
  tabViewState.workout.warmupOpen=false;
  renderWorkout({restore:false,daySwitch:true});
}



function setActiveNav(view){
  document.querySelectorAll('#bottomNav [data-nav]').forEach(btn=>btn.classList.toggle('active',btn.dataset.nav===view));
}

function dayStats(dayNumber){ return calculateDayStats(DAYS[dayNumber],weekBucket()); }

function nextWorkoutExerciseId(){ return getNextIncompleteExerciseId(exercises,state.completed); }

function continueWorkoutFlow(){
  if(isDayComplete(activeDay)){
    const nextDay=getNextDayInSequence(activeDay);
    if(nextDay){
      activeDay=nextDay;
      exercises=DAYS[activeDay].exercises;
      tabViewState.workout.warmupOpen=false;
      tabViewState.workout.subview='workout';
      tabViewState.workout.exerciseId=null;
      renderWorkout({daySwitch:true});
    } else {
      renderWorkout({restore:true});
      return;
    }
  }
  const nextId=nextWorkoutExerciseId();
  if(nextId) openExercise(nextId);
  else renderWorkout({restore:true});
}




function renderProgress({restoreTabState=false}={}){
  currentView='progress'; currentExerciseId=null; setActiveNav('progress'); stopProgressClock();
  const all=Object.keys(DAYS).map(Number).map(day=>({day,...dayStats(day)}));
  const total=all.reduce((n,d)=>n+d.total,0);
  const done=all.reduce((n,d)=>n+d.done,0);
  const pct=total?Math.round(done/total*100):0;
  const workoutsDone=all.filter(d=>d.pct===100).length;
  const visits=currentWeekVisits();
  const gymMinutes=weeklyGymMinutes();
  const active=activeGymVisit();

  const gymStatus = buildGymStatusMarkup({
    active,
    visits,
    formatDuration,
    formatClockTime,
    formatShortDate
  });
  const gymTodayTimes = buildGymTodayTimesMarkup({
    visit: getLatestVisitOnDate(state.gymVisits),
    formatClockTime
  });
  app.innerHTML = buildProgressMarkup({
    restoreTabState,
    percent: pct,
    done,
    total,
    workoutsDone,
    visitsCount: visits.length,
    gymMinutesLabel: formatDuration(gymMinutes * 60000),
    active,
    gymStatusMarkup: gymStatus,
    gymTodayTimesMarkup: gymTodayTimes,
    settingsIcon: ICON.settings,
    locationIcon: ICON.location,
    faceIdIcon: ICON.faceId,
    checkIcon: ICON.check,
    checkInPending: gymAttendance.isPending()
  });

  document.getElementById('gymVisitToggle')?.addEventListener('click',()=>{
    if(gymAttendance.isPending()) return;
    if(activeGymVisit()) gymAttendance.checkOut();
    else gymAttendance.requestCheckIn();
  });
  document.getElementById('moreBtn')?.addEventListener('click',openSettings);

  if(active){
    progressClockInterval=setInterval(()=>{
      if(currentView!=='progress') return;
      const el=document.getElementById('gymSessionDuration');
      if(el) el.textContent=formatDuration(Date.now()-new Date(active.checkIn).getTime());
    },30000);
  }
  if(restoreTabState) restoreTabScroll('progress');
  else window.scrollTo({top:0,behavior:'instant'});
}

const timerFeature=createTimerFeature({
  app,
  isDevelopmentMode:()=>state.developmentMode,
  onOpenSettings:()=>openSettings(),
  onTestNotification:button=>waterReminders.showTestNotification(button),
  onRecoveryComplete:durationSeconds=>showRecoveryRewardNotice({
    durationSeconds,
    dayNumber:activeDay,
    stats:dayStats(activeDay),
    onContinue:continueWorkoutFlow
  })
});

function renderTimer({restoreTabState=false}={}){
  stopProgressClock();
  currentView='timer';
  currentExerciseId=null;
  setActiveNav('timer');
  timerFeature.render();
  if(restoreTabState) restoreTabScroll('timer');
  else window.scrollTo({top:0,behavior:'instant'});
}

function renderWorkout({restore=false,daySwitch=false,restoreTabState=false}={}){
  stopProgressClock();
  currentView='workout'; currentExerciseId=null; setActiveNav('workout');
  tabViewState.workout.subview='workout';
  tabViewState.workout.exerciseId=null;
  tabViewState.workout.detailScrollY=0;
  const day=DAYS[activeDay];
  const p=percent();
  const sectionsMarkup = ['Main Workout', 'Core & Cardio'].map(name => buildWorkoutSectionMarkup({
    name,
    day,
    exercises,
    state,
    checkIcon: ICON.check,
    chevronIcon: ICON.chevron,
    exerciseListMeta
  })).join('');
  app.innerHTML = buildWorkoutMarkup({
    daySwitch,
    restoreTabState,
    activeDay,
    day,
    days: Object.entries(DAYS),
    warmupOpen: tabViewState.workout.warmupOpen,
    isDayComplete,
    settingsIcon: ICON.settings,
    checkIcon: ICON.check,
    playIcon: ICON.play,
    progressPercent: p,
    doneCount: doneCount(),
    totalSets: totalSets(),
    weekGoalMarkup: buildWeekGoalMarkup({
      completed: completedDaysThisWeek(),
      total: Object.keys(DAYS).length,
      flameIcon: ICON.flame
    }),
    sectionsMarkup
  });
  document.getElementById('startWorkout').addEventListener('click',continueWorkoutFlow);
  app.querySelectorAll('[data-day]').forEach(btn=>btn.addEventListener('click',()=>selectDay(btn.dataset.day)));
  const warmupToggle = document.getElementById('warmupToggle');
  const warmupCard = document.getElementById('warmupCard');
  const toggleWarmup = ()=>{
    const opening=!warmupCard.classList.contains('open');
    warmupCard.classList.toggle('open',opening);
    const expanded = String(opening);
    warmupCard.setAttribute('aria-expanded', expanded);
    warmupToggle.setAttribute('aria-expanded', expanded);
    tabViewState.workout.warmupOpen=opening;
    softHaptic(8);
  };
  warmupToggle.addEventListener('click', toggleWarmup);
  warmupToggle.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggleWarmup(); } });
  document.getElementById('moreBtn').addEventListener('click',openSettings);
  app.querySelectorAll('[data-exercise]').forEach(btn=>btn.addEventListener('click',()=>openExercise(btn.dataset.exercise)));
  if(daySwitch) requestAnimationFrame(()=>requestAnimationFrame(()=>app.querySelector('.day-switch-static')?.classList.remove('day-switch-static')));
  if(restore) requestAnimationFrame(()=>window.scrollTo({top:workoutScroll,behavior:'instant'}));
  else if(restoreTabState) restoreTabScroll('workout');
}




function openExercise(id,{restoreTabState=false}={}){
  setActiveNav('workout');
  const ex=exercises.find(e=>e.id===id); if(!ex) return;
  if(!restoreTabState){
    workoutScroll=window.scrollY;
    tabViewState.workout.scrollY=workoutScroll;
    tabViewState.workout.warmupOpen=Boolean(document.getElementById('warmupCard')?.classList.contains('open'));
    tabViewState.workout.detailScrollY=0;
  } else {
    workoutScroll=Math.max(0,Number(tabViewState.workout.scrollY)||0);
  }
  const snapshot=captureWorkoutSnapshot();
  currentView='detail'; currentExerciseId=id;
  tabViewState.workout.subview='detail';
  tabViewState.workout.exerciseId=id;
  const completed=state.completed[id] || Array(ex.sets).fill(false);
  const underlay=snapshot?`<div class="edge-back-underlay" aria-hidden="true" inert><div class="edge-back-underlay-content" style="--snapshot-scroll:${workoutScroll}px">${snapshot}</div></div>`:'';
  const canLog = canLogSets();
  app.innerHTML = buildExerciseDetailMarkup({
    activeDay,
    dayTitle: DAYS[activeDay].title,
    exercise: ex,
    completed,
    canLogSets: canLog,
    developmentMode: state.developmentMode,
    underlay,
    icons: ICON,
    movementMarkup,
    targetMarkup,
    renderSetLine: (exercise, index, done, locked) => renderSetLineMarkup(
      exercise,
      index,
      done,
      locked,
      state.logs,
      ICON
    )
  });
  const underlayBody=app.querySelector('.edge-back-underlay-body');
  if(underlayBody) underlayBody.style.transform=`translate3d(0,${-workoutScroll}px,0)`;

  document.getElementById('backBtn').addEventListener('click',()=>renderWorkout({restore:true}));
  document.getElementById('moreBtn').addEventListener('click',openSettings);
  document.getElementById('logGateCard')?.addEventListener('click',()=>renderProgress());
  app.querySelectorAll('[data-log]').forEach(input=>input.addEventListener('change',saveLog));
  app.querySelectorAll('[data-check]').forEach(btn=>btn.addEventListener('click',()=>toggleSet(ex,Number(btn.dataset.check),btn)));
  document.getElementById('watchFormBtn')?.addEventListener('click',()=>openFormGuide(ex, { showToast }));
  if(restoreTabState){
    const top=Math.max(0,Number(tabViewState.workout.detailScrollY)||0);
    requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo({top,behavior:'instant'})));
  } else {
    window.scrollTo({top:0,behavior:'instant'});
  }
}


function saveLog(event){
  if(!canLogSets()) return;
  const {ex,index,log}=event.target.dataset; const i=Number(index);
  const arr=state.logs[ex]||[]; arr[i]={...(arr[i]||{}),[log]:event.target.value}; state.logs[ex]=arr; save();
}
function toggleSet(ex,i,btn){
  if(!canLogSets()) return;
  const wasExerciseComplete=isExerciseComplete(ex);
  const wasDayComplete=isDayComplete(activeDay);
  const arr=state.completed[ex.id]||Array(ex.sets).fill(false);
  arr[i]=!arr[i];
  state.completed[ex.id]=arr;
  weekBucket()[ex.id]=[...arr];
  save();
  btn.classList.toggle('done',arr[i]); btn.innerHTML=arr[i]?ICON.check:'<span class="check-dot"></span>'; btn.classList.remove('just-done');
  const row=btn.closest('.set-line');
  row?.classList.remove('set-earned');
  if(arr[i]){
    void btn.offsetWidth; btn.classList.add('just-done'); row?.classList.add('set-earned'); softHaptic(10);
  }
  updateDetailGameUI(ex);
  const nowExerciseComplete=isExerciseComplete(ex);
  const nowDayComplete=isDayComplete(activeDay);
  if(arr[i]) celebrateSetCompletion(btn);
  if(arr[i] && nowDayComplete && !wasDayComplete){
    tabViewState.workout.subview='workout';
    tabViewState.workout.exerciseId=null;
    tabViewState.workout.detailScrollY=0;
    celebrateDayCompletion({dayNumber:activeDay,completedDays:completedDaysThisWeek(),totalDays:Object.keys(DAYS).length});
  } else if(arr[i] && nowExerciseComplete && !wasExerciseComplete){
    softHaptic([12,28,18]);
  }
}
function resetCurrentWeekProgress(){
  const key=weekKey();
  const start=weekStartDate().getTime();
  const end=start+7*24*60*60*1000;
  state.weeklySets[key]={};
  state.weekMigrations[key]=true;
  Object.values(DAYS).flatMap(day=>day.exercises).forEach(ex=>{
    delete state.completed[ex.id];
    const existing=state.logs[ex.id];
    if(!Array.isArray(existing)) return;
    const carried=existing.map(entry=>{
      if(!entry || typeof entry!=='object') return {};
      const next={};
      if(entry.weight !== undefined && entry.weight !== '') next.weight=entry.weight;
      if(entry.reps !== undefined && entry.reps !== '') next.reps=entry.reps;
      return next;
    });
    if(carried.some(entry=>Object.keys(entry).length)) state.logs[ex.id]=carried;
    else delete state.logs[ex.id];
  });
  state.gymVisits=state.gymVisits.filter(v=>{ const t=new Date(v.checkIn).getTime(); return !(t>=start && t<end); });
  activeDay=1;
  exercises=DAYS[1].exercises;
  save();
}

function syncDevelopmentModeUI(){
  if(currentView==='detail' && currentExerciseId){
    const section=app.querySelector('.log-sets-section');
    const titleRow=section?.querySelector('.section-title-row');
    if(section && titleRow){
      const locked=!canLogSets();
      section.classList.toggle('is-locked',locked);
      section.querySelectorAll('[data-log],[data-check]').forEach(control=>{
        control.disabled=locked;
        control.setAttribute('aria-disabled',String(locked));
      });
      let caption=titleRow.querySelector('.dev-mode-caption');
      if(state.developmentMode && !caption){
        caption=document.createElement('span');
        caption.className='section-caption dev-mode-caption';
        caption.textContent='Development mode';
        titleRow.appendChild(caption);
      } else if(!state.developmentMode){ caption?.remove(); }
      let gate=document.getElementById('logGateCard');
      if(locked && !gate){
        gate=document.createElement('button');
        gate.className='log-gate-card';
        gate.id='logGateCard';
        gate.type='button';
        gate.setAttribute('aria-label','Go to Gym Attendance to check in');
        gate.innerHTML=`<span class="log-gate-icon">${ICON.location}</span><span class="log-gate-copy"><strong>Check in to log entries</strong><small>Open Gym Attendance to unlock your sets.</small></span><span class="log-gate-chevron">${ICON.chevron}</span>`;
        titleRow.insertAdjacentElement('afterend',gate);
        gate.addEventListener('click',()=>renderProgress());
      } else if(!locked){ gate?.remove(); }
    }
  }
  if(currentView==='timer') timerFeature.syncDevelopmentModeUI();
}

function openSettings(){
  openSettingsSheet({
    state,
    waterReminderStatus:waterReminders.statusText(),
    onDarkModeChange:enabled=>{
      state.darkMode=enabled;
      save();
      applyTheme(enabled,true);
    },
    onDevelopmentModeChange:enabled=>{
      state.developmentMode=enabled;
      save();
      syncDevelopmentModeUI();
    },
    onWaterReminderChange:async({button,copy,enabled})=>{
      if(enabled) waterReminders.disable(button,copy);
      else await waterReminders.enable(button,copy);
    },
    onResetWeek:()=>{
      resetCurrentWeekProgress();
      setTimeout(()=>{
        renderWorkout({restore:false});
        showToast('New week started','success');
      },430);
    }
  });
}

window.addEventListener('popstate',()=>{ if(currentView==='detail') renderWorkout({restore:true}); });
document.querySelectorAll('#bottomNav [data-nav]').forEach(btn=>btn.addEventListener('click',()=>{
  const view=btn.dataset.nav;
  if(currentView===view) return;
  captureTabViewState();
  if(view==='workout') restoreWorkoutTabState();
  if(view==='progress') renderProgress({restoreTabState:true});
  if(view==='timer') renderTimer({restoreTabState:true});
}));
if('serviceWorker' in navigator) window.addEventListener('load',async()=>{
  try { await navigator.serviceWorker.register('./sw.js'); } catch(e) { console.warn('Service worker registration failed',e); }
  waterReminders.schedule();
});
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible' && state.waterReminderEnabled) waterReminders.schedule(); });
window.addEventListener('focus',()=>{ if(state.waterReminderEnabled) waterReminders.schedule(); });
installEdgeBackGesture({
  app,
  getCurrentView: () => currentView,
  onBack: () => renderWorkout({ restore: true })
});
renderWorkout();
