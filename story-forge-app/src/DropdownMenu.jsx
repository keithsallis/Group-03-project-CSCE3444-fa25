import React, { useState } from 'react';

function DropdownMenu() {
  // 'useState' to manage which option is currently selected
  const [selectedOption, setSelectedOption] = useState('fantasy'); // Default value

  // This function updates the state when the user selects a new option
  const handleSelectionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-full max-w-xs">
      <label htmlFor="genre-select" className="block text-sm font-medium text-gray-200 mb-2">
        Select a Genre
      </label>
      <select
        id="genre-select"
        value={selectedOption}
        onChange={handleSelectionChange}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="fantasy">Fantasy</option>
        <option value="sci-fi">Science Fiction</option>
        <option value="mystery">Mystery</option>
        <option value="horror">Horror</option>
      </select>
    </div>
  );
}

export default DropdownMenu;