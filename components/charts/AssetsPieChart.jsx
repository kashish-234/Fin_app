"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const COLORS = ["#8884D8", "#82CA9D", "#FFC658", "#FF7C7C"]

export default function AssetsPieChart({ data }) {
  const chartData = [
    { name: "Net Worth", value: data.currentNetWorth || 0 },
    { name: "Invested Assets", value: data.investedAsset || 0 },
    { name: "Starting Principal", value: data.startingPrincipal || 0 },
  ].filter((item) => item.value > 0)

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-500">No asset data available</div>
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
