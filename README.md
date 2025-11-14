

# 📘 REST API – Users & Video Games (Express + SQLite)

A complete REST API built using **Node.js**, **Express**, **SQLite**, **Environment Variables**, and a **full MVC architecture**.

The API supports two resources:

* 👤 **Users**
* 🎮 **Video Games** ← *your custom resource (Your Turn!)*

Includes API key protection and deployment on Render.

---

## 🚀 Features

* ✔ Express REST API
* ✔ SQLite database (`better-sqlite3`)
* ✔ MVC + Services + Middleware
* ✔ Environment variables via `.env`
* ✔ API Key authentication
* ✔ Request logging middleware
* ✔ Auto-create & seed database
* ✔ Fully deployed on Render
* ✔ Two full resource modules (Users + Video Games)

---

## 📁 Project Structure

```
src/
├── config/
│   ├── config.js              # Loads environment variables
│   └── database.js            # SQLite database setup + seeding
│
├── controllers/
│   ├── userController.js
│   └── videoGameController.js   ← NEW
│
├── middleware/
│   ├── apiKey.js
│   └── logger.js
│
├── models/
│   ├── User.js
│   └── VideoGame.js            ← NEW
│
├── routes/
│   ├── userRoutes.js
│   └── videoGameRoutes.js      ← NEW
│
├── services/
│   ├── userService.js
│   └── videoGameService.js     ← NEW
│
└── index.js                    # Server entry point
```

---

## 🔧 Installation

### 1️⃣ Clone the project

```bash
git clone <repo-url>
cd rest-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create **`.env`** in project root:

```env
PORT=3000
NODE_ENV=development

DATABASE_URL=./database.sqlite

API_KEY=my-secret-api-key

JWT_SECRET=super-secret-32-characters-min
JWT_EXPIRES_IN=24h
```

Do NOT commit `.env`.

`.env.example` is included as a safe template.

---

## ▶ Running the API

```bash
npm run dev
```

If database is empty, it will automatically:

* Create tables (`users`, `video_games`)
* Insert sample data (development only)

---

## 🗄 Database

SQLite file:

```
database.sqlite
```

Automatically created on first run.

Ignored by Git.

---

## 🔑 API Key Protection

All `/users` and `/games` routes are protected.

You must send:

### Option A — Header

```
X-API-Key: my-secret-api-key
```

### Option B — Authorization

```
Authorization: Bearer my-secret-api-key
```

Errors:

* Missing key → **401 Unauthorized**
* Wrong key → **403 Forbidden**

---

# 📡 API Endpoints

---

# 🟢 Public Endpoints

| Method | Endpoint  | Description  |
| ------ | --------- | ------------ |
| GET    | `/`       | Welcome      |
| GET    | `/health` | Health check |

---

# 🔵 USERS (Protected)

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/users`     | Get all users  |
| GET    | `/users/:id` | Get user by ID |
| POST   | `/users`     | Create user    |
| PUT    | `/users/:id` | Update user    |
| DELETE | `/users/:id` | Delete user    |

### Example user JSON

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

# 🟣 VIDEO GAMES (Protected)

*(Your custom resource!)*

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/games`     | Get all games  |
| GET    | `/games/:id` | Get game by ID |
| POST   | `/games`     | Create game    |
| PUT    | `/games/:id` | Update game    |
| DELETE | `/games/:id` | Delete game    |

### Example game JSON

```json
{
  "title": "Elden Ring",
  "genre": "Action RPG",
  "platform": "PC",
  "releaseYear": 2022,
  "rating": 9.5,
  "price": 59.99
}
```

---

# 🌍 Deployment (Render)

1. Connect GitHub repository
2. Create a **Web Service**
3. Add Environment Variables:

```
PORT=3000
NODE_ENV=production
DATABASE_URL=./database.sqlite
API_KEY=your-api-key
JWT_SECRET=your-secret
JWT_EXPIRES_IN=24h
```

4. Set build commands:

```
Build: npm install
Start: npm start
```

5. Deploy 🎉

---

## 👤 Author

**Krishan Baragama**
EPITA – REST API Project (2025)

---

## 📝 License

For educational use.

---

# 🎉 Done

