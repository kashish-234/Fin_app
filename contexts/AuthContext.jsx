"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, isFirebaseAvailable } from "../lib/firebase"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)

  // Demo user for when Firebase is not available
  const demoUser = {
    uid: "demo-user-123",
    email: "demo@example.com",
    displayName: "Demo User",
  }

  function signup(email, password) {
    if (!isFirebaseAvailable()) {
      // Demo mode - simulate successful signup
      return Promise.resolve({ user: { ...demoUser, email } })
    }
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    if (!isFirebaseAvailable()) {
      // Demo mode - simulate successful login
      setCurrentUser({ ...demoUser, email })
      return Promise.resolve({ user: { ...demoUser, email } })
    }
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    if (!isFirebaseAvailable()) {
      // Demo mode - simulate logout
      setCurrentUser(null)
      return Promise.resolve()
    }
    return signOut(auth)
  }

  useEffect(() => {
    if (!isFirebaseAvailable()) {
      // Demo mode - set demo user and finish loading
      setIsDemo(true)
      setCurrentUser(demoUser)
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    isDemo,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
