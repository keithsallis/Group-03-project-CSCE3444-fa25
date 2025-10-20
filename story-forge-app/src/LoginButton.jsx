// src/LoginButton.jsx
import React from 'react';
import { auth } from './firebase.js'; //
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function LoginButton() {
  
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // This will open a pop-up window for Google sign-in
      await signInWithPopup(auth, provider);
      // The auth state change will be detected by the listener in App.jsx
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <button
      onClick={handleLogin}
      // Styling is identical to your existing Header.jsx button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
    >
      Log In
    </button>
  );
}

export default LoginButton;