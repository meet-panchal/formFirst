const CACHE_PREFIX = 'form-first-';
const CACHE_NAME = `${CACHE_PREFIX}v44`;
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
  './css/13-ios-polish.css',
  './css/14-viewport-and-overlays.css',
  './css/15-v35-visual-restoration.css',
  './css/16-floating-alarm-navigation.css',
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
  './src/services/web-push.js',
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
  './assets/branding/form-first-splash.mp4',
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

async function respondToMediaRange(request) {
  const cache = await caches.open(CACHE_NAME);
  const url = request.url;
  let fullResponse = await cache.match(url);

  if (!fullResponse) {
    try {
      fullResponse = await fetch(new Request(url, { method: 'GET' }));
      if (isCacheable(fullResponse)) await putIfCacheable(cache, url, fullResponse);
    } catch {
      return new Response('Media unavailable offline', { status: 503, statusText: 'Offline' });
    }
  }

  if (!fullResponse || !fullResponse.ok) return fullResponse || new Response('', { status: 404 });

  const body = await fullResponse.arrayBuffer();
  const total = body.byteLength;
  const type = fullResponse.headers.get('Content-Type') || 'video/mp4';
  const rangeHeader = request.headers.get('range') || '';
  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);

  if (!match || total === 0) {
    return new Response(body, {
      status: 200,
      headers: { 'Content-Type': type, 'Content-Length': String(total), 'Accept-Ranges': 'bytes' }
    });
  }

  let start;
  let end;
  if (match[1] === '') {
    const suffixLength = Number(match[2]);
    if (!Number.isFinite(suffixLength) || suffixLength <= 0) {
      return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${total}` } });
    }
    start = Math.max(0, total - suffixLength);
    end = total - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === '' ? total - 1 : Math.min(Number(match[2]), total - 1);
  }

  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start >= total || end < start) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${total}` } });
  }

  const chunk = body.slice(start, end + 1);
  return new Response(chunk, {
    status: 206,
    headers: {
      'Content-Type': type,
      'Content-Length': String(chunk.byteLength),
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes'
    }
  });
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

  // Serve MP4 byte ranges from the cached full response. iOS Safari commonly
  // requests video this way, including when the PWA is launched offline.
  if (request.headers.has('range')) {
    if (url.pathname.endsWith('.mp4')) {
      event.respondWith(respondToMediaRange(request));
    }
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

self.addEventListener('push', event => {
  // WebKit requires a visible notification for every received push. Never use
  // this event as a silent background data channel.
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; }
  catch { payload = { body: event.data?.text?.() || '' }; }

  const title = typeof payload.title === 'string' && payload.title.trim()
    ? payload.title.trim()
    : 'Form First';
  const options = {
    body: typeof payload.body === 'string' ? payload.body : 'Your Form First update is ready.',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    tag: typeof payload.tag === 'string' ? payload.tag : 'form-first-update',
    renotify: false,
    data: { url: typeof payload.url === 'string' ? payload.url : './index.html' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const requestedUrl = event.notification.data?.url || './index.html';
    let targetUrl = new URL('./index.html', self.registration.scope);
    try {
      const candidate = new URL(requestedUrl, self.registration.scope);
      if (candidate.origin === self.location.origin) targetUrl = candidate;
    } catch { /* Stay on the app home screen for malformed destinations. */ }

    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clientList) {
      if (!('focus' in client)) continue;
      if (client.url !== targetUrl.href && 'navigate' in client) await client.navigate(targetUrl.href);
      return client.focus();
    }
    return self.clients.openWindow ? self.clients.openWindow(targetUrl.href) : undefined;
  })());
});
