// src/Header.jsx (Updated)
import LoginButton from './LoginButton.jsx';
import SettingsDropdown from './SettingsDropdown.jsx';

// 1. Accept the 'user' prop from App.jsx
function Header({ user }) {
    return (
        // Original layout from your file
        <header className="p-6 flex justify-end items-center">
            
            {/* 2. Conditionally render:
                 - SettingsDropdown if 'user' object exists (logged in)
                 - LoginButton if 'user' is null (logged out)
            */}
            {user ? (
                <SettingsDropdown user={user} />
            ) : (
                <LoginButton />
            )}
        </header>
    );
}

export default Header;