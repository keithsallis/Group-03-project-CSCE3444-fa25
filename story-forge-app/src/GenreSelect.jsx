import React, { useState } from 'react';

// --- Main GenreSelect Component ---
function GenreSelect() {
    // State to manage if the card is expanded or not
    const [isExpanded, setIsExpanded] = useState(false);
    
    // State to hold the currently selected genre
    const [selectedGenre, setSelectedGenre] = useState('');

    // List of available genres
    const genres = [
        "Fantasy",
        "Science Fiction",
        "Mystery",
        "Horror",
        "Adventure"
    ];

    // Handle clicks on the main card container
    const handleCardClick = () => {
        setIsExpanded(true);
    };

    // Handle clicks on a genre button
    const handleGenreSelect = (genre, event) => {
        event.stopPropagation(); // Prevent the main card's click event
        setSelectedGenre(genre);
        setIsExpanded(false); // Collapse the card after selection
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
                    <h3 className="font-medium text-blue-200 text-center">
                        {selectedGenre || 'Genre'}
                    </h3>
                </div>

                {/* --- Expanded View --- */}
                <div className={`flex flex-col space-y-2 transition-opacity duration-500 delay-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-bold text-white">Select a Genre</h3>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                            className="text-gray-300 hover:text-white text-xl"
                        >
                           &times;
                        </button>
                    </div>
                    {genres.map(genre => (
                        <button
                            key={genre}
                            onClick={(e) => handleGenreSelect(genre, e)}
                            className="w-full text-left p-2 rounded-md text-white bg-white/10 hover:bg-white/20 transition-colors duration-200 text-sm"
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GenreSelect;