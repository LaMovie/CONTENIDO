const CACHE_NAME = 'v1_cache_mi_app';
const urlsToCache = [
  './',
  './REGISTROS.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Hacer que la app funcione offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
