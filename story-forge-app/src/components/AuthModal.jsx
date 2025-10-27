import React from 'react'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import { useAuth } from '../contexts/authCore.jsx'

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = React.useState('login')
  const { signInWithGoogle, signInWithGoogleRedirect } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  if (!isOpen) return null

  const handleGoogle = async () => {
    setError(null)
    setLoading(true)
    try {
      await signInWithGoogle()
      setLoading(false)
      onClose()
    } catch (e) {
      console.error('Google sign-in error', e)
      // show both code and message to help debugging
      const code = e?.code || 'unknown'
      const message = e?.message || String(e)
      setError(`${code}: ${message}`)
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 text-gray-900">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{mode === 'login' ? 'Log in' : 'Register'}</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            <button className={`px-3 py-1 rounded ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setMode('login')}>Login</button>
            <button className={`px-3 py-1 rounded ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`} onClick={() => setMode('register')}>Register</button>
          </div>

          {mode === 'login' ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-center mb-2">Or sign in with</p>
          <div className="flex flex-col items-center">
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <div className="flex flex-col items-center w-full">
              <button
                onClick={handleGoogle}
                disabled={loading}
                className={`w-full px-4 py-2 rounded ${loading ? 'bg-gray-300 text-gray-700' : 'bg-red-500 text-white'}`}
              >
                {loading ? 'Signing in...' : 'Sign in with Google'}
              </button>
              <button
                onClick={() => {
                  // If popup fails, allow redirect flow as fallback
                  try {
                    setError(null)
                    setLoading(true)
                    signInWithGoogleRedirect()
                  } catch (e) {
                    setError(e?.code ? `${e.code}: ${e.message}` : e?.message || String(e))
                    setLoading(false)
                  }
                }}
                disabled={loading}
                className="mt-2 w-full px-4 py-2 rounded border border-gray-200 bg-white text-gray-800"
              >
                Use redirect sign-in instead
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500">If nothing happens, check your popup blocker or enable Google sign-in in Firebase Console.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
