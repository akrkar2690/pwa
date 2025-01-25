const CACHE_NAME = 'react-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/logo192.png',
  '/bundle.js', // The bundled JS file (Webpack output)
];

// Install event - cache all the static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - delete old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve files from the cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {
    const options = {
      body: event.data ? event.data.text() : 'Push notification body text.',
      icon: '/assets/logo192x192.png',  // Adjust with your icon path
      badge: '/assets/logo192x192.png', // Adjust with your badge path
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('/') // You can open the app or specific URL when the notification is clicked
    );
  });
  
