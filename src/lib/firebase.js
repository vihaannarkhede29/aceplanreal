import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCCX9x-UOFJ8Kb-Po24_BIFrAwvDW1ZmI",
  authDomain: "aceplan-eb419.firebaseapp.com",
  projectId: "aceplan-eb419",
  storageBucket: "aceplan-eb419.firebasestorage.app",
  messagingSenderId: "195804205004",
  appId: "1:195804205004:web:732c1d761ea5b1d6701769",
  measurementId: "G-RJ6FENL479"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase: App initialized successfully');

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log('Firebase: Auth initialized successfully');

// Initialize Firestore Database
export const db = getFirestore(app);
console.log('Firebase: Firestore initialized successfully');

// Initialize Firebase Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
console.log('Firebase: Analytics initialized:', analytics ? 'successfully' : 'not available (SSR)');

export default app;
