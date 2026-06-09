import { getToken } from 'firebase/messaging';
import { messaging } from '../config/firebase.js';

// Get the backend URL from environment or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const requestNotificationPermission = async (userToken, userType = 'user') => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      // WARNING: Add your VAPID key below!
      // You can get this from Firebase Console -> Project Settings -> Cloud Messaging -> Web configuration
      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'BPh8UNpI2OpUjV9giSeeoojHNW0kdS7npX8dizAin6KCoJXJFt-J45xNqP4x6aEE-xWCghC7UslkjaJt67hdiuQ';

      const currentToken = await getToken(messaging, { vapidKey });
      
      if (currentToken) {
        console.log('FCM Token received:', currentToken);
        // Send the token to your server and update the UI if necessary
        await sendTokenToServer(currentToken, userToken, userType);
        return currentToken;
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } else {
      console.log('Notification permission denied.');
    }
  } catch (error) {
    console.error('An error occurred while requesting notification permission:', error);
  }
  return null;
};

const sendTokenToServer = async (fcmToken, userAuthToken, userType) => {
  if (!userAuthToken) {
    console.warn('User is not authenticated, cannot save FCM token');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/notifications/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userAuthToken}`,
      },
      body: JSON.stringify({ token: fcmToken, type: userType }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send token to server');
    }
    
    console.log('FCM token saved successfully on server');
  } catch (error) {
    console.error('Error sending token to server:', error);
  }
};
