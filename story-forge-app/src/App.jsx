// src/App.jsx (Updated to call the backend)

import Header from './Header.jsx';
import PromptInput from './PromptInput.jsx';
import GenreSelect from './GenreSelect.jsx';
import Footer from './Footer.jsx';
import OutputBox from './OutPutBox.jsx';
import CharacterInput from './CharacterInput.jsx';
import Sidebar from './sidebar.jsx';
import SceneBuilder from './SceneBuilder.jsx';

import React, { useState, useEffect } from 'react';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

// --- Main App Component ---
function App() {
  const [story, setStory] = useState("Your generated story will appear here...");
  const [user, setUser] = useState(null);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  
  // NEW: Add a loading state to give user feedback
  const [isLoading, setIsLoading] = useState(false);

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

  // --- MODIFIED: This function now calls the FastAPI backend ---
  const handleStoryForge = async () => {
    if (isLoading) return; // Prevent multiple requests

    setIsLoading(true);
    // Give immediate feedback in the output box
    setStory(isStoryStarted ? story + "\n\n..." : "Forging your story... ⚔️");

    // If the story has started, use the current story as context. Otherwise, start fresh.
    const previousStoryPayload = isStoryStarted ? story : "";

    // Construct the payload for the API.
    // Note: The backend expects 'environment', so we map 'setting' to it.
    const payload = {
        characters: storyInputs.characters,
        genre: storyInputs.genre,
        environment: storyInputs.setting,
        prompt: storyInputs.prompt,
        previous_story: previousStoryPayload
    };

    try {
        const response = await fetch('http://localhost:8000/generate_story', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "An unknown error occurred.");
        }

        const data = await response.json();
        
        // If this is the first generation, replace the text.
        // Otherwise, append the new part to the existing story.
        if (isStoryStarted) {
            setStory(prev => prev.slice(0, -4) + "\n\n" + data.story); // Replaces the "..."
        } else {
            setStory(data.story);
        }

        setIsStoryStarted(true); // Mark the story as started
        setStoryInputs(prev => ({ ...prev, prompt: '' })); // Clear the prompt

    } catch (error) {
        console.error("Error forging story:", error);
        setStory(`⚠️ Error: ${error.message}. Is your Python backend server running?`);
    } finally {
        setIsLoading(false); // Re-enable the forge button
    }
  };

  const handleNewChat = () => {
    setStory("Your generated story will appear here...");
    setStoryInputs({
        characters: [],
        genre: '',
        setting: '',
        prompt: ''
    });
    setIsStoryStarted(false);
  };

  return (
    <div className="bg-blue-600 min-h-screen text-white font-sans flex antialiased"> 
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CharacterInput onAddCharacter={handleAddCharacter} />
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
                // Pass the loading state to disable the button during generation
                isLoading={isLoading} 
              />
            </div>
        </main>
      </div>
    </div>
  );
}

export default App;