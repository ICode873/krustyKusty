// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState('customer')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Session error:', error)
        setLoading(false)
        return
      }
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserRole(session.user.id)
      } else {
        setRole('customer')
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserRole(session.user.id)
      } else {
        setRole('customer')
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
      if (!data) {
        // User not found, rely on trigger to create
        setRole('customer')
      } else {
        setRole(data.role || 'customer')
      }
    } catch (err) {
      console.error('Role fetch failed:', err)
      setRole('customer')
    } finally {
      setLoading(false)
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
