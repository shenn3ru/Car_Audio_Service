import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyApbPEKAGJ484J9wJkFSUGiynaJcr_JOJs",
  authDomain: "car-audio-service.firebaseapp.com",
  projectId: "car-audio-service",
  storageBucket: "car-audio-service.firebasestorage.app",
  messagingSenderId: "927919689883",
  appId: "1:927919689883:web:7a7866fa268a717828763e",
  measurementId: "G-XCNB22Z6F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Export the database instance
export const db = getFirestore(app);
export default app;