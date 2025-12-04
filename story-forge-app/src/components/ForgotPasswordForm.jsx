import React, { useState } from 'react'
import { useAuth } from '../contexts/authCore.jsx'

export default function ForgotPasswordForm({ onBackToLogin, onSuccess }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setLoading(true)
    try {
      await resetPassword(email)
      setSuccessMessage('Password reset email sent! Check your inbox.')
      setEmail('')
      setLoading(false)
      // Optionally close modal after a few seconds
      setTimeout(() => onSuccess && onSuccess(), 3000)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {successMessage && <div className="text-green-600 text-sm">{successMessage}</div>}
      <p className="text-sm text-gray-600 mb-3">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded"
      />
      <div className="flex justify-between items-center gap-2">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Back to Login
        </button>
        <button
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </form>
  )
}
