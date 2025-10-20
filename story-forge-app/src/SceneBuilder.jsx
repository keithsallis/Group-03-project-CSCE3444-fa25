import React, { useState } from 'react';

// --- SceneBuilder Component ---
function SceneBuilder() {
    // State to hold the setting description
    const [setting, setSetting] = useState('');

    // Handle input changes and update the state
    const handleChange = (e) => {
        setSetting(e.target.value);
    };

    return (
        <div className="w-full h-16">
            <input
                type="text"
                value={setting}
                onChange={handleChange}
                placeholder="Describe the setting..."
                className="w-full h-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
        </div>
    );
}

export default SceneBuilder;