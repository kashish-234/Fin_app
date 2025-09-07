// Mock prediction generators for demo mode
export function generateRetirementPrediction(userData) {
  const currentAge = userData.age || 30
  const retirementAge = 60
  const yearsToRetirement = retirementAge - currentAge
  const monthlyIncome = userData.monthlyIncome || 50000
  const monthlySurplus = userData.monthlySurplus || 20000

  // Simple retirement calculation
  const totalSavings = monthlySurplus * 12 * yearsToRetirement
  const inflationAdjusted = totalSavings * Math.pow(1.06, yearsToRetirement) // 6% inflation
  const requiredCorpus = monthlyIncome * 12 * 25 // 25 years post retirement

  return {
    currentAge,
    retirementAge,
    yearsToRetirement,
    projectedCorpus: inflationAdjusted,
    requiredCorpus,
    monthlyInvestmentNeeded: Math.max(0, (requiredCorpus - totalSavings) / (12 * yearsToRetirement)),
    isOnTrack: inflationAdjusted >= requiredCorpus * 0.8,
    recommendations: [
      "Consider increasing your monthly SIP by 15%",
      "Diversify your portfolio with equity mutual funds",
      "Review and optimize your insurance coverage",
      "Consider tax-saving investment options",
    ],
  }
}

export function generateInvestmentPrediction(userData) {
  const riskLevel = userData.riskTakingAbility || "Moderate"
  const investmentHorizon = userData.preferredInvestmentHorizon || "Long"
  const monthlySurplus = userData.monthlySurplus || 20000

  const allocations = {
    Low: { equity: 30, debt: 60, gold: 10 },
    Moderate: { equity: 60, debt: 30, gold: 10 },
    High: { equity: 80, debt: 15, gold: 5 },
  }

  const allocation = allocations[riskLevel] || allocations.Moderate

  return {
    riskProfile: riskLevel,
    recommendedAllocation: allocation,
    monthlyInvestment: monthlySurplus,
    expectedReturns: {
      conservative: monthlySurplus * 12 * 1.08, // 8%
      moderate: monthlySurplus * 12 * 1.12, // 12%
      aggressive: monthlySurplus * 12 * 1.15, // 15%
    },
    recommendations: [
      `Invest ${allocation.equity}% in equity mutual funds`,
      `Allocate ${allocation.debt}% to debt instruments`,
      `Keep ${allocation.gold}% in gold/commodities`,
      "Review portfolio quarterly and rebalance",
    ],
  }
}

export function generateRiskAssessment(userData) {
  const age = userData.age || 30
  const dependents = userData.numberOfDependents || 0
  const loan = userData.loan || 0
  const insurance = userData.insurance || 0
  const monthlyIncome = userData.monthlyIncome || 50000

  // Calculate risk score (0-100)
  let riskScore = 50 // Base score

  // Age factor
  if (age < 30) riskScore += 20
  else if (age < 40) riskScore += 10
  else if (age > 50) riskScore -= 15

  // Dependents factor
  riskScore -= dependents * 5

  // Loan factor
  if (loan > monthlyIncome * 24) riskScore -= 20

  // Insurance factor
  if (insurance < monthlyIncome * 12) riskScore -= 10

  riskScore = Math.max(0, Math.min(100, riskScore))

  let riskCategory = "Low"
  if (riskScore > 60) riskCategory = "High"
  else if (riskScore > 40) riskCategory = "Moderate"

  return {
    riskScore,
    riskCategory,
    factors: {
      age: age < 35 ? "Favorable" : "Moderate",
      dependents: dependents === 0 ? "Low Risk" : "Higher Risk",
      debt: loan < monthlyIncome * 12 ? "Manageable" : "High",
      insurance: insurance >= monthlyIncome * 10 ? "Adequate" : "Insufficient",
    },
    recommendations: [
      riskScore < 40 ? "Focus on capital preservation" : "Consider growth investments",
      dependents > 0 ? "Increase life insurance coverage" : "Optimize insurance costs",
      loan > monthlyIncome * 12 ? "Prioritize debt reduction" : "Maintain current debt levels",
      "Build emergency fund of 6-12 months expenses",
    ],
  }
}
