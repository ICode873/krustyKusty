// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('customer')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) {
          console.error('Get session error:', error)
          throw error
        }
        console.log('Initial session:', session)
        if (session?.user) {
          setUser(session.user)
          await fetchUserRole(session.user.id)
        } else {
          setUser(null)
          setRole('customer')
        }
      } catch (err) {
        console.error('Session init error:', err)
        setUser(null)
        setRole('customer')
      } finally {
        setLoading(false)
      }
    }

    initializeSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event, 'Session:', session)
      try {
        if (session?.user) {
          setUser(session.user)
          await fetchUserRole(session.user.id)
        } else {
          setUser(null)
          setRole('customer')
        }
      } catch (err) {
        console.error('Auth state change error:', err)
        setUser(null)
        setRole('customer')
      } finally {
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .maybeSingle()
      if (error) {
        console.error('Fetch role error:', error)
        throw error
      }
      console.log('Fetched role:', data)
      setRole(data?.role || 'customer')
    } catch (err) {
      console.error('Role fetch failed:', err)
      setRole('customer')
    }
  }

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
