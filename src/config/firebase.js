// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADXWJ6-kp-eP_Y_Ba4Lie9zHZ4yxXB6Ug",
  authDomain: "wellwigen-notification.firebaseapp.com",
  projectId: "wellwigen-notification",
  storageBucket: "wellwigen-notification.firebasestorage.app",
  messagingSenderId: "432968044811",
  appId: "1:432968044811:web:f8cf9a97257b3552af520e",
  measurementId: "G-MV1LPDDBE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Safely initialize messaging (throws in non-HTTPS or unsupported environments)
let messaging = null;
try {
  messaging = getMessaging(app);
} catch (err) {
  console.warn('Firebase Messaging not supported in this environment:', err.message);
}

export { db, messaging, app };
