from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from datetime import datetime, timezone
from database import database
from models.review import ReviewCreate, ReviewResponse
from utils.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
async def create_review(review_data: ReviewCreate, current_user: dict = Depends(get_current_user)):
    # Validate game exists
    if not ObjectId.is_valid(review_data.game_id):
        raise HTTPException(status_code=400, detail="Invalid game ID format")
        
    games_collection = database.get_collection("games")
    game = await games_collection.find_one({"_id": ObjectId(review_data.game_id)})
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
        
    reviews_collection = database.get_collection("reviews")
    
    # Store email as the user identifier to display nicely in the logs
    username = current_user.get("email", "unknown_user").split("@")[0].upper()
    
    new_review = {
        "user_id": username,
        "game_id": review_data.game_id,
        "rating": review_data.rating,
        "content": review_data.content,
        "created_at": datetime.now(timezone.utc)
    }
    
    result = await reviews_collection.insert_one(new_review)
    created_review = await reviews_collection.find_one({"_id": result.inserted_id})
    
    return ReviewResponse(
        id=str(created_review["_id"]),
        user_id=created_review["user_id"],
        game_id=created_review["game_id"],
        rating=created_review["rating"],
        content=created_review["content"],
        created_at=created_review["created_at"]
    )
