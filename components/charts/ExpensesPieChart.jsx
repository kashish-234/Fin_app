"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"]

export default function ExpensesPieChart({ data }) {
  const chartData = [
    { name: "Monthly Expenses", value: data.monthlyExpenses || 0 },
    { name: "Loan Payments", value: (data.loan || 0) / 12 },
    { name: "Insurance", value: (data.insurance || 0) / 12 },
  ].filter((item) => item.value > 0)

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-500">No expense data available</div>
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
