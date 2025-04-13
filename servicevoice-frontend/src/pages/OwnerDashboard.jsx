// src/pages/OwnerDashboard.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../utils/supabase'
import { Navigate } from 'react-router-dom'
import '../styles/styles.css'

export default function OwnerDashboard() {
  const { user, role } = useAuth()
  const [ratings, setRatings] = useState([])
  const [techs, setTechs] = useState([])
  const [newRating, setNewRating] = useState({
    rating: 'Standard Bolt',
    comment: '',
    customerId: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isHighContrast, setIsHighContrast] = useState(false)

  const roleIcons = {
    customer: '/icons/hammer-gray-192x192.png',
    owner: '/icons/wrench-yellow-192x192.png',
    tech: '/icons/screwdriver-green-192x192.png',
  }

  const roleAltText = {
    customer: 'Gray Hammer Icon representing customer role',
    owner: 'Yellow Wrench Icon representing owner role',
    tech: 'Green Screwdriver Icon representing tech role',
  }

  useEffect(() => {
    if (user && role === 'owner') {
      fetchRatings()
      fetchTechs()
    }
  }, [user, role])

  const fetchRatings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('ratings')
      .select('id, rating, comment, created_at, user_id')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching ratings:', error)
      setRatings([])
    } else {
      setRatings(data)
    }
    setLoading(false)
  }

  const fetchTechs = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email')
      .eq('role', 'tech')
    if (error) {
      console.error('Error fetching techs:', error)
      setTechs([])
    } else {
      setTechs(data)
    }
  }

  const handleAddRating = async (e) => {
    e.preventDefault()
    if (
      !newRating.customerId.match(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      )
    ) {
      setError('Please enter a valid customer ID.')
      return
    }
    setError(null)
    try {
      const { error } = await supabase.from('ratings').insert({
        user_id: newRating.customerId,
        rating: newRating.rating,
        comment: newRating.comment,
        created_by: user.id,
      })
      if (error) throw error
      setNewRating({ rating: 'Standard Bolt', comment: '', customerId: '' })
      fetchRatings()
    } catch (err) {
      setError(err.message || 'Failed to add rating.')
    }
  }

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }

  if (!user) return <div>Loading...</div>
  if (role !== 'owner') return <Navigate to="/dashboard" />

  return (
    <div className={isHighContrast ? 'high-contrast' : ''}>
      <header>
        <h1>ServiceVoice</h1>
      </header>
      <main>
        <h2>
          <img
            src={roleIcons.owner}
            alt={roleAltText.owner}
            style={{
              width: '32px',
              height: '32px',
              marginRight: '0.75rem',
              verticalAlign: 'middle',
            }}
          />
          Your Wrench Dashboard
        </h2>
        <section>
          <h3>Add Customer Rating</h3>
          <form onSubmit={handleAddRating}>
            <input
              type="text"
              placeholder="Customer ID (UUID)"
              value={newRating.customerId}
              onChange={(e) =>
                setNewRating({ ...newRating, customerId: e.target.value })
              }
              aria-label="Customer ID"
              required
            />
            <select
              value={newRating.rating}
              onChange={(e) =>
                setNewRating({ ...newRating, rating: e.target.value })
              }
              aria-label="Rating type"
              required
            >
              <option value="Golden Wrench">Golden Wrench</option>
              <option value="Standard Bolt">Standard Bolt</option>
              <option value="Rusty Nail">Rusty Nail</option>
            </select>
            <textarea
              value={newRating.comment}
              onChange={(e) =>
                setNewRating({ ...newRating, comment: e.target.value })
              }
              placeholder="Add a comment (optional)"
              aria-label="Rating comment"
              style={{ width: '100%', minHeight: '100px', margin: '0.5rem 0' }}
            />
            <button type="submit" disabled={loading}>
              Submit Rating
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </section>
        <section>
          <h3>Business Ratings</h3>
          {loading ? (
            <p>Loading ratings...</p>
          ) : ratings.length === 0 ? (
            <p>No ratings yet.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {ratings.map((rating) => (
                <li
                  key={rating.id}
                  style={{
                    backgroundColor: '#F5F5F5',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                  }}
                >
                  <p>
                    <strong>Rating:</strong> {rating.rating}
                  </p>
                  {rating.comment && (
                    <p>
                      <strong>Comment:</strong> {rating.comment}
                    </p>
                  )}
                  <p>
                    <strong>Date:</strong>{' '}
                    {new Date(rating.created_at).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Customer ID:</strong> {rating.user_id}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h3>Your Techs</h3>
          {techs.length === 0 ? (
            <p>No techs assigned.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {techs.map((tech) => (
                <li
                  key={tech.id}
                  style={{
                    backgroundColor: '#F5F5F5',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                  }}
                >
                  <p>
                    <strong>Email:</strong> {tech.email}
                  </p>
                </li>
              ))}
            </ul>
          )}
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
