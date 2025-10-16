import React from 'react';

function OutputBox({ storyText }) {
  return (
    <div className="w-full max-w-4xl p-6 bg-gray-100 rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Generated Story</h2>
      <div className="text-gray-700 text-base leading-relaxed">
        {/* If storyText is available, show it. Otherwise, show a placeholder. */}
        <p>{storyText || "Your generated story will appear here..."}</p>
      </div>
    </div>
  );
}

export default OutputBox;