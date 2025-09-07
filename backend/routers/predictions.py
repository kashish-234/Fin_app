from fastapi import APIRouter, HTTPException
from models.schemas import PredictionRequest, PredictionResponse, UserProfile
from ml.predictor import FinancialPredictor
from datetime import datetime

router = APIRouter()

# Initialize ML predictor
predictor = FinancialPredictor()

@router.post("/", response_model=PredictionResponse)
async def get_financial_prediction(request: PredictionRequest):
    """Get ML-based financial predictions"""
    try:
        # Get prediction from ML model
        prediction_result = predictor.predict(
            user_profile=request.user_profile.dict(),
            prediction_type=request.prediction_type
        )
        
        return PredictionResponse(
            prediction_type=request.prediction_type,
            recommendations=prediction_result["recommendations"],
            risk_score=prediction_result["risk_score"],
            projected_returns=prediction_result["projected_returns"],
            investment_allocation=prediction_result["investment_allocation"],
            confidence_score=prediction_result["confidence_score"],
            generated_at=datetime.now()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@router.post("/retirement")
async def get_retirement_prediction(user_profile: UserProfile):
    """Get retirement planning predictions"""
    try:
        prediction_result = predictor.predict_retirement(user_profile.dict())
        return {
            "prediction_type": "retirement",
            "retirement_corpus_needed": prediction_result["corpus_needed"],
            "monthly_sip_required": prediction_result["monthly_sip"],
            "years_to_retirement": prediction_result["years_to_retirement"],
            "recommendations": prediction_result["recommendations"],
            "generated_at": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/investment")
async def get_investment_recommendation(user_profile: UserProfile):
    """Get investment allocation recommendations"""
    try:
        prediction_result = predictor.predict_investment_allocation(user_profile.dict())
        return {
            "prediction_type": "investment",
            "allocation": prediction_result["allocation"],
            "expected_returns": prediction_result["expected_returns"],
            "risk_level": prediction_result["risk_level"],
            "recommendations": prediction_result["recommendations"],
            "generated_at": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/risk-assessment")
async def get_risk_assessment(user_profile: UserProfile):
    """Get financial risk assessment"""
    try:
        prediction_result = predictor.assess_financial_risk(user_profile.dict())
        return {
            "prediction_type": "risk_assessment",
            "risk_score": prediction_result["risk_score"],
            "risk_category": prediction_result["risk_category"],
            "risk_factors": prediction_result["risk_factors"],
            "mitigation_strategies": prediction_result["mitigation_strategies"],
            "generated_at": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
