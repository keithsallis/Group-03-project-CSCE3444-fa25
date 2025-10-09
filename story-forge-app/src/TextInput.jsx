import React, { useState } from 'react';

function TextInput() {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="w-full max-w-lg">
      <label htmlFor="story-input" className="block text-sm font-medium text-gray-200 mb-2">
        Your Text Entry
      </label>
      <textarea
        id="story-input"
        value={text}
        onChange={handleTextChange}
        placeholder="Start typing here..."
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        rows="4"
      />
    </div>
  );
}

export default TextInput;