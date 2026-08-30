import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load env variables (for local development)
load_dotenv()

# We will use the MONGODB_URI provided in atlas-credentials.env
# which the user has placed in the backend folder or system env
MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI is not set in environment variables")

client = AsyncIOMotorClient(MONGODB_URI)
database = client.get_database("game_review_platform")
