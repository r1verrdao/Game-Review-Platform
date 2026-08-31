from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from bson import ObjectId
from database import database
from models.game import GameCreate, GameResponse
from models.review import ReviewResponse
from utils.auth import get_admin_user, get_current_user

router = APIRouter()

@router.get("/", response_model=List[GameResponse])
async def get_games():
    games_collection = database.get_collection("games")
    games = await games_collection.find().to_list(1000)
    
    return [
        GameResponse(
            id=str(game["_id"]),
            title=game["title"],
            genre=game["genre"],
            difficulty=game["difficulty"],
            hardware_notes=game.get("hardware_notes"),
            description=game.get("description"),
            developer=game.get("developer"),
            release_date=game.get("release_date"),
            cover_asset=game.get("cover_asset")
        )
        for game in games
    ]

@router.post("/", response_model=GameResponse, status_code=status.HTTP_201_CREATED)
async def create_game(game_data: GameCreate, current_admin: dict = Depends(get_admin_user)):
    games_collection = database.get_collection("games")
    
    # Optional: Check if game already exists
    existing_game = await games_collection.find_one({"title": game_data.title})
    if existing_game:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="GAME ALREADY EXISTS."
        )
        
    new_game = {
        "title": game_data.title,
        "genre": game_data.genre,
        "difficulty": game_data.difficulty,
        "hardware_notes": game_data.hardware_notes,
        "description": game_data.description,
        "developer": game_data.developer,
        "release_date": game_data.release_date,
        "cover_asset": game_data.cover_asset
    }
    
    result = await games_collection.insert_one(new_game)
    created_game = await games_collection.find_one({"_id": result.inserted_id})
    
    return GameResponse(
        id=str(created_game["_id"]),
        title=created_game["title"],
        genre=created_game["genre"],
        difficulty=created_game["difficulty"],
        hardware_notes=created_game.get("hardware_notes"),
        description=created_game.get("description"),
        developer=created_game.get("developer"),
        release_date=created_game.get("release_date"),
        cover_asset=created_game.get("cover_asset")
    )

@router.get("/{id}", response_model=GameResponse)
async def get_game(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    games_collection = database.get_collection("games")
    game = await games_collection.find_one({"_id": ObjectId(id)})
    
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
        
    return GameResponse(
        id=str(game["_id"]),
        title=game["title"],
        genre=game["genre"],
        difficulty=game["difficulty"],
        hardware_notes=game.get("hardware_notes"),
        description=game.get("description"),
        developer=game.get("developer"),
        release_date=game.get("release_date"),
        cover_asset=game.get("cover_asset")
    )

@router.get("/{id}/reviews", response_model=List[ReviewResponse])
async def get_game_reviews(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    reviews_collection = database.get_collection("reviews")
    reviews_cursor = reviews_collection.find({"game_id": id}).sort("created_at", -1)
    reviews = await reviews_cursor.to_list(1000)
    
    return [
        ReviewResponse(
            id=str(review["_id"]),
            user_id=review["user_id"],
            game_id=review["game_id"],
            rating=review["rating"],
            content=review["content"],
            created_at=review["created_at"]
        )
        for review in reviews
    ]
