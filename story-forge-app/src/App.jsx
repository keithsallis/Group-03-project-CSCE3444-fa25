// src/App.jsx

import Header from './Header.jsx';
import PromptInput from './PromptInput.jsx';
import GenreSelect from './GenreSelect.jsx'; 
import OutputBox from './OutPutBox.jsx';
import CharacterInput from './CharacterInput.jsx';
import Sidebar from './sidebar.jsx'; 
import SceneBuilder from './SceneBuilder.jsx';   
import SettingsModal from './SettingsModal.jsx';

import React, { useState, useEffect } from 'react';
import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { saveStory, loadUserStories, updateStory, deleteStory } from './firebaseDb.js';

// imports for genre backgrounds
import fantasyBg from './assets/GenreThemes/Fantasy.png';
import scifiBg from './assets/GenreThemes/Scifi.jpg';
import mysteryBg from './assets/GenreThemes/mystery.jpg';
import adventureBg from './assets/GenreThemes/Adventure.png';

// Define API Base URL
const API_BASE = import.meta.env.VITE_API_URL ?? "https://group-03-project-csce3444-fa25.onrender.com";

// --- Main App Component ---
function App() {
  const [story, setStory] = useState("Your generated story will appear here...");
  const [user, setUser] = useState(null);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State to manage story input fields
  const [storyInputs, setStoryInputs] = useState({
    characters: [],
    genre: '',
    setting: '',
    style: 'Default', // <--- NEW: Added style state
    prompt: ''
  });

  // --- STATES for Sidebar/Library ---
  const [savedStories, setSavedStories] = useState([]);
  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // Load stories when user logs in
      if (currentUser) {
        try {
          const stories = await loadUserStories(currentUser.uid);
          setSavedStories(stories);
        } catch (error) {
          console.error("Failed to load stories:", error);
        }
      } else {
        // Clear stories when user logs out
        setSavedStories([]);
        setCurrentStoryId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handlers for inputs
  const handleAddCharacter = (newCharacter) => {
    setStoryInputs(prev => ({ ...prev, characters: [...prev.characters, newCharacter] }));
  };

  const handleRemoveCharacter = (indexToRemove) => {
    setStoryInputs(prev => ({ ...prev, characters: prev.characters.filter((_, index) => index !== indexToRemove) }));
  };
  
  const handleGenreChange = (newGenre) => setStoryInputs(prev => ({ ...prev, genre: newGenre }));
  const handleSettingChange = (e) => setStoryInputs(prev => ({ ...prev, setting: e.target.value }));
  const handlePromptChange = (e) => setStoryInputs(prev => ({ ...prev, prompt: e.target.value }));

  // Genre background images mapping
  const generBackgrounds = {
    Fantasy: fantasyBg,
    'Science Fiction': scifiBg,
    Mystery: mysteryBg,
    Adventure: adventureBg
  };

  // NEW: Handler for style change
  const handleStyleChange = (newStyle) => setStoryInputs(prev => ({ ...prev, style: newStyle }));

  // --- Story Generation Logic ---
  const handleStoryForge = async () => {
    if (isLoading) return; 

    setIsLoading(true);
    setStory(isStoryStarted ? story + "\n\n..." : "Forging your story... ✨");

    const previousStoryPayload = isStoryStarted ? story : "";

    const payload = {
        characters: storyInputs.characters,
        genre: storyInputs.genre,
        environment: storyInputs.setting,
        style: storyInputs.style, // <--- NEW: Include style in payload
        prompt: storyInputs.prompt,
        previous_story: previousStoryPayload
    };

    try {
        const response = await fetch(`${API_BASE}/generate_story`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();
        
        const newStoryText = isStoryStarted 
            ? story.replace(/\.\.\.$/, "") + "\n\n" + data.story 
            : data.story;

        setStory(newStoryText);
        setIsStoryStarted(true);

        // --- SAVE TO LIBRARY LOGIC ---
        if (!currentStoryId) {
            const newStoryEntry = {
              id: Date.now(), // Local ID for quick reference
              title: storyInputs.prompt.substring(0, 30) + (storyInputs.prompt.length > 30 ? "..." : ""),
              content: newStoryText,
              inputs: { ...storyInputs },
              createdAt: new Date()
            };
            
            // Save to Firestore if user is authenticated
            if (user) {
              try {
                const firestoreId = await saveStory(user.uid, newStoryEntry);
                newStoryEntry.firestoreId = firestoreId;
              } catch (error) {
                console.error("Failed to persist story to Firestore:", error);
              }
            }
            
            setSavedStories(prev => [newStoryEntry, ...prev]); 
            setCurrentStoryId(newStoryEntry.id);
        } else {
            const updatedContent = newStoryText;
            
            // Update in Firestore
            const storyToUpdate = savedStories.find(s => s.id === currentStoryId);
            if (user && storyToUpdate?.firestoreId) {
              try {
                await updateStory(user.uid, storyToUpdate.firestoreId, { content: updatedContent });
              } catch (error) {
                console.error("Failed to update story in Firestore:", error);
              }
            }
            
            setSavedStories(prev => prev.map(s => 
              s.id === currentStoryId 
                ? { ...s, content: updatedContent } 
                : s
            ));
        }

        setStoryInputs(prev => ({ ...prev, prompt: '' })); 

    } catch (error) {
        console.error("Error forging story:", error);
        setStory(`⚠️ Error: ${error.message}. Is your Python backend server running?`);
    } finally {
        setIsLoading(false); 
    }
  };

  // --- Load Saved Story ---
  const handleLoadStory = (savedStory) => {
    setStory(savedStory.content);
    // Ensure legacy stories load with a default style if they don't have one
    setStoryInputs({
        ...savedStory.inputs,
        style: savedStory.inputs.style || 'Default'
    }); 
    setCurrentStoryId(savedStory.id);
    setIsStoryStarted(true);
  };

  // --- Delete Saved Story ---
  const handleDeleteStory = async (storyToDelete) => {
    if (!window.confirm(`Delete "${storyToDelete.title}"?`)) return;
    
    // Delete from Firestore if it has a firestoreId
    if (user && storyToDelete.firestoreId) {
      try {
        await deleteStory(user.uid, storyToDelete.firestoreId);
      } catch (error) {
        console.error("Failed to delete story from Firestore:", error);
        alert("Failed to delete story. Please try again.");
        return;
      }
    }
    
    // Remove from state
    setSavedStories(prev => prev.filter(s => s.id !== storyToDelete.id));
    
    // If we're viewing the deleted story, reset
    if (currentStoryId === storyToDelete.id) {
      handleNewChat();
    }
  };

  // --- New Chat / Reset ---
  const handleNewChat = () => {
    setStory("Your generated story will appear here...");
    setStoryInputs({
        characters: [],
        genre: '',
        setting: '',
        style: 'Default', // Reset style to default
        prompt: ''
    });
    setIsStoryStarted(false);
    setCurrentStoryId(null); 
  };

  // --- Settings Modal Handlers ---
  const handleOpenSettings = () => setIsSettingsModalOpen(true);
  const handleCloseSettings = () => setIsSettingsModalOpen(false);

  return (
    // --- UPDATED: Using the specific #40534C background and overflow settings ---
    // ADD: new themes dependent on genre selected
   <div
      className="relative h-screen text-white font-sans flex antialiased overflow-hidden"
      style={{ backgroundColor: "#40534C" }}>

    {/* BACKGROUND IMAGE WITH FADE */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out"
      style={{
      backgroundImage: storyInputs.genre
        ? `url(${generBackgrounds[storyInputs.genre]})`
        : "none",
      opacity: storyInputs.genre ? 1 : 0,
      }}/>

  {/* BLUR + DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />

  {/* APP CONTENT */}
  <div className="relative flex w-full h-full">
    <Sidebar 
      onNewChat={handleNewChat} 
      onOpenSettings={handleOpenSettings}
      savedStories={savedStories}
      onLoadStory={handleLoadStory}
      onDeleteStory={handleDeleteStory}
      currentStoryId={currentStoryId}
    />

    <div className="flex-1 flex flex-col overflow-hidden">
      <Header user={user} />

      <main className="flex-grow flex flex-col items-center p-6 lg:p-12 space-y-8 overflow-y-auto">
        <div className="w-full max-w-4xl text-center space-y-2">
          {/* Header Content*/}
          <h2 className="text-4xl md:text-5xl font-bold">
            {(() => {
              if (!user) return "Ready to Craft?";
              const display = user.displayName || "";
              const firstName = display
                ? display.split(" ")[0]
                : user.email
                ? user.email.split("@")[0]
                : "User";
              return `Ready to Craft, ${firstName}?`;
            })()}
          </h2>
          <p className="text-lg text-blue-200">Let's shape a new narrative.</p>
        </div>

        <div className="w-full max-w-4xl flex-[1_1_45vh] min-h-[160px]">
          <OutputBox storyText={story} />
        </div>

        <div className="w-full max-w-4xl space-y-4">
          {storyInputs.characters.length > 0 && (
            <div className="p-4 bg-black/20 rounded-lg">
              <h4 className="text-sm font-bold text-white mb-2">Characters:</h4>
              <div className="flex flex-wrap gap-2">
                {storyInputs.characters.map((char, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-500/50 rounded-full px-3 py-1 text-sm"
                  >
                    <span>{char.name}</span>
                    <button
                      onClick={() => handleRemoveCharacter(index)}
                      className="ml-2 text-white hover:text-red-300 text-lg"
                    >
                      &times;
                    </button>
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
            style={storyInputs.style}
            onStyleChange={handleStyleChange}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>

    {isSettingsModalOpen && <SettingsModal onClose={handleCloseSettings} />}
  </div>
</div>

  );
}

export default App;