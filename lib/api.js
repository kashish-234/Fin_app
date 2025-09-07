// API utility functions for FastAPI backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

class APIError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      throw new APIError(`API request failed: ${response.statusText}`, response.status)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    // For demo purposes, return mock data if API is not available
    console.warn("API not available, using mock data:", error.message)
    return getMockPredictionData(endpoint)
  }
}

function getMockPredictionData(endpoint) {
  // Mock data for when FastAPI backend is not running
  if (endpoint.includes("/predict/retirement")) {
    return {
      prediction_type: "retirement",
      retirement_corpus_needed: 25000000,
      monthly_sip_required: 35000,
      years_to_retirement: 30,
      recommendations: [
        "Start investing ₹35,000 monthly for retirement",
        "Consider increasing SIP by 10% annually",
        "Diversify across equity and debt instruments",
        "Review and rebalance portfolio annually",
      ],
      generated_at: new Date().toISOString(),
    }
  } else if (endpoint.includes("/predict/investment")) {
    return {
      prediction_type: "investment",
      allocation: {
        equity: 70,
        debt: 20,
        gold: 10,
      },
      expected_returns: {
        annual_return_percent: 11.2,
        risk_adjusted_return: 10.1,
      },
      risk_level: "Moderate",
      recommendations: [
        "Allocate 70% to equity for growth",
        "Keep 20% in debt for stability",
        "Maintain 10% in gold for inflation hedge",
        "Rebalance portfolio quarterly",
        "Consider tax-saving instruments",
      ],
      generated_at: new Date().toISOString(),
    }
  } else if (endpoint.includes("/predict/risk-assessment")) {
    return {
      prediction_type: "risk_assessment",
      risk_score: 35,
      risk_category: "Moderate Risk",
      risk_factors: ["High expense-to-income ratio", "Insufficient insurance coverage"],
      mitigation_strategies: [
        "Build emergency fund of 6-12 months expenses",
        "Increase insurance coverage to 10x annual income",
        "Reduce unnecessary expenses",
        "Consider additional income sources",
      ],
      generated_at: new Date().toISOString(),
    }
  }

  return {
    prediction_type: "general",
    recommendations: ["Complete your profile for personalized recommendations"],
    risk_score: 0,
    projected_returns: {},
    investment_allocation: {},
    confidence_score: 0.5,
    generated_at: new Date().toISOString(),
  }
}

export const predictionAPI = {
  getRetirementPrediction: (userProfile) =>
    apiRequest("/predict/retirement", {
      method: "POST",
      body: JSON.stringify(userProfile),
    }),

  getInvestmentRecommendation: (userProfile) =>
    apiRequest("/predict/investment", {
      method: "POST",
      body: JSON.stringify(userProfile),
    }),

  getRiskAssessment: (userProfile) =>
    apiRequest("/predict/risk-assessment", {
      method: "POST",
      body: JSON.stringify(userProfile),
    }),

  getGeneralPrediction: (userProfile, predictionType) =>
    apiRequest("/predict/", {
      method: "POST",
      body: JSON.stringify({
        user_profile: userProfile,
        prediction_type: predictionType,
      }),
    }),
}
