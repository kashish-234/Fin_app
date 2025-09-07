"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function CustomLineChart({ data, dataKey, color = "#8884d8", title }) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [typeof value === "number" ? value.toFixed(2) : value, title || dataKey]} />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
