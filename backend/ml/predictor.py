import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os
from typing import Dict, Any

class FinancialPredictor:
    def __init__(self):
        self.models = {}
        self.encoders = {}
        self.load_models()
    
    def load_models(self):
        """Load pre-trained models or initialize dummy models"""
        try:
            # In production, load actual trained models
            # For demo, we'll use dummy models with mock predictions
            self.models['retirement'] = RandomForestRegressor(n_estimators=10, random_state=42)
            self.models['investment'] = RandomForestRegressor(n_estimators=10, random_state=42)
            self.models['risk'] = RandomForestRegressor(n_estimators=10, random_state=42)
            
            # Initialize with dummy data for demo
            self._initialize_dummy_models()
        except Exception as e:
            print(f"Model loading error: {e}")
            self._initialize_dummy_models()
    
    def _initialize_dummy_models(self):
        """Initialize models with dummy data for demonstration"""
        # Create dummy training data
        np.random.seed(42)
        dummy_features = np.random.rand(100, 5)  # 5 features
        dummy_targets = np.random.rand(100)
        
        for model_name in self.models:
            self.models[model_name].fit(dummy_features, dummy_targets)
    
    def _encode_categorical_features(self, profile: Dict[str, Any]) -> np.ndarray:
        """Convert user profile to numerical features for ML model"""
        # Risk mapping
        risk_mapping = {"Low": 1, "Moderate": 2, "High": 3}
        horizon_mapping = {"Short": 1, "Medium": 2, "Long": 3}
        
        features = [
            profile.get('age', 30),
            profile.get('annual_income', 500000) / 100000,  # Normalize
            profile.get('monthly_expenses', 30000) / 10000,  # Normalize
            risk_mapping.get(profile.get('risk_taking_ability', 'Moderate'), 2),
            horizon_mapping.get(profile.get('preferred_investment_horizon', 'Medium'), 2)
        ]
        
        return np.array(features).reshape(1, -1)
    
    def predict(self, user_profile: Dict[str, Any], prediction_type: str) -> Dict[str, Any]:
        """Main prediction method"""
        if prediction_type == "retirement":
            return self.predict_retirement(user_profile)
        elif prediction_type == "investment":
            return self.predict_investment_allocation(user_profile)
        elif prediction_type == "risk_assessment":
            return self.assess_financial_risk(user_profile)
        else:
            raise ValueError(f"Unknown prediction type: {prediction_type}")
    
    def predict_retirement(self, profile: Dict[str, Any]) -> Dict[str, Any]:
        """Predict retirement planning metrics"""
        age = profile.get('age', 30)
        annual_income = profile.get('annual_income', 500000)
        monthly_surplus = profile.get('monthly_surplus', 20000)
        goal_timeline = profile.get('goal_timeline_years', 30)
        
        # Simple retirement calculation (demo logic)
        retirement_age = min(age + goal_timeline, 60)
        years_to_retirement = retirement_age - age
        
        # Estimate corpus needed (25x annual expenses)
        annual_expenses = annual_income * 0.7  # Assume 70% of current income needed
        corpus_needed = annual_expenses * 25
        
        # Calculate required SIP
        if years_to_retirement > 0:
            # Assuming 12% annual return
            monthly_sip = corpus_needed / ((((1 + 0.12/12) ** (years_to_retirement * 12)) - 1) / (0.12/12))
        else:
            monthly_sip = corpus_needed
        
        recommendations = [
            f"Start investing ₹{int(monthly_sip):,} monthly for retirement",
            "Consider increasing SIP by 10% annually",
            "Diversify across equity and debt instruments",
            "Review and rebalance portfolio annually"
        ]
        
        return {
            "corpus_needed": int(corpus_needed),
            "monthly_sip": int(monthly_sip),
            "years_to_retirement": years_to_retirement,
            "recommendations": recommendations
        }
    
    def predict_investment_allocation(self, profile: Dict[str, Any]) -> Dict[str, Any]:
        """Predict optimal investment allocation"""
        age = profile.get('age', 30)
        risk_ability = profile.get('risk_taking_ability', 'Moderate')
        investment_horizon = profile.get('preferred_investment_horizon', 'Medium')
        
        # Asset allocation based on age and risk profile
        if risk_ability == "High" and age < 35:
            equity_percent = 80
            debt_percent = 15
            gold_percent = 5
        elif risk_ability == "Moderate":
            equity_percent = 100 - age  # Age-based allocation
            debt_percent = age - 10
            gold_percent = 10
        else:  # Low risk
            equity_percent = max(30, 60 - age)
            debt_percent = min(60, 40 + age)
            gold_percent = 10
        
        # Ensure percentages add up to 100
        total = equity_percent + debt_percent + gold_percent
        equity_percent = int((equity_percent / total) * 100)
        debt_percent = int((debt_percent / total) * 100)
        gold_percent = 100 - equity_percent - debt_percent
        
        allocation = {
            "equity": equity_percent,
            "debt": debt_percent,
            "gold": gold_percent
        }
        
        # Expected returns based on allocation
        expected_annual_return = (
            equity_percent * 0.12 + 
            debt_percent * 0.07 + 
            gold_percent * 0.08
        ) / 100
        
        recommendations = [
            f"Allocate {equity_percent}% to equity for growth",
            f"Keep {debt_percent}% in debt for stability",
            f"Maintain {gold_percent}% in gold for inflation hedge",
            "Rebalance portfolio quarterly",
            "Consider tax-saving instruments"
        ]
        
        return {
            "allocation": allocation,
            "expected_returns": {
                "annual_return_percent": round(expected_annual_return * 100, 2),
                "risk_adjusted_return": round(expected_annual_return * 0.9 * 100, 2)
            },
            "risk_level": risk_ability,
            "recommendations": recommendations
        }
    
    def assess_financial_risk(self, profile: Dict[str, Any]) -> Dict[str, Any]:
        """Assess financial risk profile"""
        monthly_income = profile.get('monthly_income', 50000)
        monthly_expenses = profile.get('monthly_expenses', 30000)
        loan = profile.get('loan', 0)
        dependents = profile.get('number_of_dependents', 0)
        insurance = profile.get('insurance', 0)
        
        # Calculate risk factors
        expense_ratio = monthly_expenses / monthly_income if monthly_income > 0 else 1
        debt_to_income = (loan / 12) / monthly_income if monthly_income > 0 else 0
        insurance_coverage = insurance / (monthly_income * 12) if monthly_income > 0 else 0
        
        # Risk score calculation (0-100, higher is riskier)
        risk_score = 0
        risk_factors = []
        
        if expense_ratio > 0.8:
            risk_score += 30
            risk_factors.append("High expense-to-income ratio")
        
        if debt_to_income > 0.4:
            risk_score += 25
            risk_factors.append("High debt burden")
        
        if insurance_coverage < 5:  # Less than 5x annual income
            risk_score += 20
            risk_factors.append("Insufficient insurance coverage")
        
        if dependents > 2:
            risk_score += 15
            risk_factors.append("Multiple dependents")
        
        if monthly_income - monthly_expenses < 10000:
            risk_score += 10
            risk_factors.append("Low savings capacity")
        
        # Risk category
        if risk_score < 20:
            risk_category = "Low Risk"
        elif risk_score < 50:
            risk_category = "Moderate Risk"
        else:
            risk_category = "High Risk"
        
        mitigation_strategies = [
            "Build emergency fund of 6-12 months expenses",
            "Increase insurance coverage to 10x annual income",
            "Reduce unnecessary expenses",
            "Consider additional income sources",
            "Pay down high-interest debt first"
        ]
        
        return {
            "risk_score": min(risk_score, 100),
            "risk_category": risk_category,
            "risk_factors": risk_factors,
            "mitigation_strategies": mitigation_strategies
        }
