import { useState, useEffect } from 'react';
import { generateToken, onMessageListener } from '../services/firebaseMessaging';
import { useAuth } from '../context/AuthContext'; // To track auth state for uid

export const useNotifications = () => {
  const [permissionStatus, setPermissionStatus] = useState(
    'Notification' in window ? Notification.permission : 'denied'
  );
  const [fcmToken, setFcmToken] = useState(null);
  const [currentMessage, setCurrentMessage] = useState(null);
  const { currentUser } = useAuth(); // If auth state changes, we might want to re-save token to attach uid

  // Initialize and check existing permissions
  useEffect(() => {
    const initialize = async () => {
      if ('Notification' in window && Notification.permission === 'granted') {
        const token = await generateToken();
        if (token) {
          setFcmToken(token);
        }
      }
    };

    initialize();
  }, [currentUser]); // Re-run if user changes so token gets updated with new UID

  // Listen for foreground messages
  useEffect(() => {
    const unsubscribe = onMessageListener((payload) => {
      console.log('Foreground message received:', payload);
      setCurrentMessage(payload);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const requestPermissionAndGenerateToken = async () => {
    const token = await generateToken();
    setPermissionStatus(Notification.permission);
    if (token) {
      setFcmToken(token);
    }
    return token;
  };

  const clearCurrentMessage = () => {
    setCurrentMessage(null);
  };

  return {
    permissionStatus,
    fcmToken,
    currentMessage,
    requestPermissionAndGenerateToken,
    clearCurrentMessage,
  };
};
