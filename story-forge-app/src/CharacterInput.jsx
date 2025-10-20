import React, { useState } from 'react';

// --- Reusable Input Field Component ---
const DetailInput = ({ name, value, onChange, placeholder }) => (
    <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 transition-colors"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside input from closing the card
    />
);

// --- Main CharacterInput Component ---
function CharacterInput() {
    // State to manage if the card is expanded or not
    const [isExpanded, setIsExpanded] = useState(false);
    
    // State to hold the character's information
    const [character, setCharacter] = useState({
        name: '',
        personality: '',
        age: '',
        gender: ''
    });

    // Handle clicks on the main card container
    const handleCardClick = () => {
        setIsExpanded(true);
    };

    // Handle input changes and update the character state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter(prev => ({ ...prev, [name]: value }));
    };
    
    // Dynamic classes for expanding/collapsing animation
    const cardClasses = `
        w-full p-4 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm 
        cursor-pointer transform transition-all duration-500 ease-in-out
        ${isExpanded ? 'h-64 scale-105' : 'h-16 hover:bg-white/20'}
    `;

    return (
        <div className={cardClasses} onClick={handleCardClick}>
            <div className="flex flex-col h-full">
                {/* --- Collapsed View --- */}
                <div className={`flex items-center justify-center h-full transition-opacity duration-300 ${isExpanded ? 'opacity-0 absolute -z-10' : 'opacity-100'}`}>
                    <h3 className="font-medium text-blue-200 text-center">Add New Character</h3>
                </div>

                {/* --- Expanded View --- */}
                <div className={`flex flex-col space-y-3 transition-opacity duration-500 delay-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex justify-between items-center">
                         <h3 className="text-sm font-bold text-white">Character Details</h3>
                         <button 
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the card click from firing again
                                setIsExpanded(false);
                            }}
                            className="text-gray-300 hover:text-white text-xl"
                         >
                           &times;
                         </button>
                    </div>
                    <DetailInput name="name" value={character.name} onChange={handleChange} placeholder="Name" />
                    <DetailInput name="personality" value={character.personality} onChange={handleChange} placeholder="Personality" />
                    <DetailInput name="age" value={character.age} onChange={handleChange} placeholder="Age" />
                    <DetailInput name="gender" value={character.gender} onChange={handleChange} placeholder="Gender" />
                </div>
            </div>
        </div>
    );
}

export default CharacterInput;