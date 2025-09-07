import { doc, setDoc, getDoc, collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { db, isFirebaseAvailable } from "./firebase"

// Mock data for demo mode
const mockUserProfile = {
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
  investedAsset: 300000,
  riskTakingAbility: "Moderate",
  preferredInvestmentHorizon: "Long",
  primaryFinancialGoal: "Retirement",
  goalTimelineYears: 25,
  monthlySurplus: 40000,
  startingPrincipal: 100000,
  liquidityPreference: "Medium",
  loan: 200000,
  insurance: 50000,
}

export async function saveUserProfile(userId, profileData) {
  if (!isFirebaseAvailable()) {
    // Demo mode - simulate successful save
    localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profileData))
    return { success: true }
  }

  try {
    await setDoc(doc(db, "users", userId), profileData)
    return { success: true }
  } catch (error) {
    console.error("Error saving user profile:", error)
    return { success: false, error: error.message }
  }
}

export async function getUserProfile(userId) {
  if (!isFirebaseAvailable()) {
    // Demo mode - return mock data or localStorage data
    const stored = localStorage.getItem(`userProfile_${userId}`)
    if (stored) {
      return { success: true, data: JSON.parse(stored) }
    }
    return { success: true, data: mockUserProfile }
  }

  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

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

export async function saveFinanceRecord(userId, recordData) {
  if (!isFirebaseAvailable()) {
    // Demo mode - simulate successful save
    const records = JSON.parse(localStorage.getItem(`financeRecords_${userId}`) || "[]")
    records.push({ ...recordData, id: Date.now().toString(), createdAt: new Date().toISOString() })
    localStorage.setItem(`financeRecords_${userId}`, JSON.stringify(records))
    return { success: true }
  }

  try {
    await addDoc(collection(db, "financeRecords"), {
      ...recordData,
      userId,
      createdAt: new Date(),
    })
    return { success: true }
  } catch (error) {
    console.error("Error saving finance record:", error)
    return { success: false, error: error.message }
  }
}

export async function getFinanceRecords(userId) {
  if (!isFirebaseAvailable()) {
    // Demo mode - return mock data
    const records = JSON.parse(localStorage.getItem(`financeRecords_${userId}`) || "[]")
    return { success: true, data: records }
  }

  try {
    const q = query(collection(db, "financeRecords"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    const records = []
    querySnapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() })
    })
    return { success: true, data: records }
  } catch (error) {
    console.error("Error getting finance records:", error)
    return { success: false, error: error.message }
  }
}
