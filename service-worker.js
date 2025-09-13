const CACHE_NAME = "v1";
const urlsToCache = [
  "/test-pwa-react/",
  "/test-pwa-react/index.html",
  "/test-pwa-react/app.css",
  "/test-pwa-react/home.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Оборачиваем каждый add в catch, чтобы игнорировать ошибки 404
      Promise.all(urlsToCache.map((url) => cache.add(url).catch(() => {})))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
