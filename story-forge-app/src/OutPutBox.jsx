import React from 'react';

// OutputBox Component
function OutputBox({ storyText }) {
  return (
    <div className="w-full h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex items-center justify-center">
      <div className="text-blue-100 text-lg leading-relaxed text-center">
        <p>{storyText}</p>
      </div>
    </div>
  );
}

export default OutputBox;