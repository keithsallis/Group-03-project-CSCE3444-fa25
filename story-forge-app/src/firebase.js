import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqeUUKP0OGdyLRkSsIC3lwaDh8Fl3IZhE",
  authDomain: "story-forge-app.firebaseapp.com",
  projectId: "story-forge-app",
  storageBucket: "story-forge-app.firebasestorage.app",
  messagingSenderId: "934296970027",
  appId: "1:934296970027:web:e516253787e2a86aa2db6e",
  measurementId: "G-KJQT61S1HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const _analytics = getAnalytics(app);
export const auth = getAuth(app);