// src/SettingsModal.jsx
import React from 'react';

function SettingsModal({ onClose }) {
  return (
    // Backdrop: semi-transparent dark background that closes modal when clicked
    <div 
      onClick={onClose} 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      {/* Modal Content: stopPropagation prevents clicking inside the box from closing it */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 text-white w-full max-w-lg p-6 rounded-xl shadow-2xl border border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Settings</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                ✕
            </button>
        </div>
        
        {/* Settings Options */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label htmlFor="theme" className="text-gray-300 font-medium">Theme</label>
            <select id="theme" className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500">
              <option>Dark Mode</option>
              <option disabled>Light Mode (Coming Soon)</option>
            </select>
          </div>
          
          <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <p className="text-sm text-blue-200">
                  More settings coming soon!
              </p>
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="text-right mt-8 border-t border-white/10 pt-4">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;