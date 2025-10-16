import React, { useState } from 'react';

function CharacterInput() {
    const [character, setCharacter] = useState({ name: '', age: '', role: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-full max-w-xs p-4 bg-gray-800 border border-gray-600 rounded-lg">
            <h3 className="text-sm font-medium text-gray-200 mb-3">Character Details</h3>
            <div className="space-y-3">
                <input
                    type="text"
                    name="name"
                    value={character.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="age"
                    value={character.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="role"
                    value={character.role}
                    onChange={handleChange}
                    placeholder="Role (e.g., protagonist)"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
        </div>
    );
}

export default CharacterInput;