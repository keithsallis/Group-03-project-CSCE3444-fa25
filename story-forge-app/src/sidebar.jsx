// src/Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SidebarLink({ text, icon, onClick, isActive, theme }) {
  const isLight = theme === 'light';
  
  const hoverClass = isLight ? "hover:bg-gray-100 text-gray-700" : "hover:bg-blue-700/50 text-blue-100";
  const activeClass = isLight ? "bg-gray-200 text-black shadow-sm" : "bg-blue-700 text-white shadow-md";
  
  const baseClasses = "flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left truncate";
  const finalClasses = isActive ? activeClass : hoverClass;
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${finalClasses}`}>
      <span className="text-xl flex-shrink-0">{icon}</span>
      <span className="font-medium truncate">{text}</span>
    </button>
  );
}

function StoryItem({ story, isActive, onLoadStory, onShare, onDelete, theme }) {
  const [showMenu, setShowMenu] = useState(false);
  const isLight = theme === 'light';
  
  const hoverClass = isLight ? "hover:bg-gray-100 text-gray-700" : "hover:bg-blue-700/50 text-blue-100";
  const activeClass = isLight ? "bg-gray-200 text-black shadow-sm" : "bg-blue-700 text-white shadow-md";
  
  const baseClasses = "flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left";
  const finalClasses = isActive ? activeClass : hoverClass;

  return (
    <div className="relative group">
      <div className={`${baseClasses} ${finalClasses}`}>
        <button 
          onClick={() => onLoadStory(story)}
          className="flex items-center gap-3 flex-1 min-w-0"
        >
          <span className="text-xl flex-shrink-0">📜</span>
          <span className="font-medium truncate">{story.title}</span>
        </button>
        
        {/* Three dots menu button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className={`flex-shrink-0 p-1 rounded hover:bg-black/10 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}
        >
          ⋮
        </button>
      </div>

      {/* Dropdown menu */}
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowMenu(false)}
          />
          <div className={`absolute right-2 top-12 z-20 ${isLight ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg py-1 min-w-[120px] border ${isLight ? 'border-gray-200' : 'border-gray-700'}`}>
            <button
              onClick={() => {
                setShowMenu(false);
                onShare(story);
              }}
              className={`w-full text-left px-4 py-2 text-sm ${isLight ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-gray-700 text-gray-200'} flex items-center gap-2`}
            >
              <span>🔗</span> Share
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onDelete(story);
              }}
              className={`w-full text-left px-4 py-2 text-sm ${isLight ? 'hover:bg-red-50 text-red-600' : 'hover:bg-red-900/30 text-red-400'} flex items-center gap-2`}
            >
              <span>🗑️</span> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Sidebar({ onNewChat, onOpenSettings, onOpenImport, savedStories = [], onLoadStory, onShareStory, onDeleteStory, currentStoryId, theme, colors }) {
  const isLight = theme === 'light';
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <aside 
        className={`w-64 h-full p-4 flex flex-col shadow-lg flex-shrink-0 transition-colors duration-300`}
        // Use the exact color from the theme config
        style={{ backgroundColor: colors.sidebarBg }}
    >
      
      <div className="mb-8 p-4">
        <h1 className={`text-2xl font-bold text-center ${colors.textColor}`}>
          Story Forge
        </h1>
      </div>

      <nav className="flex flex-col gap-2 h-full overflow-hidden">
        <SidebarLink text="New Story" icon="✨" onClick={onNewChat} isActive={!currentStoryId} theme={theme} />
        <SidebarLink text="Home" icon="🏠" onClick={handleHomeClick} theme={theme} />
        
        <div className={`border-t my-2 ${isLight ? 'border-gray-300' : 'border-white/20'}`}></div>
        
        <div className="flex flex-col flex-grow overflow-y-auto min-h-0">
          <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            My Library
          </div>
          
          {savedStories.length === 0 ? (
            <div className={`px-4 py-2 text-sm italic ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
              No stories forged yet...
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {savedStories.map((story) => (
                <StoryItem
                  key={story.id}
                  story={story}
                  isActive={currentStoryId === story.id}
                  onLoadStory={onLoadStory}
                  onShare={onShareStory}
                  onDelete={onDeleteStory}
                  theme={theme}
                />
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className={`border-t pt-4 mt-auto ${isLight ? 'border-gray-300' : 'border-white/20'}`}>
        <SidebarLink text="Import Story" icon="📥" onClick={onOpenImport} theme={theme} />
        <SidebarLink text="Settings" icon="⚙️" onClick={onOpenSettings} theme={theme} />
      </div>
    </aside>
  );
}

export default Sidebar;