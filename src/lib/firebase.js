import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
