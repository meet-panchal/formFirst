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
import { GYM_CHECK_IN_REASON, verifyGymCheckIn } from './services/gym-checkin.js';
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
let currentView = 'workout';
let currentExerciseId = null;
let workoutScroll = 0;
let progressClockInterval = null;
let workoutSnapshotMarkup = '';
let gymCheckInPending = false;
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
function weekGoalMarkup(){
  const complete=completedDaysThisWeek();
  const total=Object.keys(DAYS).length;
  return `<div class="week-goal ${complete===total?'is-complete':''}" aria-label="${complete} of ${total} workout days completed this week">
    <span class="week-goal-icon" aria-hidden="true">${ICON.flame}</span>
    <span class="week-goal-copy"><small>Weekly goal</small><strong>${complete===total?'Week complete':`${complete}/${total} training days`}</strong></span>
    <span class="week-goal-dots" aria-hidden="true">${Array.from({length:total},(_,i)=>`<i class="${i<complete?'done':''}"></i>`).join('')}</span>
  </div>`;
}
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

function noteBullets(items, limit=3){
  const clean=(items || []).flatMap(item=>String(item).split(/(?<=[.!?])\s+/)).map(s=>s.trim().replace(/[.!?]+$/,'')).filter(Boolean).slice(0,limit);
  return `<ul class="note-bullet-list">${clean.map(item=>`<li>${item}</li>`).join('')}</ul>`;
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

function gymStatusMarkup(){
  const active=activeGymVisit();
  const visits=currentWeekVisits();
  const latest=visits[visits.length-1];
  if(active){
    const elapsed=formatDuration(Date.now()-new Date(active.checkIn).getTime());
    return `<div class="gym-live-status is-active"><span class="gym-status-dot"></span><div><strong>Checked in</strong><small>Since ${formatClockTime(active.checkIn)} · <span id="gymSessionDuration">${elapsed}</span></small></div></div>`;
  }
  if(latest){
    const duration=latest.checkOut?formatDuration(new Date(latest.checkOut)-new Date(latest.checkIn)):'—';
    return `<div class="gym-live-status"><span class="gym-status-dot"></span><div><strong>Ready to check in</strong><small>Last visit ${formatShortDate(latest.checkIn)} · ${duration}</small></div></div>`;
  }
  return `<div class="gym-live-status"><span class="gym-status-dot"></span><div><strong>Ready to check in</strong><small>No verified gym visit logged this week</small></div></div>`;
}


function latestVisitToday(){ return getLatestVisitOnDate(state.gymVisits); }

function gymTodayTimesMarkup(){
  const visit=latestVisitToday();
  if(!visit) return '';
  return `<div class="gym-today-times" aria-label="Today's gym attendance times">
    <div><small>Check-in</small><strong>${formatClockTime(visit.checkIn)}</strong></div>
    <span class="gym-time-divider" aria-hidden="true"></span>
    <div><small>Check-out</small><strong>${visit.checkOut?formatClockTime(visit.checkOut):'In progress'}</strong></div>
  </div>`;
}



async function requestGymCheckIn(){
  if(gymCheckInPending) return;

  const button=document.getElementById('gymVisitToggle');
  const resetButton=()=>{
    gymCheckInPending=false;
    if(!button) return;
    button.disabled=false;
    button.removeAttribute('aria-busy');
    button.removeAttribute('aria-disabled');
    button.classList.remove('is-busy');
    button.innerHTML=`<span class="button-icon">${ICON.faceId}</span><span>Check in with Face ID</span>`;
  };

  gymCheckInPending=true;
  if(button){
    button.disabled=true;
    button.setAttribute('aria-busy','true');
    button.setAttribute('aria-disabled','true');
    button.classList.add('is-busy');
    button.innerHTML='<span class="button-spinner" aria-hidden="true"></span><span>Verifying location…</span>';
  }

  const result=await verifyGymCheckIn({
    developmentMode:state.developmentMode,
    credentialId:state.biometricCredentialId,
    userId:state.biometricUserId,
    onBiometricStart:({enrolling})=>{
      if(button) button.innerHTML=`<span class="button-icon face-scan">${ICON.faceId}</span><span>Confirm with Face ID…</span>`;
      if(enrolling) showToast('Set up Face ID for Form First');
    }
  });

  if(!result.ok){
    resetButton();
    if(result.reason===GYM_CHECK_IN_REASON.INACCURATE_LOCATION){
      showGymCheckInNotice({kind:'accuracy',distance:result.distance,accuracy:result.accuracy,onRetry:requestGymCheckIn});
      return;
    }
    if(result.reason===GYM_CHECK_IN_REASON.OUTSIDE_GYM){
      showGymCheckInNotice({kind:'away',distance:result.distance,accuracy:result.accuracy,onRetry:requestGymCheckIn});
      return;
    }

    const messages={
      [GYM_CHECK_IN_REASON.GEOLOCATION_UNSUPPORTED]:'Location is not available in this browser',
      [GYM_CHECK_IN_REASON.INSECURE_CONTEXT]:'Gym check-in needs HTTPS or an installed PWA',
      [GYM_CHECK_IN_REASON.LOCATION_PERMISSION_DENIED]:'Allow precise location to verify gym check-in',
      [GYM_CHECK_IN_REASON.LOCATION_UNAVAILABLE]:'Could not get a reliable location',
      [GYM_CHECK_IN_REASON.BIOMETRIC_UNSUPPORTED]:'Face ID verification needs a supported iPhone PWA over HTTPS',
      [GYM_CHECK_IN_REASON.BIOMETRIC_CANCELLED]:'Face ID verification cancelled',
      [GYM_CHECK_IN_REASON.BIOMETRIC_ERROR]:'Face ID verification could not be completed'
    };
    showToast(messages[result.reason] || 'Face ID verification could not be completed');
    return;
  }

  const checkInTime=new Date().toISOString();
  state.biometricCredentialId=result.credentialId;
  state.biometricUserId=result.userId;
  state.gymVisits.push({
    id:`visit-${Date.now()}`,
    checkIn:checkInTime,
    checkOut:null,
    verifiedDistance:Math.round(result.distance),
    accuracy:Math.round(result.accuracy),
    biometricVerified:true
  });
  save();
  gymCheckInPending=false;
  renderProgress();
  requestAnimationFrame(()=>showGymCheckInNotice({
    kind:'success',
    distance:result.distance,
    accuracy:result.accuracy,
    checkInTime,
    hasWorkoutProgress:doneCount()>0,
    onContinue:continueWorkoutFlow
  }));
}

function checkOutGym(){
  const active=activeGymVisit();
  if(!active){ showToast('No active gym session'); return; }
  active.checkOut=new Date().toISOString();
  save();
  renderProgress();
  setTimeout(()=>showToast('Gym session checked out'),80);
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

  app.innerHTML=`<main class="screen ${restoreTabState?'':'view-enter'} note-theme nav-screen">
    <header class="topbar note-topbar workout-topbar"><span class="topbar-spacer" aria-hidden="true"></span><span class="topbar-spacer" aria-hidden="true"></span><button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${ICON.settings}</button></header>
    <div class="container nav-page-container progress-hub">
      <section class="nav-hero-card progress-hero-card">
        <div><span class="note-kicker">This week</span><h1>${pct}% complete</h1><p>${done} of ${total} planned working sets finished</p></div>
        <div class="nav-progress-ring" style="--progress:${pct*3.6}deg"><strong>${pct}%</strong></div>
      </section>

      <section class="progress-metric-grid" aria-label="Weekly training metrics">
        <article class="progress-metric"><small>Workouts</small><strong>${workoutsDone}<span>/5</span></strong><p>planned days complete</p></article>
        <article class="progress-metric"><small>Working sets</small><strong>${done}<span>/${total}</span></strong><p>completed this week</p></article>
        <article class="progress-metric"><small>Gym visits</small><strong>${visits.length}</strong><p>verified check-ins</p></article>
        <article class="progress-metric"><small>Gym time</small><strong>${formatDuration(gymMinutes*60000)}</strong><p>logged this week</p></article>
      </section>

      <section class="progress-feature-card gym-card ios-card-enter">
        <div class="progress-card-head"><div><span class="note-kicker">Gym attendance</span><h2>Check-in</h2></div><span class="privacy-chip"><span class="chip-icon">${ICON.location}</span>100 m</span></div>
        ${gymStatusMarkup()}
        ${gymTodayTimesMarkup()}
        <div class="biometric-strip"><span class="biometric-icon">${ICON.faceId}</span><div><strong>Face ID protected</strong><small>Location + device identity are verified before check-in.</small></div></div>
        <div class="gym-actions gym-actions-single">
          ${active
            ? `<button class="gym-action primary is-checked-in" id="gymVisitToggle"><span class="button-icon">${ICON.check}</span><span>Checked in</span></button>`
            : gymCheckInPending
              ? `<button class="gym-action primary faceid-action is-busy" id="gymVisitToggle" disabled aria-disabled="true" aria-busy="true"><span class="button-spinner" aria-hidden="true"></span><span>Verifying location…</span></button>`
              : `<button class="gym-action primary faceid-action" id="gymVisitToggle"><span class="button-icon">${ICON.faceId}</span><span>Check in with Face ID</span></button>`}
        </div>
      </section>
    </div>
  </main>`;

  document.getElementById('gymVisitToggle')?.addEventListener('click',()=>{
    if(gymCheckInPending) return;
    if(activeGymVisit()) checkOutGym();
    else requestGymCheckIn();
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
  app.innerHTML=`<main class="screen ${daySwitch?'day-switch-static':restoreTabState?'':'view-enter'} note-theme note-workout">
    <header class="topbar note-topbar workout-topbar">
      <span class="topbar-spacer" aria-hidden="true"></span>
      <span class="topbar-spacer" aria-hidden="true"></span>
      <button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${ICON.settings}</button>
    </header>
    <div class="container note-workout-container">
      <section class="workout-header note-workout-header">
        <div class="note-kicker">Day ${activeDay} · ${day.title}</div>
        <div class="day-strip" aria-label="Training days">
          ${Object.keys(DAYS).map(n=>{ const complete=isDayComplete(n); return `<button class="day-pill ${Number(n)===activeDay?'active':''} ${complete?'day-complete':''}" data-day="${n}"><strong>Day ${n}</strong>${complete?`<span class="day-complete-mark" aria-label="Day ${n} complete">${ICON.check}</span>`:''}</button>`; }).join('')}
        </div>
        <article class="summary-card note-summary-card compact-summary-card">
          <div class="summary-row">
            <div class="summary-progress-copy"><h2>Day ${activeDay} workout</h2><div class="summary-set-status ${doneCount()===totalSets()?'is-complete':''}"><span class="summary-set-count">${doneCount()}/${totalSets()}</span><span>working sets completed</span></div></div>
            <div class="progress-ring" style="--progress:${p*3.6}deg"><strong>${p}%</strong></div>
          </div>
          ${weekGoalMarkup()}
          <button class="primary-btn compact-start-btn" id="startWorkout">${ICON.play}<span>${doneCount() ? 'Continue Workout' : 'Start Workout'}</span></button>
        </article>
      </section>
      <section class="section note-section compact-warmup-section">
        <article class="group-card warmup note-group-card ${tabViewState.workout.warmupOpen?'open':''}" id="warmupCard" aria-expanded="${tabViewState.workout.warmupOpen?'true':'false'}">
          <div class="warmup-flow compact-warmup-flow" id="warmupToggle" role="button" tabindex="0" aria-expanded="${tabViewState.workout.warmupOpen?'true':'false'}" aria-label="Show warm-up notes" style="--warmup-figure:url('${day.warmup.image || './assets/warmup/upper-body-mobility-cutout-cropped.webp'}')">
            <span class="warmup-label">Warm-up</span>
            <strong class="warmup-heading">${day.warmup.duration}</strong>
            <p class="warmup-intro">${day.warmup.intro}</p>
            <div class="warmup-details"><strong class="warmup-detail-name">${day.warmup.name}</strong>${day.warmup.details} Keep the effort easy and use the warm-up to check how your joints and movement feel before the first working set.</div>
          </div>
        </article>
      </section>
      ${renderSection('Main Workout')}
      ${renderSection('Core & Cardio')}
    </div>
  </main>`;
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

function renderSection(name){
  const list=exercises.filter(e=>e.section===name);
  const isMain=name==='Main Workout';
  const subtitle=isMain?DAYS[activeDay].mainSubtitle:DAYS[activeDay].coreSubtitle;
  const sectionRequired=list.reduce((sum,e)=>sum+(e.requiredSets || e.sets),0);
  const sectionComplete=list.reduce((sum,e)=>{
    const required=e.requiredSets || e.sets;
    return sum+(state.completed[e.id]||[]).slice(0,required).filter(Boolean).length;
  },0);
  const sectionPercent=sectionRequired?Math.round((sectionComplete/sectionRequired)*100):0;
  const sectionDone=sectionRequired>0 && sectionComplete>=sectionRequired;
  return `<section class="section note-section workout-block-section">
    <article class="day-block-card ${isMain?'main-block':'finish-block'} ${sectionDone?'section-complete':''}" style="--section-progress:${sectionPercent}%">
      <div class="day-block-head">
        <div class="day-block-heading-row">
          <div>
            <h2>${isMain?'Main Workout':'Core & Cardio'}</h2>
            <p>${subtitle}</p>
          </div>
          <span class="day-block-count" aria-label="${list.length} exercises">${list.length}</span>
        </div>
        <div class="section-game-row" aria-label="${sectionComplete} of ${sectionRequired} working sets completed">
          <span class="section-game-copy"><strong>${sectionComplete}/${sectionRequired}</strong> working sets</span>
          <span class="section-game-status">${sectionDone?'Complete':`${sectionPercent}%`} </span>
        </div>
        <span class="section-progress-rail" aria-hidden="true"><i></i></span>
      </div>
      <div class="day-exercise-list">
        ${list.map(e=>{
          const required=e.requiredSets || e.sets;
          const complete=(state.completed[e.id]||[]).slice(0,required).filter(Boolean).length;
          const done=complete>=required;
          return `<button class="day-exercise-row ${done?'is-complete':''}" data-exercise="${e.id}">
            <span class="day-exercise-number">${done?ICON.check:e.number}</span>
            <span class="day-exercise-copy">
              <strong>${e.name}</strong>
              <span class="day-exercise-meta">${exerciseListMeta(e).map(item=>`<span>${item}</span>`).join('')}</span>
              <span class="set-progress-chip ${done?'is-complete':''}" style="--set-progress:${Math.max(0,Math.min(100,(complete/required)*100))}%" aria-label="${complete} of ${required} working sets completed">
                <span class="set-progress-copy"><strong>${complete}/${required}</strong><span>${done?'sets complete':'working sets'}</span></span>
                <span class="set-progress-track" aria-hidden="true"><i></i></span>
              </span>
            </span>
            <span class="day-exercise-chevron">${ICON.chevron}</span>
          </button>`;
        }).join('')}
      </div>
    </article>
  </section>`;
}


function setWord(count){ return Number(count)===1 ? 'set' : 'sets'; }
function exerciseListMeta(ex){
  const count=ex.setsLabel || ex.sets;
  const setsText=`${count} ${String(count)==='1' ? 'set' : 'sets'}`;
  if(ex.logType==='time' || ex.id==='deadbug-plank') return [setsText, ex.reps, `${ex.rest} rest`];
  if(ex.logType==='cardio' || ex.id==='cardio') return [setsText, ex.reps, 'conditioning'];
  if(ex.logType==='repsOnly') return [setsText, `${ex.reps} reps`, `${ex.rest} rest`];
  return [setsText, ex.reps, `${ex.rest} rest`];
}
function exerciseDetailMeta(ex){
  const count=ex.setsLabel || ex.sets;
  const setsText=`${count} ${String(count)==='1' ? 'set' : 'sets'}`;
  if(ex.logType==='time' || ex.id==='deadbug-plank') return `${setsText} · ${ex.reps} · ${ex.rest} rest`;
  if(ex.logType==='cardio' || ex.id==='cardio') return `${setsText} · ${ex.reps} · steady conditioning`;
  return `${setsText} · ${ex.reps} reps · ${ex.rest} rest`;
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
  app.innerHTML=`<div class="edge-back-stage">${underlay}<main class="detail-screen view-enter note-theme">
    <header class="topbar note-topbar">
      <button class="icon-btn note-icon-btn" id="backBtn" aria-label="Back to workout">${ICON.back}</button>
      <span class="topbar-spacer" aria-hidden="true"></span>
      <button class="icon-btn note-icon-btn" id="moreBtn" aria-label="Settings">${ICON.settings}</button>
    </header>
    <div class="detail-content note-detail-content">
      <section class="detail-heading note-heading">
        <div class="note-kicker">Day ${activeDay} · ${DAYS[activeDay].title}</div>
        <h1>${ex.name}</h1>
        <div class="detail-meta note-detail-meta">${exerciseDetailMeta(ex)}</div>
      </section>

      ${movementMarkup(ex)}


      <section class="detail-section">
        <div class="note-card target-card ${([1,2,3,4,5].includes(activeDay)?'day1-target-card':'')}">${targetMarkup(ex)}</div>
      </section>

      <section class="detail-section">
        <h2>How to perform</h2>
        <article class="note-card reading-card note-list-card">
          ${noteBullets(ex.steps, 3)}
        </article>
      </section>

      <section class="detail-section" id="watchFormSection">
        <h2>Watch your form</h2>
        <article class="note-card caution-card note-list-card">
          ${noteBullets(ex.watchouts, 3)}
        </article>
      </section>

      <section class="detail-section log-sets-section ${canLogSets()?'':'is-locked'}">
        <div class="section-title-row"><h2>${ex.sets===1 ? 'Log set' : 'Log sets'}</h2>${state.developmentMode?'<span class="section-caption dev-mode-caption">Development mode</span>':''}</div>
        ${!canLogSets()?`<button class="log-gate-card" id="logGateCard" type="button" aria-label="Go to Gym Attendance to check in"><span class="log-gate-icon">${ICON.location}</span><span class="log-gate-copy"><strong>Check in to log entries</strong><small>Open Gym Attendance to unlock your sets.</small></span><span class="log-gate-chevron">${ICON.chevron}</span></button>`:''}
        <div class="log-sets-layout ${ex.sets===1 ? 'single-set-layout' : ''}">
          <div class="set-card compact-set-card">
            ${Array.from({length:ex.sets},(_,i)=>renderSetLine(ex,i,completed[i],!canLogSets())).join('')}
          </div>
          <button class="log-watch-form-btn" id="watchFormBtn" type="button"><span>Watch</span><strong>Form</strong><span class="watch-form-arrow">${ICON.external}</span></button>
        </div>
      </section>

    </div>
  </main></div>`;
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

function renderSetLine(ex,i,done,locked=false){
  const log=(state.logs[ex.id]||[])[i]||{};
  const optional=i >= (ex.requiredSets || ex.sets);
  const indexMarkup=`<div class="set-index"><strong>${i+1}</strong><small>${optional?'opt.':'set'}</small></div>`;
  const checkMarkup=`<button class="check-btn ${done?'done':''}" data-check="${i}" ${locked?'disabled aria-disabled="true"':''} aria-label="${done?'Unmark':'Complete'} set ${i+1}">${done?ICON.check:'<span class="check-dot"></span>'}</button>`;
  if(ex.logType==='time' || ex.id==='deadbug-plank'){
    return `<div class="set-line compact-set-line timed-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>seconds</span><input data-log="duration" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="numeric" type="number" min="0" value="${log.duration||''}" placeholder="${String(ex.reps).replace(/[^0-9–-]/g,'')}"/></label>
      <div class="set-prescription"><span>goal</span><strong>${ex.reps}</strong></div>
      ${checkMarkup}
    </div>`;
  }
  if(ex.logType==='cardio' || ex.id==='cardio'){
    return `<div class="set-line compact-set-line timed-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>minutes</span><input data-log="duration" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="numeric" type="number" min="0" value="${log.duration||''}" placeholder="${String(ex.reps).match(/\d+/)?.[0] || '15'}"/></label>
      <label class="input-wrap compact-input"><span>level</span><input data-log="level" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="decimal" type="number" min="0" step="0.5" value="${log.level||''}" placeholder="opt."/></label>
      ${checkMarkup}
    </div>`;
  }
  if(ex.logType==='repsOnly'){
    return `<div class="set-line compact-set-line reps-only-set-line">
      ${indexMarkup}
      <label class="input-wrap compact-input timed-primary"><span>reps</span><input data-log="reps" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="numeric" type="number" min="0" value="${log.reps !== undefined && log.reps !== '' ? log.reps : 13}" placeholder="13"/></label>
      <div class="set-prescription"><span>goal</span><strong>${ex.reps}</strong></div>
      ${checkMarkup}
    </div>`;
  }
  return `<div class="set-line compact-set-line">
    ${indexMarkup}
    <label class="input-wrap compact-input"><span>kg</span><input data-log="weight" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="decimal" type="number" min="0" step="0.5" value="${log.weight||''}" placeholder="0"/></label>
    <label class="input-wrap compact-input"><span>reps</span><input data-log="reps" data-index="${i}" data-ex="${ex.id}" ${locked?'disabled aria-disabled="true"':''} inputmode="numeric" type="number" min="0" value="${log.reps !== undefined && log.reps !== '' ? log.reps : 13}" placeholder="13"/></label>
    ${checkMarkup}
  </div>`;
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
