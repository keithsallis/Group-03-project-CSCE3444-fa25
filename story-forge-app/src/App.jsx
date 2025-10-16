import Header from './Header.jsx';
import TextInput from './TextInput.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import Footer from './Footer.jsx';
import OutputBox from './OutPutBox.jsx';
import CharacterInput from './CharacterInput.jsx';
import React, { useState } from 'react';

function App() {
  const [story, _setStory] = useState("In the heart of the Whispering Woods, where ancient trees hummed forgotten lullabies, a young elf named Elara found a curious, moss-covered stone. It wasn't cold like the other stones in the forest; instead, it pulsed with a gentle warmth, a soft light glowing from within its core. She felt a strange connection to it, as if the stone was whispering secrets only she could understand...");

  return (
    <div className="bg-indigo-400 min-h-screen flex flex-col">
      
      <Header />
      
      <main className="flex-grow flex flex-col p-8">
        <div className="flex-grow flex flex-col items-center justify-center gap-8">
          <OutputBox storyText={story} />
        </div>
        
        <div className="w-full flex justify-center items-end gap-8 mt-8">
          <DropdownMenu />
          <TextInput />
          <CharacterInput />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;