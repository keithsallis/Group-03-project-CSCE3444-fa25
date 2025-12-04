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
const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

// --- Main App Component ---
function App() {
  const [story, setStory] = useState("Your generated story will appear here...");
  const [user, setUser] = useState(null);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- NEW: Theme & Mobile State ---
  const [theme, setTheme] = useState('default');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- NEW: Font Size State (Data Management & Readability) ---
  const [fontSize, setFontSize] = useState('medium');

  // State to manage story input fields
  const [storyInputs, setStoryInputs] = useState({
    characters: [],
    genre: '',
    setting: '',
    style: 'Default',
    prompt: ''
  });

  // --- STATES for Sidebar/Library ---
  const [savedStories, setSavedStories] = useState([]);
  const [currentStoryId, setCurrentStoryId] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // --- THEME CONFIGURATION ---
  const themeConfig = {
    default: {
      mainBg: '#40534C',           
      sidebarBg: '#1A3636',        
      textColor: 'text-white',
      componentBg: 'bg-black/20',  
      borderColor: 'border-white/20'
    },
    dark: {
      mainBg: '#111827',           
      sidebarBg: '#1F2937',        
      textColor: 'text-gray-100',
      componentBg: 'bg-gray-800/50',
      borderColor: 'border-gray-700'
    },
    light: {
      mainBg: '#F3F4F6',           
      sidebarBg: '#FFFFFF',        
      textColor: 'text-gray-900',
      componentBg: 'bg-white border border-gray-300 shadow-sm', 
      borderColor: 'border-gray-300'
    }
  };

  const currentColors = themeConfig[theme];

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const stories = await loadUserStories(currentUser.uid);
          setSavedStories(stories);
        } catch (error) {
          console.error("Failed to load stories:", error);
        }
      } else {
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
  const handleStyleChange = (newStyle) => setStoryInputs(prev => ({ ...prev, style: newStyle }));
  
  // Theme Change Handler
  const handleThemeChange = (newTheme) => setTheme(newTheme);

  // Genre background images mapping
  const generBackgrounds = {
    Fantasy: fantasyBg,
    'Science Fiction': scifiBg,
    Mystery: mysteryBg,
    Adventure: adventureBg
  };

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
        style: storyInputs.style, 
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
              id: Date.now(), 
              title: storyInputs.prompt.substring(0, 30) + (storyInputs.prompt.length > 30 ? "..." : ""),
              content: newStoryText,
              inputs: { ...storyInputs },
              createdAt: new Date()
            };
            
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
    setStoryInputs({
        ...savedStory.inputs,
        style: savedStory.inputs.style || 'Default'
    }); 
    setCurrentStoryId(savedStory.id);
    setIsStoryStarted(true);
    setIsMobileMenuOpen(false); // Close menu on mobile
  };

  // --- Delete Single Story ---
  const handleDeleteStory = async (storyToDelete) => {
    if (!window.confirm(`Delete "${storyToDelete.title}"?`)) return;
    
    if (user && storyToDelete.firestoreId) {
      try {
        await deleteStory(user.uid, storyToDelete.firestoreId);
      } catch (error) {
        console.error("Failed to delete story from Firestore:", error);
        alert("Failed to delete story. Please try again.");
        return;
      }
    }
    setSavedStories(prev => prev.filter(s => s.id !== storyToDelete.id));
    if (currentStoryId === storyToDelete.id) {
      handleNewChat();
    }
  };

  // --- NEW: Delete All Stories (Data Management) ---
  const handleDeleteAllStories = async () => {
    if (savedStories.length === 0) return;
    if (!window.confirm("⚠️ DANGER ZONE ⚠️\n\nAre you sure you want to delete ALL your stories?\nThis action cannot be undone.")) return;

    try {
      if (user) {
        // Delete from Firestore one by one
        for (const s of savedStories) {
          if (s.firestoreId) await deleteStory(user.uid, s.firestoreId);
        }
      }
      setSavedStories([]);
      handleNewChat();
      alert("All stories cleared successfully.");
    } catch (error) {
      console.error("Failed to clear library:", error);
      alert("Failed to delete some stories. Please try again.");
    }
  };

  // --- New Chat / Reset ---
  const handleNewChat = () => {
    setStory("Your generated story will appear here...");
    setStoryInputs({
        characters: [],
        genre: '',
        setting: '',
        style: 'Default',
        prompt: ''
    });
    setIsStoryStarted(false);
    setCurrentStoryId(null); 
    setIsMobileMenuOpen(false); 
  };

  // --- Settings Modal Handlers ---
  const handleOpenSettings = () => {
      setIsSettingsModalOpen(true);
      setIsMobileMenuOpen(false);
  };
  const handleCloseSettings = () => setIsSettingsModalOpen(false);

  return (
    // Updated container to handle mobile layout
    <div 
      className={`relative h-screen font-sans flex flex-col md:flex-row antialiased overflow-hidden ${currentColors.textColor}`}
      style={{ backgroundColor: currentColors.mainBg, transition: 'background-color 0.3s ease' }}
    >

        {/* BACKGROUND IMAGE WITH FADE */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out z-0"
          style={{
            backgroundImage: storyInputs.genre
              ? `url(${generBackgrounds[storyInputs.genre]})`
              : "none",
            opacity: storyInputs.genre ? 1 : 0,
          }}
        />

        {/* BLUR + DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none z-0" />

        {/* --- MOBILE HEADER (Only visible on small screens) --- */}
        <div 
            className="md:hidden flex items-center justify-between p-4 shadow-md z-50 relative"
            style={{ backgroundColor: currentColors.sidebarBg }}
        >
            <h1 className="text-xl font-bold">Story Forge</h1>
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded hover:opacity-80 transition-opacity"
            >
                {isMobileMenuOpen ? "✕" : "☰"}
            </button>
        </div>

        {/* --- SIDEBAR CONTAINER --- */}
        <div className={`
            fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:static md:bg-transparent md:backdrop-blur-none 
            ${isMobileMenuOpen ? "block" : "hidden md:block"}
        `}>
            <div className="h-full flex flex-col relative" onClick={(e) => e.stopPropagation()}>
                <Sidebar 
                    onNewChat={handleNewChat} 
                    onOpenSettings={handleOpenSettings}
                    savedStories={savedStories}
                    onLoadStory={handleLoadStory}
                    onDeleteStory={handleDeleteStory}
                    currentStoryId={currentStoryId}
                    theme={theme}
                    colors={currentColors}
                />
                <div className="flex-grow md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
            </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
            <div className="hidden md:block">
                <Header user={user} />
            </div>

            <main className="flex-grow flex flex-col items-center p-4 lg:p-12 space-y-6 overflow-y-auto w-full">
                <div className="w-full max-w-4xl text-center space-y-2 pt-4 md:pt-0">
                    <h2 className="text-3xl md:text-5xl font-bold">
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
                    <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-blue-200'}`}>
                        Let's shape a new narrative.
                    </p>
                </div>

                <div className="w-full max-w-4xl flex-[1_1_45vh] min-h-[200px]">
                    {/* NEW: Passed fontSize prop to OutputBox */}
                    <OutputBox 
                        storyText={story} 
                        theme={theme} 
                        colors={currentColors} 
                        fontSize={fontSize} 
                    />
                </div>

                <div className="w-full max-w-4xl space-y-4 pb-20 md:pb-0">
                    {storyInputs.characters.length > 0 && (
                        <div className={`p-4 rounded-lg ${currentColors.componentBg} ${currentColors.borderColor}`}>
                            <h4 className="text-sm font-bold mb-2">Characters:</h4>
                            <div className="flex flex-wrap gap-2">
                                {storyInputs.characters.map((char, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-blue-500/80 text-white rounded-full px-3 py-1 text-sm"
                                >
                                    <span>{char.name}</span>
                                    <button
                                    onClick={() => handleRemoveCharacter(index)}
                                    className="ml-2 hover:text-red-200 text-lg"
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

        {isSettingsModalOpen && (
            <SettingsModal 
                onClose={handleCloseSettings} 
                theme={theme} 
                onThemeChange={handleThemeChange}
                // NEW: Props for Data Management & Font Size
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                onDeleteAll={handleDeleteAllStories}
            />
        )}
    </div>
  );
}

export default App;