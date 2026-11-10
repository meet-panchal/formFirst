const CACHE_PREFIX = 'form-first-';
const CACHE_NAME = `${CACHE_PREFIX}v45`;
const PRECACHE_MANIFEST_URL = './precache-manifest.json';

// Bypass service-worker caching only on Vite's development server.
// Production preview (4173) and HTTPS deployments use production caching.
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);
const IS_LOCAL_DEVELOPMENT =
  LOCAL_HOSTS.has(self.location.hostname) && self.location.port === '5173';

function isCacheable(response) {
  return Boolean(response) && response.status === 200 && response.type !== 'opaque';
}

async function putIfCacheable(cache, request, response) {
  if (!isCacheable(response)) return;

  try {
    await cache.put(request, response.clone());
  } catch (error) {
    console.warn('Form First cache write failed', error);
  }
}

async function precacheApplicationShell() {
  const manifestUrl = new URL(PRECACHE_MANIFEST_URL, self.registration.scope);
  const response = await fetch(manifestUrl, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Precache manifest request failed: ${response.status}`);
  }

  const entries = await response.json();
  if (!Array.isArray(entries) || !entries.every((entry) => typeof entry === 'string')) {
    throw new Error('Precache manifest must be an array of URL strings.');
  }

  const urls = [...new Set(
    entries.map((entry) => new URL(entry, self.registration.scope).href),
  )];

  if (urls.some((url) => new URL(url).origin !== self.location.origin)) {
    throw new Error('Precache manifest contains a cross-origin URL.');
  }

  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(urls);
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    if (!IS_LOCAL_DEVELOPMENT) {
      await precacheApplicationShell();
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

// Cache lookups use an absolute URL string and ignore query/hash variations
// and Vary headers. This makes a precached Vite bundle match the corresponding
// browser script/stylesheet request reliably in offline mode.
async function matchCachedRequest(cache, request) {
  return cache.match(new URL(request.url).href, {
    ignoreSearch: true,
    ignoreVary: true,
  });
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    await putIfCacheable(cache, request.url, response);
    return response;
  } catch {
    return (await matchCachedRequest(cache, request))
      || (await cache.match(new URL('./index.html', self.registration.scope).href, {
        ignoreSearch: true,
        ignoreVary: true,
      }))
      || new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

// Cache-first for static assets: the production app shell is already precached.
// Network is used only for runtime assets that are not in the precache yet.
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await matchCachedRequest(cache, request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    await putIfCacheable(cache, request.url, response);
    return response;
  } catch {
    return new Response('Asset unavailable offline', {
      status: 504,
      statusText: 'Gateway Timeout',
    });
  }
}

async function respondToMediaRange(request) {
  const cache = await caches.open(CACHE_NAME);
  const url = request.url;
  let fullResponse = await cache.match(url, { ignoreSearch: true, ignoreVary: true });

  if (!fullResponse) {
    try {
      // Fetch the complete media file so future byte-range requests can be
      // served from Cache Storage without requesting each range separately.
      fullResponse = await fetch(new Request(url, { method: 'GET' }));
      if (isCacheable(fullResponse)) {
        await putIfCacheable(cache, url, fullResponse);
      }
    } catch {
      return new Response('Media unavailable offline', {
        status: 503,
        statusText: 'Offline',
      });
    }
  }

  if (!fullResponse || !fullResponse.ok) {
    return fullResponse || new Response('', { status: 404 });
  }

  const body = await fullResponse.arrayBuffer();
  const total = body.byteLength;
  const type = fullResponse.headers.get('Content-Type') || 'video/mp4';
  const rangeHeader = request.headers.get('range') || '';
  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);

  if (!match || total === 0) {
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': type,
        'Content-Length': String(total),
        'Accept-Ranges': 'bytes',
      },
    });
  }

  let start;
  let end;

  if (match[1] === '') {
    const suffixLength = Number(match[2]);
    if (!Number.isFinite(suffixLength) || suffixLength <= 0) {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${total}` },
      });
    }
    start = Math.max(0, total - suffixLength);
    end = total - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === '' ? total - 1 : Math.min(Number(match[2]), total - 1);
  }

  if (
    !Number.isFinite(start)
    || !Number.isFinite(end)
    || start < 0
    || start >= total
    || end < start
  ) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${total}` },
    });
  }

  const chunk = body.slice(start, end + 1);
  return new Response(chunk, {
    status: 206,
    headers: {
      'Content-Type': type,
      'Content-Length': String(chunk.byteLength),
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('fetch', (event) => {
  if (IS_LOCAL_DEVELOPMENT) return;

  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Support iOS MP4 byte-range requests.
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

  event.respondWith(cacheFirst(request));
});

self.addEventListener('push', (event) => {
  // WebKit requires a visible notification for every received push.
  let payload = {};
  try {
    const text = event.data ? event.data.text() : '';
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        payload = { body: text };
      }
    }
  } catch {
    payload = {};
  }

  const title = typeof payload.title === 'string' && payload.title.trim()
    ? payload.title.trim()
    : 'Form First';

  const options = {
    body: typeof payload.body === 'string'
      ? payload.body
      : 'Your Form First update is ready.',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    tag: typeof payload.tag === 'string' ? payload.tag : 'form-first-update',
    renotify: false,
    data: {
      url: typeof payload.url === 'string' ? payload.url : './index.html',
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil((async () => {
    const requestedUrl = event.notification.data?.url || './index.html';
    let targetUrl = new URL('./index.html', self.registration.scope);

    try {
      const candidate = new URL(requestedUrl, self.registration.scope);
      if (candidate.origin === self.location.origin) targetUrl = candidate;
    } catch {
      // Keep the default home destination.
    }

    const clients = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });

    for (const client of clients) {
      if (!('focus' in client)) continue;
      if (client.url !== targetUrl.href && 'navigate' in client) {
        await client.navigate(targetUrl.href);
      }
      return client.focus();
    }

    return self.clients.openWindow
      ? self.clients.openWindow(targetUrl.href)
      : undefined;
  })());
});
