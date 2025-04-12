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

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
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
              <ProtectedRoute>
                <CustomerDashboard />
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
