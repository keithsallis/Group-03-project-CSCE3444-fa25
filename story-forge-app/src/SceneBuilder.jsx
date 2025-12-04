// src/SceneBuilder.jsx
import React from 'react';

function SceneBuilder({ setting, onSettingChange }) {
  return (
    <div className="relative w-full h-16">
      <input
        type="text"
        // This connects the input to the state in App.jsx
        value={setting}
        onChange={onSettingChange}
        placeholder="Describe the setting..."
        className="w-full h-full p-4 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm transition-all"
      />
      
      {/* Icon visual indicator */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-xl">
        🌍
      </div>
    </div>
  );
}

export default SceneBuilder;