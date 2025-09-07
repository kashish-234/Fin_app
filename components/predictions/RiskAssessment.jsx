"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function RiskAssessment({ data, loading }) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const getRiskColor = (score) => {
    if (score < 30) return "text-green-600"
    if (score < 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getRiskBadgeVariant = (category) => {
    if (category?.includes("Low")) return "secondary"
    if (category?.includes("Moderate")) return "default"
    return "destructive"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Financial Risk Assessment
        </CardTitle>
        <CardDescription>Comprehensive analysis of your financial risk profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Score */}
        <div className="text-center p-6 bg-gray-50 rounded-lg">
          <div className={`text-4xl font-bold mb-2 ${getRiskColor(data.risk_score || 0)}`}>
            {data.risk_score || 0}/100
          </div>
          <Badge variant={getRiskBadgeVariant(data.risk_category)} className="mb-4">
            {data.risk_category || "Unknown Risk"}
          </Badge>
          <Progress value={data.risk_score || 0} className="h-3" />
        </div>

        {/* Risk Factors */}
        {data.risk_factors && data.risk_factors.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              Identified Risk Factors
            </h4>
            <div className="space-y-2">
              {data.risk_factors.map((factor, index) => (
                <Alert key={index} variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{factor}</AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Mitigation Strategies */}
        {data.mitigation_strategies && data.mitigation_strategies.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Recommended Actions
            </h4>
            <div className="space-y-2">
              {data.mitigation_strategies.map((strategy, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <Badge variant="outline" className="mt-0.5 text-xs bg-green-100">
                    {index + 1}
                  </Badge>
                  <span className="text-sm text-gray-700">{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Level Explanation */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">Understanding Your Risk Score</h5>
          <div className="text-sm text-blue-800 space-y-1">
            <div>• 0-30: Low Risk - Strong financial foundation</div>
            <div>• 31-60: Moderate Risk - Some areas need attention</div>
            <div>• 61-100: High Risk - Immediate action recommended</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
