"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function IncomePieChart({ data }) {
  const chartData = [
    { name: "Monthly Income", value: data.monthlyIncome || 0 },
    { name: "Annual Income", value: (data.annualIncome || 0) / 12 },
    { name: "Monthly Surplus", value: data.monthlySurplus || 0 },
  ].filter((item) => item.value > 0)

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-500">No income data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
