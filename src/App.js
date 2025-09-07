import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Dashboard from "./pages/Dashboard"
import ProfileForm from "./pages/ProfileForm"
import MarketTrends from "./pages/MarketTrends"
import Predictions from "./pages/Predictions"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-form"
            element={
              <ProtectedRoute>
                <ProfileForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market-trends"
            element={
              <ProtectedRoute>
                <MarketTrends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/predictions"
            element={
              <ProtectedRoute>
                <Predictions />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
