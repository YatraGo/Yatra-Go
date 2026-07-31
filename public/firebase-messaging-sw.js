importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Helper to get URL query params
const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

try {
  // We pass the config via URL params from our React app when registering the service worker
  const configStr = getUrlParameter('config');
  if (configStr) {
    const firebaseConfig = JSON.parse(configStr);
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);

      const notificationTitle = payload.notification?.title || 'Yatra Go Notification';
      const notificationOptions = {
        body: payload.notification?.body || '',
        icon: '/favicon.ico', // Optional: customize with a high-res icon in public folder
        image: payload.notification?.image || payload.data?.image,
        data: payload.data, // pass along the data payload for the click event
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  } else {
    console.warn('[firebase-messaging-sw.js] No Firebase config found in URL parameters.');
  }
} catch (e) {
  console.error('[firebase-messaging-sw.js] Error initializing Firebase:', e);
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Try to find a URL to open from custom data payload, fallback to homepage
  const clickUrl = event.notification.data?.click_action || event.notification.data?.url || event.notification.data?.link || 'https://yatrago.com';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        // If so, just focus it.
        if (client.url === clickUrl && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(clickUrl);
      }
    })
  );
});
