"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PiggyBank, TrendingUp, Calendar, Target } from "lucide-react"

export default function RetirementPrediction({ data, loading }) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            Retirement Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const progressPercentage = Math.min(((30 - (data.years_to_retirement || 30)) / 30) * 100, 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5" />
          Retirement Planning
        </CardTitle>
        <CardDescription>AI-powered retirement projections based on your profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-600">
              ₹{(data.retirement_corpus_needed || data.corpus_needed || 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Target Corpus</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">
              ₹{(data.monthly_sip_required || data.monthly_sip || 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Monthly SIP</div>
          </div>

          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-600">{data.years_to_retirement || 30}</div>
            <div className="text-sm text-gray-600">Years to Retire</div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Retirement Progress</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Recommendations</h4>
          <div className="space-y-2">
            {data.recommendations?.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5 text-xs">
                  {index + 1}
                </Badge>
                <span className="text-sm text-gray-700">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
