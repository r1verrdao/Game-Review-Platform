# Game Review Platform (GRP)

Welcome to the Game Review Platform. This application allows gamers to browse game catalogs, view hardware compatibility notes, write and read reviews, and manage their profiles. Administrators can manage the game catalog and hardware notes.

## Architecture Summary
The application follows a modern client-server architecture:
- **Frontend**: React (Single Page Application)
- **Backend**: Python (e.g., FastAPI)
- **Database**: MongoDB Atlas (Cloud)
- **Deployment**: Amazon EC2

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js & npm
- MongoDB Atlas account (with `atlas-credentials.env` downloaded)
- `uv` package manager for Python (optional but recommended)

### Environment Variables
Place your `atlas-credentials.env` (or a `.env` file) in the `backend` directory so the backend server can connect to your MongoDB cluster. It should contain at least:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/"
```

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Initialize environment and install dependencies (e.g., `uv init`, `uv add fastapi motor`)
3. Run the development server.

### Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Known Limitations
- *To be updated during development...* (e.g., Currently, the application does not support image uploads for game covers or user avatars).

## Deployment URL
- **Production URL**: *[TBD - Insert EC2 public URL here upon deployment]*
