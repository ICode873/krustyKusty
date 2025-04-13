// src/pages/CustomerDashboard.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../utils/supabase'
import { Navigate } from 'react-router-dom'
import '../styles/styles.css'

export default function CustomerDashboard() {
  const { user, role, loading } = useAuth()
  const [ratings, setRatings] = useState([])
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
    if (user && !loading) {
      fetchRatings()
    }
  }, [user, loading])

  const fetchRatings = async () => {
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('rating, comment, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      console.log('Ratings fetched:', data)
      setRatings(data || [])
    } catch (err) {
      console.error('Error fetching ratings:', err)
      setRatings([])
    }
  }

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast)
  }

  console.log('Dashboard render:', { user: !!user, role, loading })

  if (loading) {
    console.log('Dashboard loading')
    return <div>Loading...</div>
  }
  if (!user) {
    console.log('No user, redirecting to login')
    return <Navigate to="/login" />
  }

  return (
    <div className={isHighContrast ? 'high-contrast' : ''}>
      <header>
        <h1>ServiceVoice</h1>
      </header>
      <main>
        <h2>
          <img
            src={roleIcons[role] || roleIcons.customer}
            alt={roleAltText[role] || roleAltText.customer}
            style={{
              width: '32px',
              height: '32px',
              marginRight: '0.75rem',
              verticalAlign: 'middle',
            }}
            onError={(e) =>
              console.error(`Failed to load icon for role: ${role}`)
            }
          />
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
          {ratings.length === 0 ? (
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
        <p>© 2025 ServiceVoice</p>
        <button className="high-contrast-toggle" onClick={toggleHighContrast}>
          {isHighContrast ? 'Normal Contrast' : 'High Contrast'}
        </button>
      </footer>
    </div>
  )
}
