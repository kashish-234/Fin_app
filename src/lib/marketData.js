// Mock market data for demonstration
export function getGoldPrices() {
  const basePrice = 6200
  const data = []

  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const variation = (Math.random() - 0.5) * 200
    data.push({
      date: date.toISOString().split("T")[0],
      price: basePrice + variation + Math.sin(i / 5) * 100,
    })
  }

  return data
}

export function getSilverPrices() {
  const basePrice = 74000
  const data = []

  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const variation = (Math.random() - 0.5) * 2000
    data.push({
      date: date.toISOString().split("T")[0],
      price: basePrice + variation + Math.sin(i / 7) * 1000,
    })
  }

  return data
}

export function getCurrencyRates() {
  const generateRateData = (baseRate, volatility) => {
    const data = []
    for (let i = 30; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const variation = (Math.random() - 0.5) * volatility
      data.push({
        date: date.toISOString().split("T")[0],
        rate: baseRate + variation + (Math.sin(i / 10) * volatility) / 2,
      })
    }
    return data
  }

  return {
    "USD-INR": {
      current: 83.25,
      change: 0.15,
      changePercent: 0.18,
      data: generateRateData(83.25, 0.5),
    },
    "EUR-INR": {
      current: 89.45,
      change: -0.32,
      changePercent: -0.36,
      data: generateRateData(89.45, 0.8),
    },
    "AUD-INR": {
      current: 54.78,
      change: 0.08,
      changePercent: 0.15,
      data: generateRateData(54.78, 0.4),
    },
    "YEN-INR": {
      current: 0.56,
      change: -0.01,
      changePercent: -1.79,
      data: generateRateData(0.56, 0.02),
    },
  }
}

export function getTopStocks() {
  return [
    { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2456.75, change: 23.45, changePercent: 0.96 },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3789.2, change: -15.3, changePercent: -0.4 },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1678.9, change: 8.75, changePercent: 0.52 },
    { symbol: "INFY", name: "Infosys Ltd", price: 1456.3, change: 12.6, changePercent: 0.87 },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 987.45, change: -5.2, changePercent: -0.52 },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", price: 2345.8, change: 18.9, changePercent: 0.81 },
    { symbol: "ITC", name: "ITC Ltd", price: 456.75, change: -2.15, changePercent: -0.47 },
    { symbol: "SBIN", name: "State Bank of India", price: 678.2, change: 7.85, changePercent: 1.17 },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", price: 1234.5, change: 15.3, changePercent: 1.25 },
    { symbol: "LT", name: "Larsen & Toubro Ltd", price: 3456.9, change: -8.45, changePercent: -0.24 },
  ]
}
