import React from 'react';

// --- PromptInput Component ---
function PromptInput({ prompt, onPromptChange, onForge }) {
  
  // rendering prompt input with arrow button to enter
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={prompt}
        onChange={onPromptChange}
        placeholder="Add a spark of inspiration...."
        className="w-full p-4 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
      />
      <button onClick={onForge} className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-gray-300 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </div>
  );
}

export default PromptInput;