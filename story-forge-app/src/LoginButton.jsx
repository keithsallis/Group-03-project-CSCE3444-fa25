// src/LoginButton.jsx
import React, { useState } from 'react'
import AuthModal from './components/AuthModal.jsx'

function LoginButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#1A3636] hover:bg-[#677D6A] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
      >
        Log In
      </button>
      <AuthModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default LoginButton;
