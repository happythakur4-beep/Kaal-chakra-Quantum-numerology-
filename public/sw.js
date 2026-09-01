// Kaal Chakra Enhanced Service Worker with Astrologer Data & Offline Queue Caching
const CACHE_NAME = 'kaal-chakra-v2';
const ASTROLOGER_CACHE_NAME = 'kaal-chakra-astrologers-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg'
];

// Precache Astrologer Avatars and Key Static Resources
const ASTROLOGER_AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS).catch((err) => {
          console.warn('[SW] Pre-caching static assets warning:', err);
        });
      }),
      caches.open(ASTROLOGER_CACHE_NAME).then((cache) => {
        return Promise.allSettled(
          ASTROLOGER_AVATARS.map((url) =>
            fetch(url, { mode: 'no-cors' })
              .then((res) => cache.put(url, res))
              .catch((err) => console.warn('[SW] Avatar cache notice:', url, err))
          )
        );
      })
    ])
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== ASTROLOGER_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Listen to client messages for Astrologer Data & Queue Syncing
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_ASTROLOGER_DATA') {
    const payload = event.data.payload;
    caches.open(ASTROLOGER_CACHE_NAME).then((cache) => {
      const response = new Response(JSON.stringify(payload), {
        headers: { 'Content-Type': 'application/json', 'X-Cached-At': String(Date.now()) }
      });
      cache.put('/api/astrologers/cached', response);
    });
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Navigation fallback for Single Page Application
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/index.html') || caches.match('/');
      })
    );
    return;
  }

  // 2. Astrologer Data & Simulated Endpoints: Network-First with Cache Fallback
  if (url.pathname.startsWith('/api/astrologers') || url.pathname.includes('astrologer')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(ASTROLOGER_CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Serve from astrologer offline cache
          return caches.match('/api/astrologers/cached').then((cached) => {
            if (cached) return cached;
            return caches.match(event.request);
          });
        })
    );
    return;
  }

  // 3. Astrologer Avatars & Images: Stale-While-Revalidate / Cache-First
  if (
    event.request.destination === 'image' ||
    url.hostname.includes('images.unsplash.com') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              const responseClone = networkResponse.clone();
              caches.open(ASTROLOGER_CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 4. Default Static Assets Cache Strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(() => {
          return cachedResponse;
        });
    })
  );
});
