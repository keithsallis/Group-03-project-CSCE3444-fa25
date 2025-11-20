import React, { useState, useEffect, useRef } from 'react';

// Must match keys in backend/context.json
const WRITER_STYLES = [
  "Default",
  "Noir",
  "Shakespearean",
  "Dr. Seuss",
  "Lovecraftian",
  "Cyberpunk",
  "Hemingway",
  "Gothic"
];

function PromptInput({ prompt, onPromptChange, onForge, style = "Default", onStyleChange, isLoading }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      onForge();
    }
  };

  return (
    <div className="w-full relative z-20"> 
      {/* Main Input Container - Pill Shape */}
      <div className="flex items-center w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-blue-400/50 transition-all shadow-lg">
        
        {/* Style Selector (Left Side) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-200 bg-white/5 hover:bg-white/10 hover:text-white transition-colors border border-transparent hover:border-white/10"
            aria-label="Select writer style"
          >
            {/* Magic Wand / Pen Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
            
            <span className="hidden sm:inline-block">{style}</span>
            
            {/* Chevron */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-[#1e293b] border border-white/20 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="p-1 max-h-60 overflow-y-auto custom-scrollbar">
                {WRITER_STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onStyleChange(s);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                      style === s 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {s}
                    {style === s && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-white/10 mx-2"></div>

        {/* Input Field (Middle) */}
        <input
          type="text"
          value={prompt}
          onChange={onPromptChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a spark of inspiration..."
          disabled={isLoading}
          className="flex-grow bg-transparent border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0 px-2 py-2 text-base disabled:opacity-50"
          autoComplete="off"
        />

        {/* Submit Button (Right) */}
        <button
          onClick={onForge}
          disabled={isLoading || !prompt.trim()}
          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
             !prompt.trim() || isLoading
              ? 'text-gray-500 bg-transparent cursor-not-allowed' 
              : 'bg-blue-600 text-white shadow-lg hover:bg-blue-500 hover:scale-105 active:scale-95'
          }`}
          aria-label="Forge Story"
        >
          {isLoading ? (
             <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          )}
        </button>

      </div>
    </div>
  );
}

export default PromptInput;