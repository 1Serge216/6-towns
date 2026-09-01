const CACHE_NAME = '6gorodov-v3';
const urlsToCache = [
  '/6-towns/',
  '/6-towns/index.html',
  '/6-towns/manifest.json',
  '/6-towns/icon-192-new.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеш открыт');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Ошибка кеширования:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).catch(() => {});
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = ['6gorodov-v3'];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
