import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from dotenv import load_dotenv
from routers import recipes

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="CookPilot API",
    description="Backend API for the CookPilot recipe management platform",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client.cookpilot_db

# Include routers
app.include_router(recipes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to CookPilot API"}

@app.get("/health")
async def health_check():
    try:
        # Check MongoDB connection
        client.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database connection failed: {str(e)}"
        )
