// src/SettingsDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { auth } from './firebase.js'; //
import { signOut } from 'firebase/auth';

// This component expects a 'user' object as a prop
function SettingsDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to detect clicks outside

  // Effect to close the dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false); // Close dropdown on logout
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  // If no user is passed, don't render anything
  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to toggle dropdown (User's avatar) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        ) : (
          // Fallback to user's first initial
          <span className="font-bold text-white">
            {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
          </span>
        )}
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
          {/* Info Panel */}
          <div className="px-4 py-2 text-sm text-gray-700">
            Signed in as <br />
            <strong className="font-medium text-gray-900">{user.email}</strong>
          </div>
          <div className="border-t border-gray-200"></div>
          
          {/* Menu Items */}
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </a>
          <div className="border-t border-gray-200"></div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default SettingsDropdown;