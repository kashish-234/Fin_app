// Firebase configuration and initialization
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Check if all required Firebase config variables are present
const requiredEnvVars = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

let app = null
let auth = null
let db = null

if (missingEnvVars.length === 0) {
  // All environment variables are present, initialize Firebase
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig)

    // Initialize Firebase Authentication and get a reference to the service
    auth = getAuth(app)

    // Initialize Cloud Firestore and get a reference to the service
    db = getFirestore(app)

    console.log("Firebase initialized successfully")
  } catch (error) {
    console.error("Firebase initialization error:", error)
  }
} else {
  console.warn("Firebase not initialized. Missing environment variables:", missingEnvVars)
  console.warn(
    "The app will run in demo mode. Please add the missing environment variables to enable Firebase features.",
  )
}

// Export auth and db with null checks
export { auth, db }
export default app

// Helper function to check if Firebase is available
export const isFirebaseAvailable = () => {
  return auth !== null && db !== null
}
