// src/pages/AppAccess.jsx
import { useState } from 'react'
import Header from '../components/Header'
import '../styles/styles.css'

export default function AppAccess() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }

  return (
    <div className={isHighContrast ? 'high-contrast' : ''}>
      <Header />
      <main>
        <h2>Welcome to Your Hammer!</h2>
        <button>Open App</button>
        <p>
          Upgrade to a Wrench? <a href="/verify">Verify Now</a>
        </p>
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
