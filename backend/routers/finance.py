from fastapi import APIRouter, HTTPException, Depends, Query
from models.schemas import FinanceRecord, FinanceRecordResponse
from config.firebase_config import get_firestore_client
from datetime import datetime
from typing import List, Optional
import uuid

router = APIRouter()

def get_db():
    return get_firestore_client()

@router.post("/", response_model=dict)
async def create_finance_record(record: FinanceRecord, db=Depends(get_db)):
    """Create a new finance record"""
    try:
        if db is None:
            # Mock response for demo
            return {"message": "Finance record created successfully", "id": str(uuid.uuid4())}
        
        record_data = record.dict()
        record_data.update({
            "id": str(uuid.uuid4()),
            "created_at": datetime.now()
        })
        
        # Save to Firestore
        doc_ref = db.collection('finance_records').document(record_data["id"])
        doc_ref.set(record_data)
        
        return {"message": "Finance record created successfully", "id": record_data["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}", response_model=List[dict])
async def get_user_finance_records(
    user_id: str, 
    transaction_type: Optional[str] = Query(None),
    limit: int = Query(100, le=1000),
    db=Depends(get_db)
):
    """Get finance records for a user"""
    try:
        if db is None:
            # Mock response for demo
            return [
                {
                    "id": "1",
                    "user_id": user_id,
                    "transaction_type": "income",
                    "amount": 100000,
                    "category": "salary",
                    "description": "Monthly salary",
                    "date": datetime.now().isoformat(),
                    "created_at": datetime.now().isoformat()
                },
                {
                    "id": "2",
                    "user_id": user_id,
                    "transaction_type": "expense",
                    "amount": 25000,
                    "category": "rent",
                    "description": "Monthly rent",
                    "date": datetime.now().isoformat(),
                    "created_at": datetime.now().isoformat()
                }
            ]
        
        query = db.collection('finance_records').where('user_id', '==', user_id)
        
        if transaction_type:
            query = query.where('transaction_type', '==', transaction_type)
        
        query = query.limit(limit)
        docs = query.stream()
        
        records = []
        for doc in docs:
            record = doc.to_dict()
            records.append(record)
        
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{record_id}", response_model=dict)
async def get_finance_record(record_id: str, db=Depends(get_db)):
    """Get a specific finance record"""
    try:
        if db is None:
            return {
                "id": record_id,
                "transaction_type": "income",
                "amount": 50000,
                "category": "investment",
                "description": "Stock dividend"
            }
        
        doc_ref = db.collection('finance_records').document(record_id)
        doc = doc_ref.get()
        
        if doc.exists:
            return doc.to_dict()
        else:
            raise HTTPException(status_code=404, detail="Finance record not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{record_id}", response_model=dict)
async def update_finance_record(record_id: str, record: FinanceRecord, db=Depends(get_db)):
    """Update a finance record"""
    try:
        if db is None:
            return {"message": "Finance record updated successfully", "id": record_id}
        
        record_data = record.dict()
        record_data["updated_at"] = datetime.now()
        
        doc_ref = db.collection('finance_records').document(record_id)
        doc_ref.update(record_data)
        
        return {"message": "Finance record updated successfully", "id": record_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{record_id}", response_model=dict)
async def delete_finance_record(record_id: str, db=Depends(get_db)):
    """Delete a finance record"""
    try:
        if db is None:
            return {"message": "Finance record deleted successfully", "id": record_id}
        
        doc_ref = db.collection('finance_records').document(record_id)
        doc_ref.delete()
        
        return {"message": "Finance record deleted successfully", "id": record_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
