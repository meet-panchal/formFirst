import { softHaptic } from './haptics.js';

export function installEdgeBackGesture({ app, getCurrentView, onBack, edgeStart = 28 }) {
  let gesture = null;

  document.addEventListener('pointerdown', event => {
    if (getCurrentView() !== 'detail' || document.querySelector('.settings-overlay,.form-picker-backdrop,.form-webview')) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.clientX > edgeStart) return;
    const stage = app.querySelector('.edge-back-stage');
    const screen = stage?.querySelector('.detail-screen');
    const underlay = stage?.querySelector('.edge-back-underlay');
    if (!stage || !screen || !underlay) return;
    gesture = { id:event.pointerId, startX:event.clientX, startY:event.clientY, previousX:event.clientX, previousAt:performance.now(), velocityX:0, screen, underlay, stage, tracking:false };
  }, { passive:true });

  document.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const rawDx = event.clientX - gesture.startX;
    const dx = Math.max(0, rawDx);
    const dy = Math.abs(event.clientY - gesture.startY);
    if (!gesture.tracking) {
      if (dx < 7) return;
      if (dy > dx * .72 || rawDx < 0) { gesture = null; return; }
      gesture.tracking = true;
      gesture.stage.classList.add('edge-back-active');
      gesture.screen.classList.add('edge-back-dragging');
      gesture.screen.setPointerCapture?.(event.pointerId);
    }
    event.preventDefault();
    const width = Math.max(1, window.innerWidth);
    const distance = Math.min(width, dx);
    const progress = Math.min(1, distance / width);
    const now = performance.now();
    const elapsed = Math.max(1, now - gesture.previousAt);
    gesture.velocityX = (event.clientX - gesture.previousX) / elapsed;
    gesture.previousX = event.clientX;
    gesture.previousAt = now;
    gesture.screen.style.transform = `translate3d(${distance}px,0,0)`;
    gesture.underlay.style.transform = `translate3d(${-12 * (1 - progress)}vw,0,0)`;
    gesture.underlay.style.filter = `brightness(${.90 + progress * .10})`;
    gesture.stage.style.setProperty('--edge-back-progress', String(progress));
  }, { passive:false });

  const finish = event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const current = gesture;
    gesture = null;
    const width = Math.max(1, window.innerWidth);
    const dx = Math.max(0, event.clientX - current.startX);
    const progress = Math.min(1, dx / width);
    const shouldGoBack = current.tracking && (progress >= .32 || (current.velocityX > .55 && dx > 34));
    current.screen.classList.remove('edge-back-dragging');
    current.stage.classList.remove('edge-back-active');
    if (!current.tracking) return;

    if (shouldGoBack) {
      current.stage.classList.add('edge-back-committing');
      current.screen.style.transform = `translate3d(${width}px,0,0)`;
      current.underlay.style.transform = 'translate3d(0,0,0)';
      current.underlay.style.filter = 'brightness(1)';
      current.stage.style.setProperty('--edge-back-progress', '1');
      softHaptic(5);
      setTimeout(onBack, 230);
      return;
    }

    current.stage.classList.add('edge-back-cancelling');
    current.screen.style.transform = 'translate3d(0,0,0)';
    current.underlay.style.transform = 'translate3d(-12vw,0,0)';
    current.underlay.style.filter = 'brightness(.90)';
    current.stage.style.setProperty('--edge-back-progress', '0');
    setTimeout(() => {
      current.stage.classList.remove('edge-back-cancelling');
      current.screen.style.removeProperty('transform');
      current.stage.style.removeProperty('--edge-back-progress');
    }, 250);
  };

  document.addEventListener('pointerup', finish, { passive:true });
  document.addEventListener('pointercancel', finish, { passive:true });
}
