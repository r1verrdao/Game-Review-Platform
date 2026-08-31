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
            "genre": "[RPG] [ACTION] [INDEX: EXTREME]",
            "difficulty": "Hard",
            "hardware_notes": ">\n[CONFIG_OPTIMIZATION] Optimal vibration setup for Flydigi Direwolf controller detected.\n\n> > Enable haptic feedback in Steam Input.\n> > Calibrate deadzones: L_STICK 0.05, R_STICK 0.05.\n\nSTATUS: READY // V_1.04",
            "description": "The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
            "developer": "FROMSOFTWARE",
            "release_date": "2022",
            "cover_asset": "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcXms5kMI2N1cmw7.png"
        },
        {
            "title": "BLOODBORNE",
            "genre": "[SOULSLIKE] [HORROR]",
            "difficulty": "Very Hard",
            "hardware_notes": "PS4 Controller recommended.",
            "description": "Hunt your nightmares as you search for answers in the ancient city of Yharnam, now cursed with a strange endemic illness spreading through the streets like wildfire.",
            "developer": "FROMSOFTWARE",
            "release_date": "2015",
            "cover_asset": "https://image.api.playstation.com/vulcan/img/rnd/202010/2614/FzHAYh70c1DkQ0g2X7p6Nf3Y.jpg"
        },
        {
            "title": "HOLLOW KNIGHT",
            "genre": "[METROIDVANIA] [INDIE]",
            "difficulty": "Hard",
            "hardware_notes": "Keyboard or Controller.",
            "description": "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
            "developer": "TEAM CHERRY",
            "release_date": "2017",
            "cover_asset": "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg"
        }
    ]
    
    await games_collection.insert_many(games)
    print("Successfully seeded ELDEN RING, HOLLOW KNIGHT, and BLOODBORNE.")

if __name__ == "__main__":
    asyncio.run(seed_games())
