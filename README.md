# TinyLink — URL Shortener

TinyLink is a simple URL shortening service similar to Bitly.  
Users can create short codes for long URLs, track click analytics, and manage all links through a minimal dashboard UI.

This project includes:
- URL creation with optional custom codes
- Redirect engine with click tracking
- Stats view for each short link
- REST API built with Node.js + Express
- PostgreSQL database (Neon) with Sequelize ORM
- Fully deployed on Render

---

## 🚀 Live Demo
Deployed URL: **https://tinylink-c8sb.onrender.com**  

---

## 📦 Tech Stack
- **Backend:** Node.js, Express  
- **Database:** Postgres (Neon)  
- **ORM:** Sequelize  
- **Frontend:** HTML, TailwindCSS, Vanilla JS  
- **Deployment:** Render  

---

## 📁 Folder Structure
```
src/
├─ server.js # Express app entry point
├─ db.js # Sequelize database connection
├─ models/
│ └─ Link.js # Link model
├─ routes/
│ ├─ api.js # REST API endpoints
│ └─ redirect.js # Redirect + health routes
└─ utils/
└─ validators.js # URL + code validation helpers

public/
├─ index.html # Dashboard UI
└─ code.html # Stats page UI
```

---

## 🔗 API Endpoints

### Health Check


GET /healthz


### Create Short Link


POST /api/links
Body: { "url": "...", "code": "optional" }


### Get All Links


GET /api/links


### Get Stats of a Link


GET /api/links/:code


### Delete Link


DELETE /api/links/:code


### Redirect


GET /:code
302 → original URL


---

## ⚙️ Running Locally

### 1. Clone repository


git clone <repo-url>
cd tinylink


### 2. Install dependencies


npm install


### 3. Create your `.env`


cp .env.example .env


Add:


DATABASE_URL=postgres://...
PORT=3000
BASE_URL=http://localhost:3000


### 4. Start server

npm run dev

---

## 🗄️ Database Schema

The app uses a single table called **links**:

| Field       | Type        | Description              |
|-------------|-------------|--------------------------|
| code        | STRING, PK  | Shortened code           |
| targetUrl   | TEXT        | Original URL             |
| clicks      | INTEGER     | Total redirect count     |
| lastClicked | DATE        | Last redirect timestamp  |

---

## 🎥 Demo Video
```
https://www.loom.com/share/007bb352a1cd48fb8d4068f7dd04a4a9
```
