from fastapi import APIRouter, HTTPException, status
from database import database
from models.user import UserModel, UserCreate, UserResponse, UserLogin, TokenResponse
from utils.auth import get_password_hash, verify_password, create_access_token

router = APIRouter()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate):
    users_collection = database.get_collection("users")
    
    # Check if email exists
    existing_user = await users_collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="THIS EMAIL IS ALREADY REGISTERED."
        )
    
    # Validation is already handled by Pydantic min_length=8
    
    # Hash password
    hashed_password = get_password_hash(user_data.password)
    
    # Create user document
    new_user = {
        "email": user_data.email,
        "hashed_password": hashed_password,
        "role": "Gamer"
    }
    
    # Insert to db
    result = await users_collection.insert_one(new_user)
    
    # Prepare response
    created_user = await users_collection.find_one({"_id": result.inserted_id})
    
    # Map _id to id for the response model
    return UserResponse(
        id=str(created_user["_id"]),
        email=created_user["email"],
        role=created_user["role"]
    )

@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    users_collection = database.get_collection("users")
    
    user = await users_collection.find_one({"email": user_data.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="INVALID EMAIL OR PASSWORD."
        )
        
    if not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="INVALID EMAIL OR PASSWORD."
        )
        
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"], "id": str(user["_id"])}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
