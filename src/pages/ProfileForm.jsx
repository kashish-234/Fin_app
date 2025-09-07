"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { saveUserProfile } from "../lib/firestore"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription } from "../components/ui/alert"

export default function ProfileForm() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    maritalStatus: "",
    numberOfDependents: "",
    annualIncome: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    currentNetWorth: "",
    investedAsset: "",
    riskTakingAbility: "",
    preferredInvestmentHorizon: "",
    primaryFinancialGoal: "",
    goalTimelineYears: "",
    monthlySurplus: "",
    startingPrincipal: "",
    liquidityPreference: "",
    loan: "",
    insurance: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Convert numeric fields to numbers
      const processedData = {
        ...formData,
        age: Number.parseInt(formData.age) || 0,
        numberOfDependents: Number.parseInt(formData.numberOfDependents) || 0,
        annualIncome: Number.parseInt(formData.annualIncome) || 0,
        monthlyIncome: Number.parseInt(formData.monthlyIncome) || 0,
        monthlyExpenses: Number.parseInt(formData.monthlyExpenses) || 0,
        currentNetWorth: Number.parseInt(formData.currentNetWorth) || 0,
        investedAsset: Number.parseInt(formData.investedAsset) || 0,
        goalTimelineYears: Number.parseInt(formData.goalTimelineYears) || 0,
        monthlySurplus: Number.parseInt(formData.monthlySurplus) || 0,
        startingPrincipal: Number.parseInt(formData.startingPrincipal) || 0,
        loan: Number.parseInt(formData.loan) || 0,
        insurance: Number.parseInt(formData.insurance) || 0,
      }

      const result = await saveUserProfile(currentUser.uid, processedData)

      if (result.success) {
        setSuccess("Profile saved successfully!")
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000)
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError("Failed to save profile: " + error.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Complete Your Financial Profile</CardTitle>
            <CardDescription className="text-center">
              Help us understand your financial situation to provide personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-6">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Select
                      value={formData.occupation}
                      onValueChange={(value) => handleInputChange("occupation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Salaried">Salaried</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Not salaried">Not salaried</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                        <SelectItem value="Self Employed">Self Employed</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      value={formData.maritalStatus}
                      onValueChange={(value) => handleInputChange("maritalStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Married with Children">Married with Children</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numberOfDependents">Number of Dependents</Label>
                    <Input
                      id="numberOfDependents"
                      type="number"
                      value={formData.numberOfDependents}
                      onChange={(e) => handleInputChange("numberOfDependents", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving Profile..." : "Save Profile & Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
