import { useState } from 'react'
import { supabase } from '../utils/supabase'
import Header from '../components/Header'
import '../styles/styles.css'

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isHighContrast, setIsHighContrast] = useState(false)

  const handleLogIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      window.location.href = '/app-access'
    } catch (err) {
      setError(err.message)
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
        <h2>Log In</h2>
        <form onSubmit={handleLogIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
          <p>
            <a href="/signup">Need an account? Sign Up</a>
          </p>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
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
