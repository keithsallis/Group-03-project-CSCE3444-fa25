// src/LoginButton.jsx
import React, { useState } from 'react'
import AuthModal from './components/AuthModal.jsx'

function LoginButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
      >
        Log In
      </button>
      <AuthModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default LoginButton;