import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load env variables (for local development)
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI is not set in environment variables")

client = AsyncIOMotorClient(MONGODB_URI)
database = client.get_database("game_review_platform")
