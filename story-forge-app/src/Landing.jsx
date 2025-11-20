// src/Landing.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton.jsx";

// IMPORTANT: make sure this image actually exists at this path
// e.g. frontend/src/assets/mc_wallpaper_movie_portal_2560x1440.png
import portalBg from "/src/assets/mc_wallpaper_movie_portal_2560x1440.png";

function Landing() {
  const [isZooming, setIsZooming] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    setIsZooming(true);
    // Wait for the zoom animation to finish, then go to the dashboard
    setTimeout(() => {
      navigate("/app");
    }, 800);
  };

  return (
    <div
      className={`relative h-screen w-full overflow-hidden transition-opacity duration-1000 ${
        isZooming ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* --- BACKGROUND IMAGE --- */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms] ease-in-out ${
          isZooming ? "scale-150" : "scale-100"
        }`}
        style={{
          backgroundImage: `url(${portalBg})`,
        }}
      >
        {/* Overlay gradient to make text pop but keep portal bright */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between py-8 md:py-20 text-white">
        {/* Top-right login (like the old Landing) */}
        <header className="w-full flex justify-end px-6">
          <LoginButton aria-label="Login" />
        </header>

        {/* Header Section */}
        <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-10 duration-1000 mt-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]">
            STORY FORGE
          </h1>
          <p className="text-lg md:text-2xl font-medium text-blue-200 tracking-wide drop-shadow-md max-w-2xl px-4 mx-auto">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Footer / Credits */}
        <div className="text-center text-white/40 text-xs md:text-sm font-mono mb-2 md:mb-0">
          <p>Powered by Gemini AI & Kokoro TTS</p>
          <p>Crafted by Group 03</p>
        </div>
      </div>
    </div>
  );
}

export default Landing;