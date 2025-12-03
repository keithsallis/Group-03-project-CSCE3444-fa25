// src/Header.jsx (Updated)
import LoginButton from './LoginButton.jsx';
import SettingsDropdown from './SettingsDropdown.jsx';

// 1. Accept the 'user' prop from App.jsx
function Header({ user, onToggleSidebar }) {
  return (
    <header className="px-4 py-4 md:px-6 md:py-6 flex items-center justify-between md:justify-end">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md bg-white/10 border border-white/20 text-white hover:bg-white/20"
        aria-label="Toggle navigation"
      >
        {/* simple hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Right side: login/settings */}
      <div className="flex items-center gap-3">
        {user ? (
          <SettingsDropdown user={user} />
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}

export default Header;