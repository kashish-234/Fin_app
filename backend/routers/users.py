from fastapi import APIRouter, HTTPException, Depends
from models.schemas import UserProfile, UserProfileResponse
from config.firebase_config import get_firestore_client
from datetime import datetime
from typing import List

router = APIRouter()

def get_db():
    return get_firestore_client()

@router.post("/", response_model=dict)
async def create_user_profile(profile: UserProfile, user_id: str, db=Depends(get_db)):
    """Create or update user profile"""
    try:
        if db is None:
            # Mock response for demo
            return {"message": "User profile created successfully", "user_id": user_id}
        
        profile_data = profile.dict()
        profile_data.update({
            "user_id": user_id,
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        })
        
        # Save to Firestore
        doc_ref = db.collection('users').document(user_id)
        doc_ref.set(profile_data)
        
        return {"message": "User profile created successfully", "user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}", response_model=dict)
async def get_user_profile(user_id: str, db=Depends(get_db)):
    """Get user profile by ID"""
    try:
        if db is None:
            # Mock response for demo
            return {
                "user_id": user_id,
                "name": "Demo User",
                "age": 30,
                "annual_income": 1200000,
                "monthly_income": 100000,
                "risk_taking_ability": "Moderate"
            }
        
        doc_ref = db.collection('users').document(user_id)
        doc = doc_ref.get()
        
        if doc.exists:
            return doc.to_dict()
        else:
            raise HTTPException(status_code=404, detail="User profile not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{user_id}", response_model=dict)
async def update_user_profile(user_id: str, profile: UserProfile, db=Depends(get_db)):
    """Update user profile"""
    try:
        if db is None:
            return {"message": "User profile updated successfully", "user_id": user_id}
        
        profile_data = profile.dict()
        profile_data["updated_at"] = datetime.now()
        
        doc_ref = db.collection('users').document(user_id)
        doc_ref.update(profile_data)
        
        return {"message": "User profile updated successfully", "user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{user_id}", response_model=dict)
async def delete_user_profile(user_id: str, db=Depends(get_db)):
    """Delete user profile"""
    try:
        if db is None:
            return {"message": "User profile deleted successfully", "user_id": user_id}
        
        doc_ref = db.collection('users').document(user_id)
        doc_ref.delete()
        
        return {"message": "User profile deleted successfully", "user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
