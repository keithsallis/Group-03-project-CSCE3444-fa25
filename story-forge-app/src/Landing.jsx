// src/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton.jsx";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white" style={{ backgroundColor: '#40534C' }}>
      <header className="absolute top-0 right-0 p-6">
        <LoginButton
          aria-label="Login"    // 🆕 adds a readable name for screen readers
        />
      </header>

      <main className="max-w-3xl px-6 text-center space-y-6">
        <h1 className="text-5xl font-extrabold">StoryForge</h1>
        <p className="text-lg opacity-90">
          Spark characters, scenes, and story beats; then forge them into full narratives.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            aria-label="Open Dashboard"    // 🆕 adds a readable name for screen readers
            to="/app"
            className="bg-[#1A3636] hover:bg-[#677D6A] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >Open Dashboard
            </Link>
        </div>
      </main>
    </div>
  );
}
