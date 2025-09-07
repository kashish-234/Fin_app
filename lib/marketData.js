// Mock market data - In production, this would fetch from real APIs
export const getGoldPrices = () => {
  const basePrice = 6200
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    price: basePrice + Math.random() * 400 - 200,
  }))
}

export const getSilverPrices = () => {
  const basePrice = 74000
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    price: basePrice + Math.random() * 8000 - 4000,
  }))
}

export const getCurrencyRates = () => ({
  "USD-INR": {
    current: 83.25,
    change: +0.15,
    changePercent: +0.18,
    data: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      rate: 83.25 + Math.random() * 2 - 1,
    })),
  },
  "EUR-INR": {
    current: 90.45,
    change: -0.25,
    changePercent: -0.28,
    data: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      rate: 90.45 + Math.random() * 3 - 1.5,
    })),
  },
  "AUD-INR": {
    current: 55.8,
    change: +0.35,
    changePercent: +0.63,
    data: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      rate: 55.8 + Math.random() * 2 - 1,
    })),
  },
  "JPY-INR": {
    current: 0.56,
    change: -0.01,
    changePercent: -1.79,
    data: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      rate: 0.56 + Math.random() * 0.04 - 0.02,
    })),
  },
})

export const getTopStocks = () => [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2456.75, change: +23.45, changePercent: +0.96 },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3678.9, change: -12.3, changePercent: -0.33 },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1543.2, change: +8.75, changePercent: +0.57 },
  { symbol: "INFY", name: "Infosys", price: 1432.65, change: +15.8, changePercent: +1.11 },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever", price: 2234.5, change: -5.25, changePercent: -0.23 },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 987.3, change: +12.45, changePercent: +1.28 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 876.45, change: -3.2, changePercent: -0.36 },
  { symbol: "ITC", name: "ITC Limited", price: 432.8, change: +2.15, changePercent: +0.5 },
  { symbol: "SBIN", name: "State Bank of India", price: 567.25, change: +8.9, changePercent: +1.59 },
  { symbol: "LT", name: "Larsen & Toubro", price: 2876.4, change: -18.75, changePercent: -0.65 },
]
