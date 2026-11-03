const fs = require('fs');
const vm = require('vm');

function classList(){ return { add(){}, remove(){}, toggle(){}, contains(){ return false; } }; }
function style(){ return { setProperty(){}, removeProperty(){} }; }
function fakeContext2d(){
  return new Proxy({}, { get(_t, prop){
    if (['clearRect','save','restore','translate','rotate','fillRect','beginPath','arc','fill','setTransform'].includes(prop)) return ()=>{};
    return 0;
  }, set(){ return true; } });
}
function makeElement(id='') {
  const target = {
    id, innerHTML:'', textContent:'', outerHTML:'', hidden:false, disabled:false, value:'', checked:false,
    dataset:{}, style:style(), classList:classList(), offsetWidth:320, offsetHeight:600, scrollTop:0,
    addEventListener(){}, removeEventListener(){}, setAttribute(){}, removeAttribute(){}, appendChild(){}, remove(){},
    setPointerCapture(){}, releasePointerCapture(){}, focus(){}, click(){},
    querySelector(){ return makeElement(); }, querySelectorAll(){ return []; },
    cloneNode(){ return makeElement(); }, closest(){ return null; },
    getBoundingClientRect(){ return {left:0,top:0,width:100,height:44,right:100,bottom:44}; },
    getContext(){ return fakeContext2d(); }
  };
  return new Proxy(target, {
    get(t,p){ if (p in t) return t[p]; if (p === 'parentElement') return null; return undefined; },
    set(t,p,v){ t[p]=v; return true; }
  });
}

const elements = new Map();
const getEl = id => { if (!elements.has(id)) elements.set(id, makeElement(id)); return elements.get(id); };
const document = {
  documentElement: makeElement('html'), body: makeElement('body'), head: makeElement('head'),
  visibilityState:'visible',
  getElementById:getEl,
  querySelector(){ return null; },
  querySelectorAll(){ return []; },
  createElement(tag){ const el=makeElement(); if(tag==='canvas') el.getContext=()=>fakeContext2d(); return el; },
  addEventListener(){}, removeEventListener(){}
};
const localStorage = { getItem(){ return null; }, setItem(){} };
const location = { href:'file:///formfirst/index.html' };
const history = { pushState(){}, replaceState(){}, back(){} };
const navigator = { vibrate(){}, userAgent:'smoke-test' };
const windowObj = {
  document, localStorage, location, history, navigator,
  innerWidth:430, innerHeight:932, devicePixelRatio:2,
  addEventListener(){}, removeEventListener(){},
  matchMedia(){ return {matches:false, addEventListener(){}, removeEventListener(){}}; },
  open(){}, scrollTo(){}, requestAnimationFrame(cb){ return 1; }, cancelAnimationFrame(){},
  setTimeout, clearTimeout, setInterval, clearInterval,
};
windowObj.window = windowObj;

const context = vm.createContext({
  window:windowObj, document, localStorage, location, history, navigator,
  console, Intl, Date, Math, JSON, URL, URLSearchParams,
  setTimeout, clearTimeout, setInterval, clearInterval,
  requestAnimationFrame: windowObj.requestAnimationFrame,
  cancelAnimationFrame: windowObj.cancelAnimationFrame,
  performance:{now:()=>0},
  crypto: require('crypto').webcrypto,
  TextEncoder, TextDecoder,
});
context.globalThis = context;

const code = fs.readFileSync(require('path').join(__dirname,'..','app.js'),'utf8');
try {
  vm.runInContext(code, context, {filename:'app.js'});
  const app = getEl('app');
  if (!app.innerHTML || app.innerHTML.length < 100) throw new Error('Startup completed but #app was not rendered');
  if (!app.innerHTML.includes('note-workout')) throw new Error('Workout homepage markup was not rendered');
  if (!/class="day-pill active[^"]*" data-day="1"/.test(app.innerHTML)) throw new Error('Fresh startup did not select Day 1');

  const initialMarkup = app.innerHTML;
  if (typeof context.selectDay !== 'function') throw new Error('selectDay() is not available to smoke-test day navigation');
  const initialDay = vm.runInContext('activeDay', context);

  context.selectDay(initialDay);
  if (app.innerHTML !== initialMarkup) {
    throw new Error('Selecting the already-active day re-rendered the workout view');
  }

  vm.runInContext(`DAYS[1].exercises.forEach(ex => { weekBucket()[ex.id] = Array(ex.requiredSets || ex.sets).fill(true); });`, context);
  if (vm.runInContext('getInitialIncompleteDay()', context) !== 2) {
    throw new Error('Initial day selection did not skip a completed Day 1');
  }
  if (vm.runInContext('getNextDayInSequence(1)', context) !== 2) {
    throw new Error('Continue flow did not advance to the next incomplete day');
  }

  const changedDay = initialDay === 5 ? 4 : initialDay + 1;
  context.selectDay(changedDay);
  if (app.innerHTML === initialMarkup || !app.innerHTML.includes(`Day ${changedDay}`)) {
    throw new Error('Selecting a different day did not render the new workout day');
  }

  if (typeof context.openExercise !== 'function') throw new Error('openExercise() is not available');
  const testExercise = vm.runInContext('DAYS[activeDay].exercises[0]', context);
  context.openExercise(testExercise.id);
  if (!app.innerHTML.includes('detail-screen') || !app.innerHTML.includes(testExercise.name)) {
    throw new Error('Exercise detail did not render');
  }

  if (typeof context.renderProgress !== 'function') throw new Error('renderProgress() is not available');
  context.renderProgress();
  if (!app.innerHTML.includes('progress-hub') || !app.innerHTML.includes('Gym attendance')) {
    throw new Error('Progress view did not render');
  }

  if (typeof context.renderTimer !== 'function') throw new Error('renderTimer() is not available');
  context.renderTimer();
  if (!app.innerHTML.includes('timer-page') || !app.innerHTML.includes('Recovery')) {
    throw new Error('Timer view did not render');
  }

  console.log(`PASS startup smoke: Day 1 startup, same-day no-op, day change, detail, Progress, and Timer render`);
} catch (error) {
  console.error('FAIL startup smoke');
  console.error(error && error.stack || error);
  process.exit(1);
}
