// src/App.jsx (Updated)
import Header from './Header.jsx';
import PromptInput from './PromptInput.jsx'; 
import DropdownMenu from './DropdownMenu.jsx';
import Footer from './Footer.jsx';
import OutputBox from './OutPutBox.jsx';
import CharacterInput from './CharacterInput.jsx';
import Sidebar from './sidebar.jsx';
import SceneBuilder from './SceneBuilder.jsx';

// 1. Update React import and add 'useEffect'
import React, { useState, useEffect } from 'react';

// 2. NEW IMPORTS for Firebase Auth
import { auth } from './firebase.js'; //
import { onAuthStateChanged } from 'firebase/auth';

// --- Main App Component ---
function App() {
  const [story, setStory] = useState("Your generated story will appear here...");
  
  // 3. NEW STATE to hold the logged-in user
  const [user, setUser] = useState(null);

  const initialStory = "Your generated story will appear here...";

  // 4. NEW EFFECT to listen for auth changes
  useEffect(() => {
    // This listener runs when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Will be 'null' if logged out, user object if logged in
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []); // Empty array ensures this runs only once

  const handleNewChat = () => {
    setStory(initialStory);
  };

  return (
    <div className="bg-gradient-to-br from-[#1d4ed8] via-[#1e3a8a] to-[#0c4a6e] min-h-screen text-white font-sans flex antialiased">
      <Sidebar onNewChat={handleNewChat} />
      
      <div className="flex-1 flex flex-col">
        
        {/* 5. UPDATED: Pass the 'user' state to the Header */}
        <Header user={user} />
        
        <main className="flex-grow flex flex-col items-center justify-between p-6 lg:p-12 space-y-8">
            <div className="w-full max-w-4xl text-center space-y-2">
                 {/* 6. UPDATED: Make the welcome message dynamic */}
                 <h2 className="text-4xl md:text-5xl font-bold">
                   Welcome, {user ? user.displayName.split(' ')[0] : 'User'}
                 </h2>
                 <p className="text-lg text-blue-200">What masterpiece will you forge today?</p>
            </div>
            
            <div className="w-full max-w-4xl flex-grow min-h-[300px]">
                 <OutputBox storyText={story} />
            </div>

            <div className="w-full max-w-4xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CharacterInput />
                  <DropdownMenu />
                  <SceneBuilder />
              </div>
              <PromptInput />
            </div>
        </main>
        
        {/* Footer is not in your App.jsx, but if you add it, it's fine */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;