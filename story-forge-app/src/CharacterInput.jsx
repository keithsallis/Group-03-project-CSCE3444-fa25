import React, { useState } from 'react';

function CharacterInput({ onAddCharacter }) {
    // state to manage expansion of the card
    const [isExpanded, setIsExpanded] = useState(false);
    // initial state for character details
    const initialCharacterState = { name: '', personality: '', gender: '' };
    // state to manage character details input
    const [character, setCharacter] = useState(initialCharacterState);

    // handles input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter(prev => ({ ...prev, [name]: value }));
    };
    
    // handles confirm button click
    const handleConfirm = (e) => {
        e.stopPropagation();
        if (character.name) { // Only add if there's at least a name
            onAddCharacter(character);
            setCharacter(initialCharacterState); // Reset form
        }
        // collapse the card after adding
        setIsExpanded(false);
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        setIsExpanded(false);
    };

    const cardClasses = `w-full p-4 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm cursor-pointer transform transition-all duration-500 ease-in-out ${isExpanded ? 'h-64' : 'h-16 hover:bg-white/20'}`; // if expanded taller height, if not shorter height

    // rendering character input card
    return (
        <div className={cardClasses} onClick={() => !isExpanded && setIsExpanded(true)}>
            <div className="flex flex-col h-full">
                <div className={`flex items-center justify-center h-full transition-opacity duration-300 ${isExpanded ? 'opacity-0 -z-10 absolute' : 'opacity-100'}`}>
                    <h3 className="font-medium text-blue-200 text-center">Add Character</h3>
                </div>
                <div className={`flex flex-col space-y-3 transition-opacity duration-500 delay-200 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-white">Character Details</h3>
                        <div className="flex items-center space-x-2">
                            <button 
                                aria-label = "confirm character input"    // 🆕 adds a readable name for screen readers
                                onClick={handleConfirm} 
                                className="text-green-400 hover:text-green-300 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </button>
                            <button 
                                aria-label = "close character input"    // 🆕 adds a readable name for screen readers
                                onClick={handleCancel} 
                                className="text-gray-300 hover:text-white text-2xl transition-colors">&times;
                            </button>
                        </div>
                    </div>
                    <input 
                        aria-label="Character name input"    // 🆕 adds a readable name for screen readers
                        type="text" 
                        name="name" 
                        value={character.name} 
                        onChange={handleChange} 
                        placeholder="Name" 
                        className="pointer-events-auto w-full p-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" 
                        onClick={(e) => e.stopPropagation()} />
                    <input 
                        aria-label="Character personality input"    // 🆕 adds a readable name for screen readers
                        type="text" 
                        name="personality" 
                        value={character.personality} 
                        onChange={handleChange} 
                        placeholder="Personality" 
                        className="pointer-events-auto w-full p-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" 
                        onClick={(e) => e.stopPropagation()} />
                    <input 
                        aria-label="Character gender input"    // 🆕 adds a readable name for screen readers
                        type="text" 
                        name="gender" 
                        value={character.gender} 
                        onChange={handleChange} 
                        placeholder="Gender" 
                        className="pointer-events-auto w-full p-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400" 
                        onClick={(e) => e.stopPropagation()} />
                </div>
            </div>
        </div>
    );
}
export default CharacterInput;