// src/pages/Home.jsx
import { useState } from 'react'

export default function Home() {
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
          <h2>Rate Customers, Share Insights, Grow Smarter</h2>
          <p>A private network for verified U.S. home service businesses.</p>
          <button>Join Your Toolbox</button>
        </section>
        <section>
          <h3>Features</h3>
          <div>
            <p>
              <strong>See Your Summary</strong> (Gray Hammer)
            </p>
            <p>
              <strong>Rate with Toolbox Ratings</strong> (Yellow Wrench)
            </p>
            <p>
              <strong>Share Address Reviews</strong> (Green Screwdriver)
            </p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 ServiceVoice</p>
        <button className="high-contrast-toggle" onClick={toggleHighContrast}>
          {isHighContrast ? 'Normal Contrast' : 'High Contrast'}
        </button>
      </footer>
    </div>
  )
}
