"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import CustomLineChart from "../components/charts/LineChart"
import { getGoldPrices, getSilverPrices, getCurrencyRates, getTopStocks } from "../lib/marketData"
import { TrendingUp, TrendingDown, DollarSign, Coins } from "lucide-react"

export default function MarketTrends() {
  const [goldData, setGoldData] = useState([])
  const [silverData, setSilverData] = useState([])
  const [currencyData, setCurrencyData] = useState({})
  const [stockData, setStockData] = useState([])

  useEffect(() => {
    // Simulate API calls with mock data
    setGoldData(getGoldPrices())
    setSilverData(getSilverPrices())
    setCurrencyData(getCurrencyRates())
    setStockData(getTopStocks())
  }, [])

  const formatChange = (change, changePercent) => {
    const isPositive = change >= 0
    return (
      <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span>
          {isPositive ? "+" : ""}
          {change.toFixed(2)} ({isPositive ? "+" : ""}
          {changePercent.toFixed(2)}%)
        </span>
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
              <h1 className="text-3xl font-bold text-gray-900">Market Trends</h1>
              <p className="text-gray-600">Real-time market data and analysis</p>
            </div>

            {/* Commodities Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Precious Metals
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Gold (10g)
                      <Badge variant="outline">₹{goldData[goldData.length - 1]?.price.toFixed(0) || "6,200"}</Badge>
                    </CardTitle>
                    <CardDescription>30-day price trend in INR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomLineChart data={goldData} dataKey="price" color="#FFD700" title="Gold Price (₹)" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Silver (1kg)
                      <Badge variant="outline">
                        ₹{silverData[silverData.length - 1]?.price.toFixed(0) || "74,000"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>30-day price trend in INR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CustomLineChart data={silverData} dataKey="price" color="#C0C0C0" title="Silver Price (₹)" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Currency Rates Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Currency Exchange Rates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {Object.entries(currencyData).map(([pair, data]) => (
                  <Card key={pair}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{pair}</CardTitle>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">₹{data.current.toFixed(2)}</span>
                        {formatChange(data.change, data.changePercent)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CustomLineChart
                        data={data.data}
                        dataKey="rate"
                        color={data.change >= 0 ? "#10B981" : "#EF4444"}
                        title={pair}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Market Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Market Summary</CardTitle>
                <CardDescription>Key market indicators and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+1.2%</div>
                    <div className="text-sm text-gray-600">Nifty 50 Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">-0.8%</div>
                    <div className="text-sm text-gray-600">Sensex Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₹83.25</div>
                    <div className="text-sm text-gray-600">USD/INR</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
