import { getToken, onMessage } from 'firebase/messaging';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { messaging, db, auth } from '../firebase/config';

// Replace with your actual Public VAPID Key from Firebase Console
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'YOUR_PUBLIC_VAPID_KEY_HERE';

/**
 * Requests notification permission from the user.
 * @returns {Promise<string>} The permission status ('granted', 'denied', or 'default').
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notification');
    return 'denied';
  }
  const permission = await Notification.requestPermission();
  return permission;
};

/**
 * Generates an FCM token and saves it to Firestore.
 * @returns {Promise<string|null>} The generated token, or null if generation failed.
 */
export const generateToken = async () => {
  try {
    if (!messaging) {
      console.warn('Messaging is not initialized. Check your Firebase config.');
      return null;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      
      if (currentToken) {
        await saveTokenToFirestore(currentToken);
        return currentToken;
      } else {
        console.warn('No registration token available. Request permission to generate one.');
        return null;
      }
    } else {
      console.warn('Notification permission not granted.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
    return null;
  }
};

/**
 * Saves the FCM token and device metadata to Firestore.
 * @param {string} token - The FCM token.
 */
const saveTokenToFirestore = async (token) => {
  if (!db) return;

  try {
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const platform = navigator.platform;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Extract a simple browser name
    let browser = 'Unknown';
    if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
    else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) browser = "Opera";
    else if (userAgent.indexOf("Trident") > -1) browser = "IE";
    else if (userAgent.indexOf("Edge") > -1) browser = "Edge";
    else if (userAgent.indexOf("Chrome") > -1) browser = "Chrome";
    else if (userAgent.indexOf("Safari") > -1) browser = "Safari";

    const tokenDocRef = doc(db, 'fcm_tokens', token);
    
    const payload = {
      token,
      updatedAt: serverTimestamp(),
      browser,
      platform,
      language,
      timezone,
      userAgent,
      uid: auth?.currentUser?.uid || null,
    };

    // Use setDoc with merge: true to update existing token or create a new one
    await setDoc(tokenDocRef, payload, { merge: true });
    
    // Also save createdAt only if it's a new document. 
    // We can do this by running a separate update or just letting updatedAt serve our needs.
    // For simplicity, we just rely on setDoc with merge to not overwrite existing data, 
    // but createdAt would need a slightly more complex transaction if we wanted it perfectly immutable.
    // However, setDoc with merge is standard for updating token presence.
  } catch (error) {
    console.error('Error saving token to Firestore:', error);
  }
};

/**
 * Listens for foreground messages.
 * @param {Function} callback - Function to call when a message is received.
 * @returns {Function} Unsubscribe function.
 */
export const onMessageListener = (callback) => {
  if (!messaging) return () => {};
  
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
};
