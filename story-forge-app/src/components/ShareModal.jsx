import React, { useState } from 'react';

function ShareModal({ onClose, shareCode, theme, isGenerating }) {
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(shareCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className={`${isLight ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'} rounded-lg shadow-2xl max-w-md w-full p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Share Story</h2>
          <button
            onClick={onClose}
            className={`text-2xl ${isLight ? 'hover:text-gray-600' : 'hover:text-gray-300'} transition-colors`}
          >
            ×
          </button>
        </div>

        {isGenerating ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className={isLight ? 'text-gray-600' : 'text-gray-300'}>Generating share code...</p>
          </div>
        ) : (
          <>
            <p className={`mb-4 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
              Share this code with others so they can import your story into their account:
            </p>

            <div className={`${isLight ? 'bg-gray-100 border-gray-300' : 'bg-gray-700 border-gray-600'} border-2 rounded-lg p-4 mb-4`}>
              <div className="flex items-center justify-between">
                <code className="text-3xl font-bold tracking-widest">{shareCode}</code>
                <button
                  onClick={handleCopyCode}
                  className={`ml-4 px-4 py-2 rounded-lg transition-all ${
                    copied
                      ? 'bg-green-500 text-white'
                      : isLight
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
              💡 This code will expire in 30 days.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isLight
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShareModal;
