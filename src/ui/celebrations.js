import { ICON } from './icons.js';
import { softHaptic } from './haptics.js';

function reducedMotionEnabled() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

export function celebrateSetCompletion(button) {
  if (!button || reducedMotionEnabled()) return;

  const rect = button.getBoundingClientRect();
  const canvas = document.createElement('canvas');
  canvas.className = 'set-confetti-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d', { alpha: true });
  if (!context) {
    canvas.remove();
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const colors = ['#58cc02', '#ffd900', '#1cb0f6', '#ce82ff', '#ff9600'];
  const particleCount = 18;
  const particles = Array.from({ length: particleCount }, (_, index) => {
    const angle = (-Math.PI * 0.92) + (Math.PI * 0.84) * (index / (particleCount - 1)) + ((Math.random() - 0.5) * 0.18);
    const speed = 2.7 + Math.random() * 2.7;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.1,
      gravity: 0.14 + Math.random() * 0.07,
      drag: 0.982,
      size: 2.6 + Math.random() * 3.5,
      rotation: Math.random() * Math.PI,
      rotationVelocity: (Math.random() - 0.5) * 0.28,
      color: colors[index % colors.length],
      life: 1,
      decay: 0.024 + Math.random() * 0.012,
      round: index % 4 === 0
    };
  });

  let previousFrame = performance.now();
  const draw = now => {
    const delta = Math.min(2, (now - previousFrame) / 16.667 || 1);
    previousFrame = now;
    context.clearRect(0, 0, width, height);
    let hasLiveParticle = false;

    for (const particle of particles) {
      particle.vx *= Math.pow(particle.drag, delta);
      particle.vy += particle.gravity * delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.rotation += particle.rotationVelocity * delta;
      particle.life -= particle.decay * delta;
      if (particle.life <= 0) continue;

      hasLiveParticle = true;
      context.save();
      context.globalAlpha = Math.max(0, particle.life);
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;
      if (particle.round) {
        context.beginPath();
        context.arc(0, 0, particle.size * 0.52, 0, Math.PI * 2);
        context.fill();
      } else {
        context.fillRect(-particle.size / 2, -particle.size * 0.72, particle.size, particle.size * 1.44);
      }
      context.restore();
    }

    if (hasLiveParticle) requestAnimationFrame(draw);
    else canvas.remove();
  };

  requestAnimationFrame(draw);
}

export function celebrateDayCompletion({ dayNumber, completedDays, totalDays }) {
  document.querySelector('.workout-celebration')?.remove();
  const layer = document.createElement('div');
  layer.className = 'workout-celebration imessage-confetti';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = `<canvas class="confetti-canvas"></canvas><div class="celebration-badge">${ICON.check}<strong>Day ${dayNumber} complete</strong><small>Weekly goal ${completedDays}/${totalDays}</small></div>`;
  document.body.appendChild(layer);

  const canvas = layer.querySelector('.confetti-canvas');
  const context = canvas?.getContext('2d', { alpha: true });
  if (!canvas || !context) {
    layer.remove();
    return;
  }

  const colors = ['#ffcc00', '#34c759', '#0a84ff', '#ff375f', '#bf5af2', '#ff9f0a', '#64d2ff'];
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  const particleCount = Math.min(220, Math.max(150, Math.round(width * 0.42)));
  const particles = Array.from({ length: particleCount }, (_, index) => ({
    x: Math.random() * width,
    y: -20 - Math.random() * height * 0.38,
    vx: (Math.random() - 0.5) * 2.2,
    vy: 2.7 + Math.random() * 3.8,
    gravity: 0.035 + Math.random() * 0.025,
    drag: 0.996,
    size: 5 + Math.random() * 7,
    long: Math.random() > 0.5,
    circle: Math.random() > 0.84,
    rotation: Math.random() * Math.PI * 2,
    rotationVelocity: (Math.random() - 0.5) * 0.22,
    phase: Math.random() * Math.PI * 2,
    wobble: 0.04 + Math.random() * 0.045,
    color: colors[index % colors.length],
    alpha: 0.95
  }));

  const startedAt = performance.now();
  let previousFrame = startedAt;
  const duration = 2_850;
  const draw = now => {
    const delta = Math.min(2.2, (now - previousFrame) / 16.667 || 1);
    previousFrame = now;
    context.clearRect(0, 0, width, height);
    const elapsed = now - startedAt;

    for (const particle of particles) {
      particle.vx *= Math.pow(particle.drag, delta);
      particle.vy += particle.gravity * delta;
      particle.x += (particle.vx + Math.sin(particle.phase) * 0.45) * delta;
      particle.y += particle.vy * delta;
      particle.rotation += particle.rotationVelocity * delta;
      particle.phase += particle.wobble * delta;
      if (elapsed > 2_200) particle.alpha = Math.max(0, particle.alpha - 0.018 * delta);

      context.save();
      context.globalAlpha = particle.alpha;
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.scale(1, Math.max(0.18, Math.abs(Math.sin(particle.phase))));
      context.fillStyle = particle.color;
      if (particle.circle) {
        context.beginPath();
        context.arc(0, 0, particle.size * 0.48, 0, Math.PI * 2);
        context.fill();
      } else {
        const particleHeight = particle.long ? particle.size * 1.65 : particle.size;
        context.fillRect(-particle.size / 2, -particleHeight / 2, particle.size, particleHeight);
      }
      context.restore();
    }

    if (elapsed < duration) requestAnimationFrame(draw);
    else layer.classList.add('is-leaving');
  };

  requestAnimationFrame(draw);
  softHaptic([10, 32, 10, 32, 16, 42, 20]);

  const onResize = () => resize();
  window.addEventListener('resize', onResize, { passive: true });
  setTimeout(() => {
    window.removeEventListener('resize', onResize);
    layer.remove();
  }, 3_450);
}
