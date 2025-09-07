from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserProfile(BaseModel):
    name: str
    age: int
    gender: str
    occupation: str
    marital_status: str = Field(alias="maritalStatus")
    number_of_dependents: int = Field(alias="numberOfDependents")
    annual_income: int = Field(alias="annualIncome")
    monthly_income: int = Field(alias="monthlyIncome")
    monthly_expenses: int = Field(alias="monthlyExpenses")
    current_net_worth: int = Field(alias="currentNetWorth")
    invested_asset: int = Field(alias="investedAsset")
    risk_taking_ability: str = Field(alias="riskTakingAbility")
    preferred_investment_horizon: str = Field(alias="preferredInvestmentHorizon")
    primary_financial_goal: str = Field(alias="primaryFinancialGoal")
    goal_timeline_years: int = Field(alias="goalTimelineYears")
    monthly_surplus: int = Field(alias="monthlySurplus")
    starting_principal: int = Field(alias="startingPrincipal")
    liquidity_preference: str = Field(alias="liquidityPreference")
    loan: int
    insurance: int

    class Config:
        allow_population_by_field_name = True

class UserProfileResponse(UserProfile):
    user_id: str
    created_at: datetime
    updated_at: datetime

class FinanceRecord(BaseModel):
    user_id: str
    transaction_type: str  # income, expense, investment
    amount: float
    category: str
    description: Optional[str] = None
    date: datetime

class FinanceRecordResponse(FinanceRecord):
    id: str
    created_at: datetime

class PredictionRequest(BaseModel):
    user_profile: UserProfile
    prediction_type: str  # retirement, investment, risk_assessment

class PredictionResponse(BaseModel):
    prediction_type: str
    recommendations: list[str]
    risk_score: float
    projected_returns: dict
    investment_allocation: dict
    confidence_score: float
    generated_at: datetime
