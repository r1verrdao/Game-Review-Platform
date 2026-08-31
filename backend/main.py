from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, games, reviews

app = FastAPI(title="Game Review Platform API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"], # React typical ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(games.router, prefix="/api/games", tags=["Games"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["Reviews"])

@app.get("/")
async def root():
    return {"message": "Welcome to Game Review Platform API"}
