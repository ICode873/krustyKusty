// src/pages/SignUp.jsx
import { useState } from 'react'
import Header from '../components/Header'
import '../styles/styles.css'

export default function SignUp() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }

  return (
    <div className={isHighContrast ? 'high-contrast' : ''}>
      <Header />
      <main>
        <h2>Sign Up</h2>
        <p>Placeholder: Sign-up form coming soon.</p>
        <p>All users start as customers (Gray Hammer).</p>
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
