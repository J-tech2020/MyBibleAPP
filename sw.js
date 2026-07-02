const CACHE_NAME = 'biblequiz-cache-v1';
const ASSETS = [
  'index.html',
  'static/logo.png',
  'static/icon-192.png',
  'static/icon-512.png',
  'static/bible_data_en.js',
  'static/bible_data_rvg.js'
];

// Install Assets into Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate & Clear old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch Offline Strategy: Cache First, Network Fallback
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});