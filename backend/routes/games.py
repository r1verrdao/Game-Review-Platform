from fastapi import APIRouter, Depends, HTTPException, status
from database import database
from models.game import GameCreate, GameResponse
from utils.auth import get_admin_user

router = APIRouter()

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
        "hardware_notes": game_data.hardware_notes
    }
    
    result = await games_collection.insert_one(new_game)
    created_game = await games_collection.find_one({"_id": result.inserted_id})
    
    return GameResponse(
        id=str(created_game["_id"]),
        title=created_game["title"],
        genre=created_game["genre"],
        difficulty=created_game["difficulty"],
        hardware_notes=created_game.get("hardware_notes")
    )
