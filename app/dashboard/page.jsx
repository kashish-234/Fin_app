"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { getUserProfile } from "../../lib/firestore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import IncomePieChart from "../../components/charts/IncomePieChart"
import ExpensesPieChart from "../../components/charts/ExpensesPieChart"
import AssetsPieChart from "../../components/charts/AssetsPieChart"
import ProtectedRoute from "../../components/ProtectedRoute"
import { Loader2 } from "lucide-react"
import DemoModeAlert from "../../components/DemoModeAlert"

export default function Dashboard() {
  const { currentUser, isDemo } = useAuth()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchUserData() {
      if (currentUser) {
        try {
          const result = await getUserProfile(currentUser.uid)
          if (result.success) {
            setUserData(result.data)
          } else {
            setError("Failed to load profile data. Please complete your profile first.")
          }
        } catch (error) {
          setError("Error loading profile: " + error.message)
        }
        setLoading(false)
      }
    }

    fetchUserData()
  }, [currentUser])

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <DemoModeAlert isDemo={isDemo} />

              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
                <p className="text-gray-600">Overview of your financial portfolio</p>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {userData ? (
                <>
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Annual Income</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹{userData.annualIncome?.toLocaleString() || "0"}</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Monthly Income</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹{userData.monthlyIncome?.toLocaleString() || "0"}</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Assets</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹{userData.investedAsset?.toLocaleString() || "0"}</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Loan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹{userData.loan?.toLocaleString() || "0"}</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Insurance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹{userData.insurance?.toLocaleString() || "0"}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Income Distribution</CardTitle>
                        <CardDescription>Breakdown of your income sources</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <IncomePieChart data={userData} />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Expense Distribution</CardTitle>
                        <CardDescription>Your monthly expense breakdown</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ExpensesPieChart data={userData} />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Asset Distribution</CardTitle>
                        <CardDescription>Your asset portfolio overview</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <AssetsPieChart data={userData} />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Investment Profile</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Risk Tolerance:</span>
                          <span className="font-medium">{userData.riskTakingAbility || "Not specified"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Investment Horizon:</span>
                          <span className="font-medium">{userData.preferredInvestmentHorizon || "Not specified"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Primary Goal:</span>
                          <span className="font-medium">{userData.primaryFinancialGoal || "Not specified"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Liquidity Preference:</span>
                          <span className="font-medium">{userData.liquidityPreference || "Not specified"}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Financial Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Net Worth:</span>
                          <span className="font-medium">₹{userData.currentNetWorth?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Surplus:</span>
                          <span className="font-medium">₹{userData.monthlySurplus?.toLocaleString() || "0"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Goal Timeline:</span>
                          <span className="font-medium">{userData.goalTimelineYears || 0} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dependents:</span>
                          <span className="font-medium">{userData.numberOfDependents || 0}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      No profile data found. Please complete your profile to view your dashboard.
                    </p>
                    <a href="/profile-form" className="text-blue-600 hover:underline">
                      Complete Profile
                    </a>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
