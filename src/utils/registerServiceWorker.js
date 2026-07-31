export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Pass the Firebase config to the service worker via URL params
      // so we don't have to hardcode it in the public file.
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };
      const configStr = encodeURIComponent(JSON.stringify(firebaseConfig));

      // Register the service worker
      const registration = await navigator.serviceWorker.register(`/firebase-messaging-sw.js?config=${configStr}`, {
        scope: '/'
      });
      
      console.log('Service Worker registered successfully with scope:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  } else {
    console.warn('Service Workers are not supported in this browser.');
    return null;
  }
};
