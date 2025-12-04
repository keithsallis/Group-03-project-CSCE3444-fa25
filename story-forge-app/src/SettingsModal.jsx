// src/SettingsModal.jsx
import React from 'react';

function SettingsModal({ 
  onClose, 
  theme, 
  onThemeChange,
  fontSize,
  onFontSizeChange,
  onDeleteAll
}) {
  const isLight = theme === 'light';
  const textColor = isLight ? 'text-gray-900' : 'text-white';
  const cardBg = isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10';
  const borderColor = isLight ? 'border-gray-200' : 'border-white/10';

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-lg p-6 rounded-xl shadow-2xl border ${isLight ? 'bg-white' : 'bg-gray-900 border-white/10'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${textColor}`}>Settings</h2>
            <button onClick={onClose} className={`text-2xl ${textColor} opacity-70 hover:opacity-100`}>&times;</button>
        </div>
        
        <div className="space-y-6">
          
          {/* 1. Theme Selector */}
          <div className="flex justify-between items-center">
            <label className={`font-medium ${textColor}`}>Theme Mode</label>
            <select 
                value={theme}
                onChange={(e) => onThemeChange(e.target.value)}
                className={`p-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isLight ? 'bg-white border-gray-300' : 'bg-gray-800 text-white border-gray-600'}`}
            >
              <option value="default">Default (Teal)</option>
              <option value="dark">Dark Mode</option>
              <option value="light">Light Mode</option>
            </select>
          </div>

          <hr className={borderColor} />

          {/* 2. Reading Preferences (Font Size) */}
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                 <label className={`font-medium ${textColor}`}>Reading Font Size</label>
             </div>
             <div className={`flex p-1 rounded-lg border ${borderColor} ${cardBg}`}>
                {['small', 'medium', 'large'].map((size) => (
                    <button
                        key={size}
                        onClick={() => onFontSizeChange(size)}
                        className={`flex-1 py-2 text-sm rounded-md transition-all ${
                            fontSize === size 
                            ? 'bg-blue-600 text-white shadow' 
                            : `${textColor} hover:bg-black/5`
                        }`}
                    >
                        {size === 'small' ? 'A' : size === 'medium' ? 'A+' : 'A++'}
                    </button>
                ))}
             </div>
          </div>

          <hr className={borderColor} />

          {/* 3. Data Management (Danger Zone) */}
          <div className="pt-2">
            <h3 className={`text-sm font-bold uppercase mb-3 text-gray-500`}>Data Management</h3>
            <div className={`p-4 rounded-lg border border-red-500/30 ${isLight ? 'bg-red-50' : 'bg-red-900/10'}`}>
                <div className="flex justify-between items-center">
                    <div>
                        <p className={`font-medium ${isLight ? 'text-red-800' : 'text-red-200'}`}>Clear Library</p>
                        <p className={`text-xs ${isLight ? 'text-red-600' : 'text-red-300/70'}`}>Permanently delete all saved stories.</p>
                    </div>
                    <button 
                        onClick={onDeleteAll}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                        Delete All
                    </button>
                </div>
            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className={`text-right mt-8 border-t pt-4 ${borderColor}`}>
          <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;