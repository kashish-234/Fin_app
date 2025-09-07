"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { TrendingUp, PieChartIcon, Percent } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function InvestmentPrediction({ data, loading }) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Investment Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const allocationData = data.allocation
    ? Object.entries(data.allocation).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value,
        percentage: value,
      }))
    : []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5" />
          Investment Allocation
        </CardTitle>
        <CardDescription>Recommended portfolio distribution based on your risk profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Allocation Chart */}
        {allocationData.length > 0 && (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Expected Returns */}
        {data.expected_returns && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">
                {data.expected_returns.annual_return_percent || 0}%
              </div>
              <div className="text-sm text-gray-600">Expected Annual Return</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Percent className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{data.expected_returns.risk_adjusted_return || 0}%</div>
              <div className="text-sm text-gray-600">Risk-Adjusted Return</div>
            </div>
          </div>
        )}

        {/* Risk Level */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Risk Level:</span>
          <Badge
            variant={data.risk_level === "High" ? "destructive" : data.risk_level === "Low" ? "secondary" : "default"}
          >
            {data.risk_level || "Moderate"}
          </Badge>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Investment Recommendations</h4>
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
