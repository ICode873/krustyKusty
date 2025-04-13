// src/pages/SignUp.jsx
import { useState } from 'react'
import { supabase } from '../utils/supabase'
import Header from '../components/Header'
import '../styles/styles.css'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)

  const validateInputs = () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return 'Please enter a valid email address.'
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.'
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.'
    }
    return null
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError(null)
    const validationError = validateInputs()
    if (validationError) {
      setError(validationError)
      return
    }
    setLoading(true)
    try {
      console.log('Attempting signup with:', { email })
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: 'customer' },
        },
      })
      if (error) {
        console.error('Supabase signup error:', error)
        throw error
      }
      console.log('Signup successful, user:', data.user)
      alert('Check your email for a confirmation link!')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      console.error('Signup error details:', err)
      setError(err.message || 'Failed to sign up. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }

  return (
    <div className={isHighContrast ? 'high-contrast' : ''}>
      <Header />
      <main>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            disabled={loading}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-label="Confirm Password"
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </form>
        {error && <p className="error">{error}</p>}
        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}
        >
          <img
            src="/icons/hammer-gray-192x192.png"
            alt="Gray Hammer Icon representing customer role"
            style={{ width: '32px', height: '32px', marginRight: '0.75rem' }}
          />
          <p style={{ fontWeight: 'bold' }}>
            All users start as customers (Gray Hammer).
          </p>
        </div>
      </main>
      <footer>
        <p>© 2025 ServiceVoice</p>
        <button className="high-contrast-toggle" onClick={toggleHighContrast}>
          {isHighContrast ? 'Normal Contrast' : 'High Contrast'}
        </button>
      </footer>
    </div>
  )
}
