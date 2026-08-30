import asyncio
from database import database
from utils.auth import get_password_hash

async def create_admin():
    users_collection = database.get_collection("users")
    
    email = "admin@critique.db"
    password = "adminpassword123"
    
    # Check if admin already exists
    existing_admin = await users_collection.find_one({"email": email})
    if existing_admin:
        print(f"Admin user {email} already exists!")
        return
        
    hashed_password = get_password_hash(password)
    
    admin_user = {
        "email": email,
        "hashed_password": hashed_password,
        "role": "Admin"
    }
    
    await users_collection.insert_one(admin_user)
    print(f"Successfully created admin user: {email} with password: {password}")

if __name__ == "__main__":
    asyncio.run(create_admin())
