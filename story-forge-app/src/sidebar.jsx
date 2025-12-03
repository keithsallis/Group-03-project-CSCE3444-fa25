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

function StoryItem({ story, isActive, onLoad, onDelete }) {
  return (
    <div className="flex items-center gap-1 rounded-lg hover:bg-blue-700/30 transition-colors group">
      <button
        onClick={() => onLoad(story)}
        className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left truncate ${
          isActive ? 'bg-blue-700 text-white shadow-md' : 'text-blue-100'
        }`}
      >
        <span className="text-xl flex-shrink-0">📜</span>
        <span className="font-medium truncate">{story.title}</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(story);
        }}
        className="px-2 py-3 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        title="Delete story"
      >
        ✕
      </button>
    </div>
  );
}

// 1. We use 'onNewChat' for both Home and New Story
function Sidebar({
  onNewChat,
  onOpenSettings,
  savedStories = [],
  onLoadStory,
  currentStoryId,
  onDeleteStory,
  isOpen = true,
  onToggle,
}) {
  const containerBase =
    "h-full bg-[#1A3636] p-4 flex flex-col shadow-lg flex-shrink-0 transform transition-transform duration-300";
  const containerLayout =
    "fixed inset-y-0 left-0 z-40 w-64 md:static md:w-64 md:translate-x-0";
  const visibility =
    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0";

  const handleToggle = () => {
    if (onToggle) onToggle();
  };

  return (
    <>
      {/* Sidebar itself */}
      <aside className={`${containerBase} ${containerLayout} ${visibility}`}>
        {/* Title + retract button */}
        <div className="mb-8 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-center text-white">
            Story Forge
          </h1>
          {/* Retract button – visible on mobile, optional on desktop if you remove md:hidden */}
          <button
            type="button"
            onClick={handleToggle}
            className="md:hidden text-gray-300 hover:text-white rounded-full p-1"
            aria-label="Close sidebar"
          >
            ←
          </button>
        </div>

        <nav className="flex flex-col gap-2 h-full overflow-hidden">
          <SidebarLink
            text="New Story"
            icon="✨"
            onClick={onNewChat}
            isActive={!currentStoryId}
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
                  <StoryItem
                    key={story.id}
                    story={story}
                    isActive={currentStoryId === story.id}
                    onLoad={onLoadStory}
                    onDelete={onDeleteStory}
                    currentStoryId={currentStoryId}
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

      {/* Dark backdrop when sidebar is open on mobile */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={handleToggle}
        />
      )}
    </>
  );
}

export default Sidebar;