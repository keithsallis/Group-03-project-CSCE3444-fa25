// src/Sidebar.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";

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

function Sidebar({ onNewChat, onOpenSettings, savedStories = [], onLoadStory, currentStoryId, theme, colors }) {
  const isLight = theme === 'light';
  const navigate = useNavigate();

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
        <SidebarLink 
            text="New Story" 
            icon="✨" 
            onClick={onNewChat} 
            isActive={!currentStoryId} 
            theme={theme} />
        <SidebarLink 
            text="Home" 
            icon="🏠" 
            onClick={() => navigate('/')} 
            theme={theme} />
        
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
                <SidebarLink 
                  key={story.id}
                  text={story.title} 
                  icon="📜" 
                  isActive={currentStoryId === story.id}
                  onClick={() => onLoadStory(story)}
                  theme={theme}
                />
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className={`border-t pt-4 mt-auto ${isLight ? 'border-gray-300' : 'border-white/20'}`}>
        <SidebarLink text="Settings" icon="⚙️" onClick={onOpenSettings} theme={theme} />
      </div>
    </aside>
  );
}

export default Sidebar;