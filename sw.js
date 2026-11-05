const CACHE_PREFIX = 'form-first-';
const CACHE_NAME = `${CACHE_PREFIX}v36`;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './splash.js',
  './favicon.ico',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/maskable-icon.png',
  './css/01-base.css',
  './css/02-exercise-detail.css',
  './css/03-workout.css',
  './css/04-exercise-logging.css',
  './css/05-navigation-progress.css',
  './css/06-interactions.css',
  './css/07-dark-mode.css',
  './css/08-motion-and-gesture.css',
  './css/09-timer.css',
  './css/10-feedback.css',
  './css/11-feedback-refinements.css',
  './css/12-splash.css',
  './src/app-controller.js',
  './src/config.js',
  './src/core/date-time.js',
  './src/core/gym-visits.js',
  './src/core/html.js',
  './src/core/storage.js',
  './src/core/workout-progress.js',
  './src/data/workouts.js',
  './src/features/timer.js',
  './src/features/gym-attendance.js',
  './src/services/biometrics.js',
  './src/services/geolocation.js',
  './src/services/gym-checkin.js',
  './src/services/notifications.js',
  './src/services/water-reminders.js',
  './src/ui/celebrations.js',
  './src/ui/edge-back.js',
  './src/ui/exercise-media.js',
  './src/ui/feedback.js',
  './src/ui/form-guide.js',
  './src/ui/haptics.js',
  './src/ui/icons.js',
  './src/ui/settings-sheet.js',
  './src/ui/theme.js',
  './src/views/helpers.js',
  './src/views/workout.js',
  './src/views/progress.js',
  './src/views/exercise-detail.js',
  './assets/branding/splash-poster.png',
  './assets/branding/splash-final-frame.png',
  './assets/nav/workout.png',
  './assets/nav/progress.png',
  './assets/nav/timer.png',
  './assets/icons8-fire-transparent.png'
];

function isCacheable(response) {
  return Boolean(response) && response.status === 200 && response.type !== 'opaque';
}

async function putIfCacheable(cache, request, response) {
  if (!isCacheable(response)) return;
  try {
    await cache.put(request, response.clone());
  } catch (error) {
    // A cache write must never turn a successful network response into a failure.
    console.warn('Form First cache write failed', error);
  }
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    await putIfCacheable(cache, request, response);
    return response;
  } catch {
    return (await cache.match(request, { ignoreSearch: true }))
      || (await cache.match('./index.html'))
      || new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then(async response => {
      await putIfCacheable(cache, request, response);
      return response;
    })
    .catch(() => null);

  return cached || (await network) || new Response('', { status: 504, statusText: 'Offline' });
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Browsers commonly request MP4 media with Range. CacheStorage cannot safely
  // treat a 206 partial response like a normal reusable asset, so leave ranges
  // to the browser/network. The splash has poster/final-frame fallbacks offline.
  if (request.headers.has('range')) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      const existingClient = clientList.find(client => 'focus' in client);
      if (existingClient) return existingClient.focus();
      return self.clients.openWindow ? self.clients.openWindow('./index.html') : undefined;
    })
  );
});
