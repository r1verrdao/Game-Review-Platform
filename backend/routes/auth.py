from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext
from database import database
from models.user import UserModel, UserCreate, UserResponse

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

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
