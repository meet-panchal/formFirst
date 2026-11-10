import { softHaptic } from './haptics.js';

const SWIPE_COMMIT_RATIO = 0.30;
const SWIPE_COMMIT_VELOCITY = 0.52;
const SWIPE_MIN_DISTANCE = 34;

export function installEdgeBackGesture({ app, getCurrentView, onBack, edgeStart = 28 }) {
  let gesture = null;

  const isBlockedTarget = target => target instanceof Element && Boolean(target.closest(
    'input, textarea, select, [contenteditable="true"], button, a, #bottomNav, .settings-overlay, .form-picker-backdrop, .form-webview'
  ));

  const resolveSurface = (x, y, target) => {
    if (getCurrentView() !== 'detail' || x > edgeStart || isBlockedTarget(target)) return null;
    const bottomNavTop = window.innerHeight - (document.getElementById('bottomNav')?.getBoundingClientRect().height || 0);
    if (y >= bottomNavTop) return null;
    const stage = app.querySelector('.edge-back-stage');
    const screen = stage?.querySelector('.detail-screen');
    const underlay = stage?.querySelector('.edge-back-underlay');
    if (!stage || !screen || !underlay) return null;
    return { stage, screen, underlay };
  };

  const begin = ({ id, source, x, y, target }) => {
    const surface = resolveSurface(x, y, target);
    if (!surface) return;
    gesture = {
      id, source, startX: x, startY: y, previousX: x,
      previousAt: performance.now(), velocityX: 0,
      ...surface, tracking: false
    };
  };

  const clearVisualState = current => {
    current.screen.classList.remove('edge-back-dragging');
    current.stage.classList.remove('edge-back-active');
    document.body.classList.remove('edge-back-gesture-active');
  };

  const resetStyles = current => {
    current.screen.style.removeProperty('transform');
    current.screen.style.removeProperty('border-radius');
    current.underlay.style.removeProperty('transform');
    current.underlay.style.removeProperty('filter');
    current.stage.style.removeProperty('--edge-back-progress');
  };

  const cancel = current => {
    clearVisualState(current);
    current.stage.classList.add('edge-back-cancelling');
    current.screen.style.transform = 'translate3d(0,0,0)';
    current.underlay.style.transform = 'translate3d(-10vw,0,0)';
    current.underlay.style.filter = 'brightness(.92)';
    current.stage.style.setProperty('--edge-back-progress', '0');
    window.setTimeout(() => {
      current.stage.classList.remove('edge-back-cancelling');
      resetStyles(current);
    }, 250);
  };

  const commit = current => {
    current.stage.classList.remove('edge-back-active');
    current.stage.classList.add('edge-back-committing');
    current.screen.classList.remove('edge-back-dragging');
    document.body.classList.add('edge-back-gesture-active');
    const width = Math.max(1, current.screen.getBoundingClientRect().width || window.innerWidth);
    current.screen.style.transform = `translate3d(${width + 16}px,0,0)`;
    current.underlay.style.transform = 'translate3d(0,0,0)';
    current.underlay.style.filter = 'brightness(1)';
    current.stage.style.setProperty('--edge-back-progress', '1');
    softHaptic(5);
    window.setTimeout(() => {
      onBack();
      document.body.classList.remove('edge-back-gesture-active');
    }, 220);
  };

  const move = (x, y, preventDefault) => {
    if (!gesture) return false;
    const rawDx = x - gesture.startX;
    const dx = Math.max(0, rawDx);
    const dy = Math.abs(y - gesture.startY);

    if (!gesture.tracking) {
      if (Math.max(Math.abs(rawDx), dy) < 7) return false;
      // Vertical scrolling stays native. Only a leading-edge rightward swipe pops the detail view.
      if (rawDx < 0 || dx < dy * 1.18) {
        gesture = null;
        return false;
      }
      gesture.tracking = true;
      gesture.stage.classList.add('edge-back-active');
      gesture.screen.classList.add('edge-back-dragging');
      document.body.classList.add('edge-back-gesture-active');
    }

    preventDefault?.();
    const width = Math.max(1, gesture.screen.getBoundingClientRect().width || window.innerWidth);
    const distance = Math.min(width, dx);
    const progress = Math.min(1, distance / width);
    const now = performance.now();
    const elapsed = Math.max(1, now - gesture.previousAt);
    gesture.velocityX = (x - gesture.previousX) / elapsed;
    gesture.previousX = x;
    gesture.previousAt = now;

    gesture.screen.style.transform = `translate3d(${distance}px,0,0)`;
    gesture.screen.style.borderRadius = `0 ${Math.min(18, progress * 18)}px ${Math.min(18, progress * 18)}px 0`;
    gesture.underlay.style.transform = `translate3d(${-10 * (1 - progress)}vw,0,0)`;
    gesture.underlay.style.filter = `brightness(${.92 + progress * .08})`;
    gesture.stage.style.setProperty('--edge-back-progress', String(progress));
    return true;
  };

  const finish = (x, id, cancelled = false) => {
    if (!gesture || gesture.id !== id) return;
    const current = gesture;
    gesture = null;
    if (!current.tracking) return;
    const width = Math.max(1, current.screen.getBoundingClientRect().width || window.innerWidth);
    const dx = Math.max(0, x - current.startX);
    const progress = Math.min(1, dx / width);
    const shouldGoBack = !cancelled && (
      progress >= SWIPE_COMMIT_RATIO
      || (current.velocityX > SWIPE_COMMIT_VELOCITY && dx > SWIPE_MIN_DISTANCE)
    );
    if (shouldGoBack) commit(current);
    else cancel(current);
  };

  // iOS Safari: native touch listeners let us cancel the browser's horizontal
  // edge-navigation gesture after a rightward app-back swipe is positively identified.
  document.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) return;
    const touch = event.changedTouches[0];
    begin({ id: touch.identifier, source: 'touch', x: touch.clientX, y: touch.clientY, target: event.target });
  }, { passive: true });

  document.addEventListener('touchmove', event => {
    if (!gesture || gesture.source !== 'touch') return;
    const touch = Array.from(event.changedTouches).find(item => item.identifier === gesture.id);
    if (!touch) return;
    move(touch.clientX, touch.clientY, () => { if (event.cancelable) event.preventDefault(); });
  }, { passive: false });

  document.addEventListener('touchend', event => {
    if (!gesture || gesture.source !== 'touch') return;
    const touch = Array.from(event.changedTouches).find(item => item.identifier === gesture.id);
    if (touch) finish(touch.clientX, touch.identifier, false);
  }, { passive: true });
  document.addEventListener('touchcancel', event => {
    if (!gesture || gesture.source !== 'touch') return;
    const touch = Array.from(event.changedTouches).find(item => item.identifier === gesture.id);
    if (touch) finish(touch.clientX, touch.identifier, true);
  }, { passive: true });

  // Mouse/pen fallback for desktop testing.
  document.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    begin({ id: event.pointerId, source: 'pointer', x: event.clientX, y: event.clientY, target: event.target });
  }, { passive: true });
  document.addEventListener('pointermove', event => {
    if (!gesture || gesture.source !== 'pointer' || event.pointerId !== gesture.id) return;
    move(event.clientX, event.clientY, () => { if (event.cancelable) event.preventDefault(); });
  }, { passive: false });
  document.addEventListener('pointerup', event => {
    if (gesture?.source === 'pointer') finish(event.clientX, event.pointerId, false);
  }, { passive: true });
  document.addEventListener('pointercancel', event => {
    if (gesture?.source === 'pointer') finish(event.clientX, event.pointerId, true);
  }, { passive: true });
}
