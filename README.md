ESMAP
ESMAP is a map-based web app for discovering nearby places and events. The server pulls data from Google Places, stores it in MongoDB, and exposes REST APIs consumed by a React client. It supports end-users, business owners, and admins with JWT-based auth, images, and event management.

Features
🗺️ Interactive map with nearby points of interest (restaurants, bars, cafes, parks, etc.).

🔄 Sync from Google Places API by user location and persist to DB.

💾 CRUD for places & reviews in MongoDB Atlas.

🎟️ Events carousel + add/manage events (business owners/admin).

👤 JWT auth with roles: user, business, admin.

📷 Image support for reviews/events (Base64 or file uploads).

Tech Stack
Client: React, Axios, Google Maps JavaScript API

Server: Node.js, Express, Mongoose, Multer, JWT

Database: MongoDB Atlas

Infra (optional): Docker & Docker Compose

Run locally
bash
Copy
Edit

# Server

cd server
npm install
npm run dev # or: npm start

# Client

cd client
npm install
npm start
Client: http://localhost:3000

API: http://localhost:5001

Tip (dev): add "proxy": "http://localhost:5001" to client/package.json and call APIs with relative paths (/api/...) to avoid CORS during development.

Run with Docker
bash
Copy
Edit
docker compose up -d --build

# client: http://localhost:3000

# server: http://localhost:5001

Environment variables
server/.env

ini
Copy
Edit
PORT=5001
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<long_random_secret>
GOOGLE_MAPS_API_KEY=<server_places_key>
CORS_ORIGIN=http://localhost:3000
client/.env (or build args)

ini
Copy
Edit
REACT_APP_API_BASE=http://localhost:5001
REACT_APP_GOOGLE_MAPS_API_KEY=<browser_maps_js_key>
Key API endpoints (examples)
Places:

GET /api/get-places – fetch all places from DB

POST /api/fetch-places – fetch from Google Places & save to DB
Body: { "lat": <number>, "lng": <number>, "radius": 3000 }

Auth:

POST /auth/register – email/password sign-up (supports role, placeName, placeLocation)

POST /auth/login – returns JWT

GET /auth/me – current user (requires Authorization: Bearer <token>)

Events (secured for business/admin):

GET /user/events, POST /user/events, …

Notes
Lock down API keys: referrer restriction for browser key, IP/hostname for server key.

Ensure place markers use numeric location.lat/lng.

If you’re not using the dev proxy, enable proper CORS on the server and use REACT_APP_API_BASE.

License
Educational / project use. Add your preferred license.
