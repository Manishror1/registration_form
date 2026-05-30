// service-worker.js
// Caches app files and handles push notifications

const CACHE_NAME = "school-app-v1";
const URLS_TO_CACHE = ["/", "/index.html"];

// Install — cache important files
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate — remove old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// Fetch — serve from cache if available, else go to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Push — show notification when message received from server
self.addEventListener("push", (event) => {
  const data = event.data
    ? event.data.json()
    : { title: "Notification", body: "New message received" };
  event.waitUntil(
    self.registration.showNotification(data.title, { body: data.body })
  );
});