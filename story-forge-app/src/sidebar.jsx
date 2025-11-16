// src/Sidebar.jsx
import React from 'react';

function SidebarLink({ text, icon, onClick, isActive }) {
  const baseClasses = "flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left truncate";
  const activeClasses = isActive ? "bg-blue-700 text-white shadow-md" : "text-blue-100 hover:bg-blue-700/50";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      <span className="text-xl flex-shrink-0">{icon}</span>
      <span className="font-medium truncate">{text}</span>
    </button>
  );
}

// 1. We use 'onNewChat' for both Home and New Story
function Sidebar({ onNewChat, onOpenSettings, savedStories = [], onLoadStory, currentStoryId }) {
  return (
    <aside className="w-64 h-screen bg-[#1A3636] p-4 flex flex-col shadow-lg flex-shrink-0">
      
      <div className="mb-8 p-4">
        <h1 className="text-2xl font-bold text-center text-white">
          Story Forge
        </h1>
      </div>

      <nav className="flex flex-col gap-2 h-full overflow-hidden">
        {/* 2. Both buttons now trigger onNewChat */}
        <SidebarLink 
            text="New Story" 
            icon="✨" 
            onClick={onNewChat} 
            isActive={!currentStoryId} // Highlight if we are NOT viewing a saved story
        />
        <SidebarLink 
            text="Home" 
            icon="🏠" 
            onClick={onNewChat} 
        />
        
        <div className="border-t border-white/10 my-2"></div>
        
        <div className="flex flex-col flex-grow overflow-y-auto min-h-0">
          <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            My Library
          </div>
          
          {savedStories.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500 italic">
              No stories forged yet...
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {savedStories.map((story) => (
                <SidebarLink 
                  key={story.id}
                  text={story.title} 
                  icon="📜" 
                  isActive={currentStoryId === story.id}
                  onClick={() => onLoadStory(story)}
                />
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="border-t border-white/20 pt-4 mt-auto">
        <SidebarLink text="Settings" icon="⚙️" onClick={onOpenSettings} />
      </div>
    </aside>
  );
}

export default Sidebar;