// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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