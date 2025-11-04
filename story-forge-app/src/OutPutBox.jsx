import React from 'react';

// OutputBox component to display the generated story
function OutputBox({ storyText }) {
  return (
    //  FIX: Changed h-full to a fixed height like h-96 (24rem / 384px)
    <div className="w-full h-96 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg flex justify-center overflow-hidden">
      
      {/* FIX: Added max-h-[100%] to limit the height of this div to the height of its parent.
          overflow-y-auto will add a scrollbar *only* when the <p> tag is taller than that.*/}
  
      <div className="text-blue-100 text-lg leading-relaxed text-left w-full max-h-[100%] overflow-y-auto">
        
        {/* This is also correct. 'whitespace-pre-wrap' ensures your paragraphs are respected. */}
        <p className="whitespace-pre-wrap">{storyText}</p>
      </div>
    </div>
  );
}

export default OutputBox;