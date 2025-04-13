// src/pages/LogIn.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import Header from '../components/Header'
import '../styles/styles.css'

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const navigate = useNavigate()

  const attemptLogin = async () => {
    console.log('Attempting login with:', { email })
    const loginPromise = supabase.auth.signInWithPassword({
      email,
      password,
    })
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Login request timed out')), 20000)
    )
    return Promise.race([loginPromise, timeoutPromise])
  }

  const handleLogIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    let retries = 2
    while (retries > 0) {
      try {
        const { data, error } = await attemptLogin()
        if (error) {
          console.error('Supabase login error:', error)
          throw error
        }
        console.log('Login successful, user:', data.user)
        navigate('/dashboard')
        return
      } catch (err) {
        console.error('Login attempt failed:', err)
        if (err.message === 'Login request timed out' && retries > 1) {
          console.log(`Retrying login (${retries - 1} attempts left)`)
          retries--
          await new Promise((resolve) => setTimeout(resolve, 1000))
          continue
        }
        setError(
          err.message.includes('Invalid login credentials')
            ? 'Incorrect email or password.'
            : err.message || 'Failed to log in. Please try again.'
        )
        break
      } finally {
        if (retries <= 0 || !error) {
          setLoading(false)
        }
      }
    }
    setLoading(false)
  }

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }

  return (
    <div className={isHighContrast ? 'high-contrast' : 'login-page'}>
      <Header />
      <main>
        <h2>Log In</h2>
        <form onSubmit={handleLogIn}>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            disabled={loading}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
          <p>
            Need an account? <a href="/signup">Sign Up</a>
          </p>
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </form>
        {error && <p className="error">{error}</p>}
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
