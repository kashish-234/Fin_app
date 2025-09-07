import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { db, isFirebaseAvailable } from "./firebase"

// Mock data for demo mode
const mockUserData = {
  name: "Demo User",
  age: 30,
  gender: "Prefer not to say",
  occupation: "Salaried",
  maritalStatus: "Single",
  numberOfDependents: 0,
  annualIncome: 1200000,
  monthlyIncome: 100000,
  monthlyExpenses: 60000,
  currentNetWorth: 500000,
  investedAsset: 200000,
  riskTakingAbility: "Moderate",
  preferredInvestmentHorizon: "Long",
  primaryFinancialGoal: "Retirement",
  goalTimelineYears: 30,
  monthlySurplus: 40000,
  startingPrincipal: 100000,
  liquidityPreference: "Medium",
  loan: 0,
  insurance: 500000,
  createdAt: new Date(),
  updatedAt: new Date(),
}

// Save user profile data to Firestore
export async function saveUserProfile(userId, profileData) {
  try {
    if (!isFirebaseAvailable()) {
      // Demo mode - simulate successful save
      console.log("Demo mode: Profile saved locally")
      localStorage.setItem(
        `profile_${userId}`,
        JSON.stringify({
          ...profileData,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      )
      return { success: true }
    }

    const userRef = doc(db, "users", userId)
    await setDoc(
      userRef,
      {
        ...profileData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { merge: true },
    )
    return { success: true }
  } catch (error) {
    console.error("Error saving user profile:", error)
    return { success: false, error: error.message }
  }
}

// Get user profile data from Firestore
export async function getUserProfile(userId) {
  try {
    if (!isFirebaseAvailable()) {
      // Demo mode - return mock data or localStorage data
      const savedProfile = localStorage.getItem(`profile_${userId}`)
      if (savedProfile) {
        return { success: true, data: JSON.parse(savedProfile) }
      }
      return { success: true, data: mockUserData }
    }

    const userRef = doc(db, "users", userId)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() }
    } else {
      return { success: false, error: "No profile found" }
    }
  } catch (error) {
    console.error("Error getting user profile:", error)
    return { success: false, error: error.message }
  }
}

// Update user profile data
export async function updateUserProfile(userId, updates) {
  try {
    if (!isFirebaseAvailable()) {
      // Demo mode - update localStorage
      const existingProfile = localStorage.getItem(`profile_${userId}`)
      if (existingProfile) {
        const profile = JSON.parse(existingProfile)
        const updatedProfile = {
          ...profile,
          ...updates,
          updatedAt: new Date(),
        }
        localStorage.setItem(`profile_${userId}`, JSON.stringify(updatedProfile))
      }
      return { success: true }
    }

    const userRef = doc(db, "users", userId)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating user profile:", error)
    return { success: false, error: error.message }
  }
}
