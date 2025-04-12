// src/components/Header.jsx
import { Link } from 'react-router-dom'
import '../styles/styles.css'

export default function Header() {
  return (
    <header>
      <h1>ServiceVoice</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
        <Link to="/signup">Sign Up</Link> | <Link to="/login">Log In</Link>
      </nav>
    </header>
  )
}
