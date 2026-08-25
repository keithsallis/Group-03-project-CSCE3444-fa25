import React from 'react'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import ForgotPasswordForm from './ForgotPasswordForm.jsx'

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = React.useState('login')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 text-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {mode === 'login' ? 'Log in' : mode === 'register' ? 'Register' : 'Reset Password'}
          </h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            <button className={`px-3 py-1 rounded ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setMode('login')}>Login</button>
            <button className={`px-3 py-1 rounded ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setMode('register')}>Register</button>
          </div>

          {mode === 'login' ? (
            <LoginForm onSuccess={onClose} onForgotPassword={() => setMode('forgot')} />
          ) : mode === 'register' ? (
            <RegisterForm onSuccess={onClose} />
          ) : (
            <ForgotPasswordForm onBackToLogin={() => setMode('login')} onSuccess={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}
