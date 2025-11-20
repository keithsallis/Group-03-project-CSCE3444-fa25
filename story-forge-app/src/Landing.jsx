// import React from "react";
// import { Link } from "react-router-dom";
// import LoginButton from "./LoginButton.jsx";
// import { Sparkles, User, Map, ArrowRight, Wand2 } from "lucide-react";

// export default function Landing() {
//   return (
//     <div className="min-h-screen bg-[#0F1C1C] text-white overflow-hidden selection:bg-teal-500 selection:text-white">
      
//       {/* --- Background Ambient Glows --- */}
//       <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#40534C] rounded-full mix-blend-screen filter blur-[128px] opacity-30"></div>
//       </div>

//       {/* --- Navbar --- */}
//       <nav className="w-full flex justify-between items-center p-6 max-w-7xl mx-auto">
//         <div className="flex items-center gap-2">
//           <div className="bg-gradient-to-tr from-teal-400 to-emerald-600 p-2 rounded-lg">
//             <Wand2 className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-2xl font-bold tracking-tight">StoryForge</span>
//         </div>
//         <div>
//           <LoginButton aria-label="Login" />
//         </div>
//       </nav>

//       {/* --- Hero Section --- */}
//       <main className="max-w-7xl mx-auto px-6 pt-10 pb-20 flex flex-col md:flex-row items-center gap-12">
        
//         {/* Left Content */}
//         <div className="flex-1 text-center md:text-left space-y-8">
//           <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium mb-4">
//             ✨ Fun for Friends, Families & Dreamers
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
//             Unleash Your <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-400 to-teal-200">
//               Wildest Stories
//             </span>
//           </h1>
          
//           <p className="text-lg text-gray-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
//             Whether you're crafting a magical bedtime tale, playing a fun creative game with friends, or just bored on a rainy day—StoryForge brings your imagination to life in seconds.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//             <Link
//               to="/app"
//               className="group relative px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2"
//             >
//               Start Creating
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//         </div>

//         {/* Right Visual (CSS Mockup of your App) */}
//         <div className="flex-1 w-full max-w-lg relative group perspective-1000">
//           {/* Decorative floating elements */}
//           <div className="absolute -top-12 -right-12 w-24 h-24 bg-teal-500/20 rounded-full blur-xl"></div>
          
//           {/* The App Interface Container */}
//           <div className="relative bg-[#40534C] rounded-xl border border-gray-600 shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1">
            
//             {/* Fake App Header */}
//             <div className="bg-[#1A3636] p-4 flex items-center gap-2 border-b border-gray-700">
//               <div className="flex gap-1.5">
//                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
//                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
//                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
//               </div>
//               <div className="ml-4 h-2 w-32 bg-gray-600/50 rounded-full"></div>
//             </div>

//             {/* Fake App Body */}
//             <div className="p-6 min-h-[300px] flex flex-col gap-4">
//               {/* Changed title to sound more adventurous/fun */}
//               <h3 className="text-white text-2xl font-serif">The Hamster Who Stole Time</h3>
//               <div className="space-y-2">
//                 <div className="h-2 w-full bg-gray-300/20 rounded"></div>
//                 <div className="h-2 w-11/12 bg-gray-300/20 rounded"></div>
//                 <div className="h-2 w-4/5 bg-gray-300/20 rounded"></div>
//               </div>
              
//               {/* Floating "Action" Cards inside mockup */}
//               <div className="mt-auto flex gap-2 overflow-hidden">
//                  <div className="bg-gray-800/50 p-2 rounded text-xs text-gray-300 border border-gray-600">Add Hero</div>
//                  <div className="bg-gray-800/50 p-2 rounded text-xs text-gray-300 border border-gray-600">Genre: Comedy</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* --- Feature Grid --- */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <div className="grid md:grid-cols-3 gap-8">
//           <FeatureCard 
//             icon={<User className="text-teal-400" />}
//             title="Create Dream Friends"
//             desc="From brave knights to goofy aliens. Create unique characters with personalities that react and chat just like real people."
//           />
//           <FeatureCard 
//             icon={<Map className="text-purple-400" />}
//             title="Any World You Want"
//             desc="A candy kingdom? A spooky forest? Just describe the vibe, and we set the stage for your adventure."
//           />
//           <FeatureCard 
//             icon={<Sparkles className="text-amber-400" />}
//             title="Bedtime & Party Fun"
//             desc="Perfect for parents needing a new bedtime story, or friends wanting to laugh at a ridiculous generated adventure."
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

// // Simple Sub-component for the cards
// function FeatureCard({ icon, title, desc }) {
//   return (
//     <div className="p-6 rounded-2xl bg-[#1A3636]/50 border border-gray-700/50 backdrop-blur-sm hover:bg-[#1A3636] transition-colors">
//       <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4 shadow-lg">
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
//       <p className="text-gray-400 leading-relaxed">{desc}</p>
//     </div>
//   );
// }

import React, { useState } from 'react';

// --- FIX: Import the image directly ---
// This allows Vite to bundle the image and provide the correct URL to the browser.
// IMPORTANT: Ensure the file is inside "frontend/src/assets/" and check the extension (.jpg vs .png)
import portalBg from '/src/assets/mc_wallpaper_movie_portal_2560x1440.png'; 

const LandingPage = ({ onEnter }) => {
  const [isZooming, setIsZooming] = useState(false);

  const handleEnter = () => {
    setIsZooming(true);
    // Wait for animation to finish before switching views
    setTimeout(onEnter, 800);
  };

  return (
    <div className={`relative h-screen w-full overflow-hidden transition-opacity duration-1000 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* --- BACKGROUND IMAGE --- */}
      <div 
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-in-out ${isZooming ? 'scale-150' : 'scale-100'}`}
        style={{ 
          // Use the imported variable here using template literals
          backgroundImage: `url(${portalBg})`,
        }}
      >
        {/* Overlay gradient to make text pop but keep portal bright */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-20 text-white">
        
        {/* Header Section */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-10 duration-1000">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]">
            STORY FORGE
          </h1>
          <p className="text-xl md:text-2xl font-medium text-blue-200 tracking-wide drop-shadow-md max-w-2xl px-4">
            Step through the portal and forge infinite worlds.
          </p>
        </div>

        {/* THE PORTAL BUTTON (Centered) */}
        <div className="flex-grow flex items-center justify-center w-full">
             <button 
               onClick={handleEnter}
               className="group relative flex items-center justify-center"
             >
                {/* Glowing ring effect behind button */}
                <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full group-hover:bg-cyan-400/50 transition-all duration-500 animate-pulse"></div>
                
                {/* The Button Itself */}
                <div className="relative px-12 py-6 bg-black/40 backdrop-blur-sm border-2 border-cyan-400/50 hover:border-cyan-300 text-cyan-100 font-bold text-2xl tracking-widest uppercase rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:bg-black/60 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
                  Enter Portal
                  
                  {/* Little arrow icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="inline-block ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
             </button>
        </div>

        {/* Footer / Credits */}
        <div className="text-center text-white/40 text-sm font-mono">
           <p>Powered by Gemini AI & Kokoro TTS</p>
           <p>Crafted by Group 03</p>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;