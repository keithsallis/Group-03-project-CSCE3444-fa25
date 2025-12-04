// src/OutPutBox.jsx
import React from 'react';

function OutputBox({ storyText, theme, fontSize = 'medium' }) {
  
  // Determine styles based on theme
  const isLight = theme === 'light';

  // Translucent / Glassmorphism Styles
  const containerClass = isLight 
    ? "bg-white/60 border-white/50 text-gray-900 shadow-lg backdrop-blur-md" // Light Mode Glass
    : "bg-black/40 border-white/10 text-blue-100 shadow-xl backdrop-blur-md"; // Dark Mode Glass

  // Map Font Size settings to CSS classes
  const sizeClass = {
      small: 'text-sm leading-relaxed',
      medium: 'text-lg leading-relaxed',
      large: 'text-xl md:text-2xl leading-loose'
  }[fontSize];

  return (
    <div className={`relative w-full h-full p-6 border rounded-xl flex flex-col overflow-hidden transition-all duration-300 ${containerClass}`}>
      
      {/* TTS Controls were removed here. 
          The box is now just a clean, translucent reading pane.
      */}

      <div className={`w-full max-h-full overflow-y-auto custom-scrollbar ${sizeClass}`}>
        <p className="whitespace-pre-wrap">{storyText}</p>
      </div>
    </div>
  );
}

export default OutputBox;