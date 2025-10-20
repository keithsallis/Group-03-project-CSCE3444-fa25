import React from 'react';

function SceneBuilder({ setting, onSettingChange }) {
    return (
        <div className="w-full h-16">
            <input type="text" value={setting} onChange={onSettingChange} placeholder="Describe the setting..." className="w-full h-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
        </div>
    );
}

export default SceneBuilder;