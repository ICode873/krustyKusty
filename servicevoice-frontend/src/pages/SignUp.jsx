// src/pages/SignUp.jsx
import { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: 'customer' } },
    })
    if (error) setError(error.message)
    else alert('Check your email for confirmation.')
  }

  return (
    <div>
      <header>
        <h1>ServiceVoice</h1>
      </header>
      <main>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <button type="submit">Sign Up</button>
          <p>All users start as customers (Gray Hammer).</p>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
      <footer>
        <p>&copy; 2025 ServiceVoice</p>
      </footer>
    </div>
  )
}
