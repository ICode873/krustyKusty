// src/pages/About.jsx
import { useState } from 'react'
import '../styles/styles.css'

export default function About() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }

  return (
    <div className={isHighContrast ? 'high-contrast' : ''}>
      <header>
        <h1>ServiceVoice</h1>
        <nav>
          <a href="/">Home</a> | <a href="/about">About</a> |{' '}
          <a href="/signup">Sign Up</a> | <a href="/login">Log In</a>
        </nav>
      </header>
      <main>
        <section>
          <h2>Why ServiceVoice?</h2>
          <p>
            ServiceVoice is a private network for verified U.S. home service
            businesses to rate customers, share address-based reviews, and grow
            smarter together.
          </p>
        </section>
        <section>
          <h3>How It Works</h3>
          <div>
            <p>
              <strong>Customer (Gray Hammer)</strong>: View your ratings and
              feedback.
            </p>
            <p>
              <strong>Owner (Yellow Wrench)</strong>: Rate customers and manage
              your team.
            </p>
            <p>
              <strong>Tech (Green Screwdriver)</strong>: Share reviews and
              insights.
            </p>
          </div>
          <button>Get Started</button>
        </section>
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
