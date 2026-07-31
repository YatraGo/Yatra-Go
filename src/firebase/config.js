import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredFirebaseKeys = Object.entries(firebaseConfig);

export const isFirebaseConfigured = requiredFirebaseKeys.every(([, value]) => Boolean(value));

if (!isFirebaseConfigured) {
    const missingKeys = requiredFirebaseKeys
        .filter(([, value]) => !value)
        .map(([key]) => key);

    console.warn(
        `Firebase is not fully configured. Missing: ${missingKeys.join(', ')}. ` +
        'Add the matching VITE_FIREBASE_* values to your .env file.'
    );
}

export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export const messaging = app && typeof window !== 'undefined' && 'serviceWorker' in navigator ? getMessaging(app) : null;
