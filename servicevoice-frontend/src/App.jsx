// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import AppAccess from './pages/AppAccess'
import CustomerDashboard from './pages/CustomerDashboard'
import OwnerDashboard from './pages/OwnerDashboard'

function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth()
  console.log('ProtectedRoute:', { user: !!user, role, loading, allowedRoles })
  if (loading) return <div>Loading...</div>
  if (!user) {
    console.log('No user, redirecting to /login')
    return <Navigate to="/login" />
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log(`Role ${role} not allowed, redirecting to /dashboard`)
    return <Navigate to="/dashboard" />
  }
  return children
}

function DebugAuth() {
  const { user, role, loading } = useAuth()
  return (
    <div>
      <h2>Debug Auth</h2>
      <pre>{JSON.stringify({ user, role, loading }, null, 2)}</pre>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/app-access"
            element={
              <ProtectedRoute>
                <AppAccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['customer', 'tech', 'owner']}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner-dashboard"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/debug-auth" element={<DebugAuth />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
