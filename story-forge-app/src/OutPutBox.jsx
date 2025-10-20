// src/OutPutBox.jsx (Updated)

import React from 'react';

function OutputBox({ storyText }) {
  return (
    <div className="w-full h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex justify-center overflow-hidden">
      {/* Added max-h-[100%] and overflow-y-auto to allow scrolling for longer text */}
      <div className="text-blue-100 text-lg leading-relaxed text-left w-full max-h-[100%] overflow-y-auto">
        {/* The 'whitespace-pre-wrap' class is key to respecting the newline characters ('\n') in your story string, which creates paragraphs. */}
        <p className="whitespace-pre-wrap">{storyText}</p>
      </div>
    </div>
  );
}

export default OutputBox;