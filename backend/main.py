from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, finance, predictions
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Finance App API",
    description="FastAPI backend for finance application with ML predictions",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(finance.router, prefix="/api/finance", tags=["finance"])
app.include_router(predictions.router, prefix="/api/predict", tags=["predictions"])

@app.get("/")
async def root():
    return {"message": "Finance App API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
