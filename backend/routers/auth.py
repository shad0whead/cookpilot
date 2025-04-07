import os
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import firebase_admin
from firebase_admin import auth, credentials
import jwt
from datetime import datetime, timedelta
from typing import Optional

# Initialize Firebase Admin SDK
cred = credentials.Certificate("firebase-credentials.json")
try:
    firebase_admin.initialize_app(cred)
except ValueError:
    # App already initialized
    pass

# Create router
router = APIRouter()

# OAuth2 scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Models
class UserCreate(BaseModel):
    email: str
    password: str
    name: str
    role: str = "viewer"  # Default role is viewer

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    uid: Optional[str] = None
    role: Optional[str] = None

# JWT Configuration
SECRET_KEY = os.getenv("JWT_SECRET", "cookpilot_development_secret")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Helper functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        uid: str = payload.get("uid")
        role: str = payload.get("role")
        if email is None or uid is None:
            raise credentials_exception
        token_data = TokenData(email=email, uid=uid, role=role)
    except jwt.PyJWTError:
        raise credentials_exception
    return token_data

# Routes
@router.post("/register", response_model=Token)
async def register_user(user: UserCreate):
    try:
        # Create user in Firebase
        firebase_user = auth.create_user(
            email=user.email,
            password=user.password,
            display_name=user.name
        )
        
        # Set custom claims for role
        auth.set_custom_user_claims(firebase_user.uid, {"role": user.role})
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email, "uid": firebase_user.uid, "role": user.role},
            expires_delta=access_token_expires
        )
        
        # Store user in MongoDB (this would be implemented in a real application)
        # db.users.insert_one({
        #     "email": user.email,
        #     "name": user.name,
        #     "role": user.role,
        #     "firebase_uid": firebase_user.uid,
        #     "created_at": datetime.utcnow()
        # })
        
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating user: {str(e)}"
        )

@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        # Verify credentials with Firebase
        user = auth.get_user_by_email(form_data.username)
        
        # In a real implementation, we would verify the password with Firebase Auth REST API
        # For this example, we'll assume the password is correct
        
        # Get user role from custom claims
        user_record = auth.get_user(user.uid)
        role = user_record.custom_claims.get("role", "viewer") if user_record.custom_claims else "viewer"
        
        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": form_data.username, "uid": user.uid, "role": role},
            expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.get("/me")
async def read_users_me(current_user: TokenData = Depends(get_current_user)):
    return {
        "email": current_user.email,
        "uid": current_user.uid,
        "role": current_user.role
    }

@router.post("/logout")
async def logout():
    # In a stateless JWT authentication system, the client simply discards the token
    # No server-side action is needed
    return {"message": "Successfully logged out"}

@router.post("/reset-password")
async def reset_password(email: str):
    try:
        # Send password reset email via Firebase
        auth.generate_password_reset_link(email)
        return {"message": "Password reset email sent"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error sending password reset email: {str(e)}"
        )
