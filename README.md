# CRITIQUE.DB (Game Review Platform)

Welcome to **CRITIQUE.DB**, a fully-functional Game Review Platform built with a modern cyber-terminal aesthetic. Users can browse a catalog of games, register, login, and submit their own star ratings and written reviews.

## Deployment URL
The application is deployed on an AWS EC2 instance.
**Live Demo:** [http://3.106.247.216:3000](http://3.106.247.216:3000)

---

## Architecture Summary

This project follows a standard modern Client-Server web architecture, separated into a distinct Frontend, Backend, and Cloud Database.

### 1. Frontend (Client)
- **Framework:** React.js (Create React App)
- **Styling:** TailwindCSS
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API (for Authentication state)
- **API Communication:** Axios (with interceptors to automatically attach JWT tokens)
- **Design:** A custom, responsive "Hacker/Terminal" aesthetic with distinct neon green and dark grey motifs.

### 2. Backend (Server)
- **Framework:** FastAPI (Python)
- **Authentication:** JWT (JSON Web Tokens) using `pyjwt` and password hashing via `passlib[bcrypt]`.
- **Server:** Uvicorn (ASGI web server)
- **Features:** 
  - RESTful endpoints (`/api/auth`, `/api/games`, `/api/reviews`)
  - Input validation using Pydantic schemas.
  - Dependency injection for route protection (ensuring only logged-in users can post reviews).

### 3. Database (Storage)
- **Database:** MongoDB (hosted on MongoDB Atlas)
- **Collections:** `users`, `games`, `reviews`. Data is strictly persistent and relationships are handled via `game_id` and `user_id` object references.

---

## Local Setup Instructions

### Prerequisites
- Node.js (v16+) & npm
- Python 3.10+
- A MongoDB Atlas connection string.

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables:
   Create a `.env` file in the `backend/` directory with the following contents:
   ```env
   MONGO_URI="your-mongodb-atlas-connection-string"
   JWT_SECRET="your-super-secret-key"
   ```
5. Run the development server:
   ```bash
   uvicorn main:app --reload --port 5001
   ```
   *(The backend API will run at http://localhost:5001)*

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   *(The React app will automatically open at http://localhost:3000)*

---

## Known Limitations

Due to the scoped nature of this release, the following limitations exist:
1. **No Admin Panel UI:** While the API supports an endpoint for creating games, there is currently no graphical user interface (Admin Dashboard) built for it. Games in the database were created via direct API calls (e.g., Postman or Swagger UI).
2. **No Image Uploads:** The application does not handle multipart form data or cloud bucket storage (like AWS S3) for images. Game cover assets are currently loaded via direct external image URLs.
3. **No Pagination:** The list of games on the homepage and the list of reviews on the Game Details page fetch all records at once (up to a 1000 limit). Pagination or infinite scrolling is not yet implemented.
4. **Basic Hardware Notes:** The hardware compatibility notes are stored as plain text. Rich text formatting (markdown, bolding, lists) is not supported in the current iteration.
5. **No Password Reset:** Users who forget their password cannot currently reset it, as email integration (SMTP) is not implemented.

## Test account
- Account 1: 
Email: admin@critique.db
Password: adminpassword123