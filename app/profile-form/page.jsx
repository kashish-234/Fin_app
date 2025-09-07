"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useRouter } from "next/navigation"
import { saveUserProfile } from "../../lib/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ProtectedRoute from "../../components/ProtectedRoute"

export default function ProfileForm() {
  const { currentUser } = useAuth()
  const router = useRouter()
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
          router.push("/dashboard")
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
    <ProtectedRoute>
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

                {/* Financial Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                      <Input
                        id="annualIncome"
                        type="number"
                        value={formData.annualIncome}
                        onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
                      <Input
                        id="monthlyExpenses"
                        type="number"
                        value={formData.monthlyExpenses}
                        onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentNetWorth">Current Net Worth (₹)</Label>
                      <Input
                        id="currentNetWorth"
                        type="number"
                        value={formData.currentNetWorth}
                        onChange={(e) => handleInputChange("currentNetWorth", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investedAsset">Invested Assets (₹)</Label>
                      <Input
                        id="investedAsset"
                        type="number"
                        value={formData.investedAsset}
                        onChange={(e) => handleInputChange("investedAsset", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthlySurplus">Monthly Surplus (₹)</Label>
                      <Input
                        id="monthlySurplus"
                        type="number"
                        value={formData.monthlySurplus}
                        onChange={(e) => handleInputChange("monthlySurplus", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startingPrincipal">Starting Principal (₹)</Label>
                      <Input
                        id="startingPrincipal"
                        type="number"
                        value={formData.startingPrincipal}
                        onChange={(e) => handleInputChange("startingPrincipal", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loan">Loan Amount (₹)</Label>
                      <Input
                        id="loan"
                        type="number"
                        value={formData.loan}
                        onChange={(e) => handleInputChange("loan", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance">Insurance (₹)</Label>
                      <Input
                        id="insurance"
                        type="number"
                        value={formData.insurance}
                        onChange={(e) => handleInputChange("insurance", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Investment Preferences */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Investment Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="riskTakingAbility">Risk Taking Ability</Label>
                      <Select
                        value={formData.riskTakingAbility}
                        onValueChange={(value) => handleInputChange("riskTakingAbility", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredInvestmentHorizon">Investment Horizon</Label>
                      <Select
                        value={formData.preferredInvestmentHorizon}
                        onValueChange={(value) => handleInputChange("preferredInvestmentHorizon", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment horizon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Short">Short</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryFinancialGoal">Primary Financial Goal</Label>
                      <Select
                        value={formData.primaryFinancialGoal}
                        onValueChange={(value) => handleInputChange("primaryFinancialGoal", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select financial goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Retirement">Retirement</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="House">House</SelectItem>
                          <SelectItem value="Wealth Growth">Wealth Growth</SelectItem>
                          <SelectItem value="Short Term Gains">Short Term Gains</SelectItem>
                          <SelectItem value="Starting a Business">Starting a Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goalTimelineYears">Goal Timeline (Years)</Label>
                      <Input
                        id="goalTimelineYears"
                        type="number"
                        value={formData.goalTimelineYears}
                        onChange={(e) => handleInputChange("goalTimelineYears", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="liquidityPreference">Liquidity Preference</Label>
                      <Select
                        value={formData.liquidityPreference}
                        onValueChange={(value) => handleInputChange("liquidityPreference", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select liquidity preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
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
    </ProtectedRoute>
  )
}
