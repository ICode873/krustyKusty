// src/pages/CustomerDashboard.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../utils/supabase'

export default function CustomerDashboard() {
  const { user, role } = useAuth()
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchRatings()
    }
  }, [user])

  const fetchRatings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('ratings')
      .select('rating, comment, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching ratings:', error)
      setRatings([])
    } else {
      setRatings(data)
    }
    setLoading(false)
  }

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <header>
        <h1>ServiceVoice</h1>
      </header>
      <main>
        <h2>
          Your{' '}
          {role === 'customer'
            ? 'Hammer'
            : role === 'owner'
            ? 'Wrench'
            : 'Screwdriver'}{' '}
          Dashboard
        </h2>
        <section>
          <h3>Your Ratings</h3>
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
                </li>
              ))}
            </ul>
          )}
        </section>
        {role === 'customer' && (
          <p>
            Own a business? <a href="/verify">Verify Now</a>
          </p>
        )}
      </main>
      <footer>
        <p>&copy; 2025 ServiceVoice</p>
      </footer>
    </div>
  )
}
