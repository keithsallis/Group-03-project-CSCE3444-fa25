import React from 'react';

// --- Reusable Icon Components ---
const Icon = ({ path }) => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

// SidebarButton Component
const SidebarButton = ({ icon, text, onClick, className = '' }) => (
  <button 
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-colors duration-200 ${className}`}
  >
    {icon}
    <span className="ml-3">{text}</span>
  </button>
);

// Sidebar Component
function Sidebar({ onNewChat }) {
  return (
    <aside className="w-64 bg-black/20 p-4 flex-col justify-between hidden md:flex">
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-start mb-10 pl-2">
          <div className="w-8 h-8 bg-blue-500 rounded-md mr-3 flex-shrink-0"></div>
          <h2 className="text-xl font-bold text-white">StoryForge</h2>
        </div>
        
        <nav className="space-y-2">
          <SidebarButton 
            onClick={onNewChat}
            icon={<Icon path={<><path d="M12 5v14" /><path d="M5 12h14" /></>} />}
            text="New Chat" 
            className="bg-white/10 text-white"
          />
          <SidebarButton 
            icon={<Icon path={<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>} />}
            text="Shared Stories" 
          />
          <SidebarButton 
            icon={<Icon path={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></>} />}
            text="My Stories" 
          />
        </nav>
      </div>
      
      {/* Bottom Section */}
      <div className="space-y-2">
        <SidebarButton 
          icon={<Icon path={<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>} />}
          text="Settings" 
        />
        <SidebarButton 
          icon={<Icon path={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>} />}
          text="Log Out" 
        />
      </div>
    </aside>
  );
}

export default Sidebar;