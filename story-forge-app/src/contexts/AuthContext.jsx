import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  updateProfile,
} from 'firebase/auth';

import { AuthContext } from './authCore.jsx'

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
      if (displayName) {
        return updateProfile(userCred.user, { displayName }).then(() => userCred);
      }
      return userCred;
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // Fallback: redirect-based sign-in (useful when popups are blocked)
  function signInWithGoogleRedirect() {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  }

  useEffect(() => {
    let unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Try to handle redirect result (if the app returned from a redirect-based sign-in)
    ;(async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          // Ensure we set the current user in case onAuthStateChanged hasn't fired yet
          setCurrentUser(result.user)
          setLoading(false)
        }
      } catch {
        // getRedirectResult may throw when no redirect flow is present; ignore for now
      }
    })()

    return () => unsub && unsub();
  }, []);

  const value = { currentUser, signup, login, logout, signInWithGoogle, signInWithGoogleRedirect };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

