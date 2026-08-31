import asyncio
from database import database

async def seed_games():
    games_collection = database.get_collection("games")
    
    # Delete existing games to avoid duplicates or messy UI for this test
    await games_collection.delete_many({})
    print("Cleared existing games.")
    
    # Insert 3 specific games matching the Figma design
    games = [
        {
            "title": "ELDEN RING",
            "genre": "RPG, ACTION",
            "difficulty": "Hard",
            "hardware_notes": "Requires controller."
        },
        {
            "title": "BLOODBORNE",
            "genre": "SOULSLIKE, HORROR",
            "difficulty": "Very Hard",
            "hardware_notes": "PS4 Controller recommended."
        },
        {
            "title": "HOLLOW KNIGHT",
            "genre": "METROIDVANIA, INDIE",
            "difficulty": "Hard",
            "hardware_notes": "Keyboard or Controller."
        }
    ]
    
    await games_collection.insert_many(games)
    print("Successfully seeded ELDEN RING, HOLLOW KNIGHT, and BLOODBORNE.")

if __name__ == "__main__":
    asyncio.run(seed_games())
