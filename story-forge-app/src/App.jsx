import Header from './Header.jsx';
import PromptInput from './PromptInput.jsx'; 
import DropdownMenu from './DropdownMenu.jsx';
import Footer from './Footer.jsx';
import OutputBox from './OutPutBox.jsx';
import CharacterInput from './CharacterInput.jsx';
import Sidebar from './Sidebar.jsx';
import SceneBuilder from './SceneBuilder.jsx';
import React, { useState } from 'react';

// --- Main App Component ---
function App() {
  const [story, setStory] = useState("Your generated story will appear here...");
  
  const initialStory = "Your generated story will appear here...";

  const handleNewChat = () => {
    setStory(initialStory);
  };

  return (
    <div className="bg-gradient-to-br from-[#1d4ed8] via-[#1e3a8a] to-[#0c4a6e] min-h-screen text-white font-sans flex antialiased">
      <Sidebar onNewChat={handleNewChat} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-grow flex flex-col items-center justify-between p-6 lg:p-12 space-y-8">
            <div className="w-full max-w-4xl text-center space-y-2">
                 <h2 className="text-4xl md:text-5xl font-bold">Welcome, User</h2>
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
      </div>
    </div>
  );
}

export default App;