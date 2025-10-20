// src/Sidebar.jsx
import React from 'react';

/**
 * A reusable link component for the sidebar.
 * We pass 'children' to allow for icons.
 */
function SidebarLink({ text, children }) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
    >
      {/* Slot for an icon */}
      {children}
      <span className="font-medium">{text}</span>
    </a>
  );
}

function Sidebar() {
  return (
    // Sidebar container
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg">
      
      {/* Logo/Title Section */}
      <div className="mb-8 p-4">
        {/* You can re-use your Header component or just put the title here */}
        <h2 className="text-2xl font-bold text-center">Story Forge</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        <SidebarLink text="Home">
          {/* Placeholder for icon. You can use a library like 'react-icons' */}
          <span className="w-5 h-5 text-center">🏠</span> 
        </SidebarLink>
        <SidebarLink text="My Library">
          <span className="w-5 h-5 text-center">📚</span>
        </SidebarLink>
        <SidebarLink text="New Story">
          <span className="w-5 h-5 text-center">✨</span>
        </SidebarLink>
      </nav>

      {/* Spacer to push settings to the bottom */}
      <div className="flex-grow"></div>

      {/* Settings Link at bottom */}
      <div className="border-t border-gray-700 pt-4">
        <SidebarLink text="Settings">
          <span className="w-5 h-5 text-center">⚙️</span>
        </SidebarLink>
      </div>
    </aside>
  );
}

export default Sidebar;