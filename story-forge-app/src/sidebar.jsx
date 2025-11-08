// src/Sidebar.jsx
import React from 'react';

/**
 * A reusable link/button component for the sidebar.
 */
function SidebarLink({ text, icon, onClick }) {
  // Common classes for styling
  const classes = "flex w-full items-center gap-3 px-4 py-3 text-blue-100 rounded-lg hover:bg-blue-700/50 transition-colors";

  // Render as a <button> if onClick is provided, otherwise as an <a>
  return onClick ? (
    <button onClick={onClick} className={classes}>
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{text}</span>
    </button>
  ) : (
    <a href="#" className={classes}>
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{text}</span>
    </a>
  );
}

// function for new chat componenet in sidebar
function Sidebar({ onNewChat }) {
  return (
    // This styling will overlay the gradient from App.jsx
    //<aside className="w-64 h-screen bg-black/20 backdrop-blur-md p-4 flex flex-col shadow-lg flex-shrink-0">
    <aside className="w-64 h-screen bg-[#1A3636] p-4 flex flex-col shadow-lg flex-shrink-0">

      
      {/* Logo/Title Section */}
      <div className="mb-8 p-4">
        <h1 className="text-2xl font-bold text-center text-white">
          Story Forge
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {/* This button is wired to the handleNewChat function in App.jsx */}
        <SidebarLink text="New Story" icon="✨" onClick={onNewChat} />
        <SidebarLink text="Home" icon="🏠" />
        <SidebarLink text="My Library" icon="📚" />
      </nav>

      {/* Spacer to push settings to the bottom */}
      <div className="flex-grow"></div>

      {/* Settings Link at bottom */}
      <div className="border-t border-white/20 pt-4">
        <SidebarLink text="Settings" icon="⚙️" />
      </div>
    </aside>
  );
}

export default Sidebar;