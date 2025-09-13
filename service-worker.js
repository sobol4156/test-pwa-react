self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) =>
      cache.addAll([
        "/test-pwa-react/",
        "/test-pwa-react/index.html",
        "/test-pwa-react/app.css",
        "/test-pwa-react/home.js",
      ])
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((resp) => {
        return caches.open("v1").then((cache) => {
          cache.put(event.request, resp.clone());
          return resp;
        });
      });
    })
  );
});

