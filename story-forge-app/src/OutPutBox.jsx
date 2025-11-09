import React from 'react';

// OutputBox component to display the generated story
function OutputBox({ storyText }) {
  return (
    // FIX:changed h-96 to h-gull to make height responsive to parent container
    <div className="w-full h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex justify-center overflow-hidden">

      {/* FIX: changed max-h[100%] to max-h-full to keep height consistent with parent.*/}
      <div className="text-blue-100 text-lg leading-relaxed text-left w-full max-h-full overflow-y-auto">
        
        {/* Preserve whitespace and line breaks in the story text */}
        <p className="whitespace-pre-wrap">{storyText}</p>
      </div>
    </div>
  );
}

export default OutputBox;