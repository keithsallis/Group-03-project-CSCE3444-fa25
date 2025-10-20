// src/App.jsx (Updated)
import Header from './Header.jsx';
import PromptInput from './PromptInput.jsx'; 
import GenreSelect from './GenreSelect.jsx';
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
  const [user, setUser] = useState(null);
  
  // NEW STATE: To track if the story has been started
  const [isStoryStarted, setIsStoryStarted] = useState(false);

  const [storyInputs, setStoryInputs] = useState({
    characters: [],
    genre: '',
    setting: '',
    prompt: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  const handleAddCharacter = (newCharacter) => {
    setStoryInputs(prev => ({ ...prev, characters: [...prev.characters, newCharacter] }));
  };

  const handleRemoveCharacter = (indexToRemove) => {
    setStoryInputs(prev => ({ ...prev, characters: prev.characters.filter((_, index) => index !== indexToRemove) }));
  };
  
  const handleGenreChange = (newGenre) => setStoryInputs(prev => ({ ...prev, genre: newGenre }));
  const handleSettingChange = (e) => setStoryInputs(prev => ({ ...prev, setting: e.target.value }));
  const handlePromptChange = (e) => setStoryInputs(prev => ({ ...prev, prompt: e.target.value }));

  // MODIFIED: This function now handles the UI state change
  const handleStoryForge = () => {
    const jsonPayload = JSON.stringify(storyInputs, null, 2);
    console.log("--- Sending to Backend ---");
    console.log(jsonPayload);
    setStory(`Story forged with the following details:\n\n${jsonPayload}`); // placeholder for actual story output: for KAVAN
    
    // 1. Set the story as "started"
    setIsStoryStarted(true);

    // 2. Clear the prompt for the next input, but keep other context
    setStoryInputs(prev => ({
        ...prev,
        prompt: ''
    }));
  };

  

  // MODIFIED: This function now also resets the UI state
  const handleNewChat = () => {
    setStory("Your generated story will appear here...");
    setStoryInputs({
        characters: [],
        genre: '',
        setting: '',
        prompt: ''
    });
    // Reset the story state to show initial inputs again
    setIsStoryStarted(false);
  };

  return (
    // After
<div className="bg-blue-600 min-h-screen min-h-screen text-white font-sans flex antialiased"> 
      <Sidebar onNewChat={handleNewChat} />
      
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        
        <main className="flex-grow flex flex-col items-center justify-between p-6 lg:p-12 space-y-8">
            <div className="w-full max-w-4xl text-center space-y-2">
                 <h2 className="text-4xl md:text-5xl font-bold">
                   Welcome, {user ? user.displayName.split(' ')[0] : 'User'}
                 </h2>
                 <p className="text-lg text-blue-200">What masterpiece will you forge today?</p>
            </div>
            
            <div className="w-full max-w-4xl flex-grow min-h-[300px]">
                 <OutputBox storyText={story} />
            </div>

            <div className="w-full max-w-4xl space-y-4">
              {storyInputs.characters.length > 0 && (
                <div className="p-4 bg-black/20 rounded-lg">
                    <h4 className="text-sm font-bold text-white mb-2">Characters:</h4>
                    <div className="flex flex-wrap gap-2">
                        {storyInputs.characters.map((char, index) => (
                            <div key={index} className="flex items-center bg-blue-500/50 rounded-full px-3 py-1 text-sm">
                                <span>{char.name}</span>
                                <button onClick={() => handleRemoveCharacter(index)} className="ml-2 text-white hover:text-red-300 text-lg">&times;</button>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* 3. This grid now conditionally renders its children */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CharacterInput onAddCharacter={handleAddCharacter} />
                  
                  {/* These components only show if the story has NOT started */}
                  {!isStoryStarted && (
                    <>
                      <GenreSelect 
                        selectedGenre={storyInputs.genre}
                        onGenreChange={handleGenreChange}
                      />
                      <SceneBuilder 
                        setting={storyInputs.setting}
                        onSettingChange={handleSettingChange}
                      />
                    </>
                  )}
              </div>
              <PromptInput 
                prompt={storyInputs.prompt}
                onPromptChange={handlePromptChange}
                onForge={handleStoryForge}
              />
            </div>
        </main>
      </div>
    </div>
  );
}

export default App;