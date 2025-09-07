"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { getUserProfile } from "../lib/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import RetirementPrediction from "../components/predictions/RetirementPrediction"
import InvestmentPrediction from "../components/predictions/InvestmentPrediction"
import RiskAssessment from "../components/predictions/RiskAssessment"
import { Brain, Loader2, RefreshCw } from "lucide-react"
import {
  generateRetirementPrediction,
  generateInvestmentPrediction,
  generateRiskAssessment,
} from "../lib/predictionGenerators"

export default function Predictions() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [predictions, setPredictions] = useState({
    retirement: null,
    investment: null,
    risk: null,
  })
  const [loading, setLoading] = useState({
    profile: true,
    retirement: false,
    investment: false,
    risk: false,
  })
  const [error, setError] = useState("")

  useEffect(() => {
    fetchUserProfile()
  }, [currentUser])

  const fetchUserProfile = async () => {
    if (currentUser) {
      try {
        setLoading((prev) => ({ ...prev, profile: true }))
        const result = await getUserProfile(currentUser.uid)
        if (result.success) {
          setUserData(result.data)
          // Auto-generate predictions when profile is loaded
          generateAllPredictions(result.data)
        } else {
          setError("Please complete your profile first to get predictions.")
        }
      } catch (error) {
        setError("Error loading profile: " + error.message)
      } finally {
        setLoading((prev) => ({ ...prev, profile: false }))
      }
    }
  }

  const generateAllPredictions = async (profileData = userData) => {
    if (!profileData) return

    // Generate all predictions in parallel
    await Promise.all([
      generateRetirementPrediction(profileData).then((data) =>
        setPredictions((prev) => ({ ...prev, retirement: data })),
      ),
      generateInvestmentPrediction(profileData).then((data) =>
        setPredictions((prev) => ({ ...prev, investment: data })),
      ),
      generateRiskAssessment(profileData).then((data) => setPredictions((prev) => ({ ...prev, risk: data }))),
    ])
  }

  if (loading.profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    <Brain className="h-8 w-8" />
                    AI Financial Predictions
                  </h1>
                  <p className="text-gray-600">Personalized financial insights powered by machine learning</p>
                </div>
                <Button
                  onClick={() => generateAllPredictions()}
                  disabled={!userData || Object.values(loading).some(Boolean)}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Predictions
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!userData ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
                  <p className="text-gray-600 mb-4">
                    We need your financial information to generate personalized predictions.
                  </p>
                  <Button onClick={() => navigate("/profile-form")}>Complete Profile</Button>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="retirement" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="retirement">Retirement Planning</TabsTrigger>
                  <TabsTrigger value="investment">Investment Strategy</TabsTrigger>
                  <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                </TabsList>

                <TabsContent value="retirement" className="space-y-6">
                  <RetirementPrediction data={predictions.retirement} loading={loading.retirement} />
                </TabsContent>

                <TabsContent value="investment" className="space-y-6">
                  <InvestmentPrediction data={predictions.investment} loading={loading.investment} />
                </TabsContent>

                <TabsContent value="risk" className="space-y-6">
                  <RiskAssessment data={predictions.risk} loading={loading.risk} />
                </TabsContent>
              </Tabs>
            )}

            {/* AI Disclaimer */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-sm">AI Predictions Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-600">
                  These predictions are generated using machine learning models based on your financial profile. They
                  are for informational purposes only and should not be considered as professional financial advice.
                  Please consult with a qualified financial advisor before making investment decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
