Perfect — here is a **professional, clean, and submission-ready README.md** for your REST API project.

You can copy/paste this directly into your `README.md` file.
It matches **everything in your project**, including Models, Services, SQLite, API Key, Environment Variables, and Render deployment.

---

# 📘 REST API – Users Management (Express + SQLite)

A simple and clean REST API built with **Node.js**, **Express**, **SQLite**, and a full MVC structure (Models → Services → Controllers).
Includes **Environment Variables**, **API Key protection**, and **Deployment on Render**.

---

## 🚀 Features

* ✔ Express REST API
* ✔ SQLite database using **better-sqlite3**
* ✔ Proper project architecture (MVC + services + middleware)
* ✔ Environment variables using `.env`
* ✔ API Key authentication middleware
* ✔ Dynamic database initialization + seeding
* ✔ Render deployment ready
* ✔ Modular and scalable structure

---

## 📁 Project Structure

```
src/
├── config/
│   ├── config.js           # Loads environment variables
│   └── database.js         # SQLite database setup
│
├── controllers/
│   └── userController.js   # Handles HTTP requests
│
├── middleware/
│   ├── apiKey.js           # API key validation
│   └── logger.js           # Request logging
│
├── models/
│   └── User.js             # User model (schema + queries)
│
├── routes/
│   └── userRoutes.js       # Route definitions
│
├── services/
│   └── userService.js      # Business logic
│
└── index.js                # Server entry point
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the project

```bash
git clone <repository-url>
cd rest-api
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Create your `.env` file

Create a new file:

```
.env
```

Copy this inside:

```env
PORT=3000
NODE_ENV=development

DATABASE_URL=./database.sqlite

API_KEY=my-super-secret-api-key

JWT_SECRET=your-secret-key-min-32-characters
JWT_EXPIRES_IN=24h
```

⚠️ **Do NOT share this file. Do NOT commit it to Git.**

Your repo already includes `.env.example`, which is safe.

---

### 4️⃣ Start the development server

```bash
npm run dev
```

You should see:

```
🔧 Initializing database...
📝 Seeding users table...
✅ Server running on http://localhost:3000
```

---

## 🗄 Database

This project uses **SQLite** with `better-sqlite3`.

* Database file is created automatically
* Tables are created automatically
* Sample data is seeded only in development

Database file:

```
database.sqlite
```

(Automatically ignored by Git)

---

## 🔑 API Key Authentication

All `/users` routes are protected.

You must send your API key using:

### Option A — Header `X-API-Key`

```
X-API-Key: my-super-secret-api-key
```

### Option B — Authorization header

```
Authorization: Bearer my-super-secret-api-key
```

If the key is missing or invalid:

* Missing → **401 Unauthorized**
* Wrong → **403 Forbidden**

---

## 📡 API Endpoints

### 🟢 Public Routes

| Method | Endpoint  | Description     |
| ------ | --------- | --------------- |
| GET    | `/`       | Welcome message |
| GET    | `/health` | Health check    |

---

### 🔒 Protected Routes (require API key)

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/users`     | Get all users   |
| GET    | `/users/:id` | Get user by ID  |
| POST   | `/users`     | Create new user |
| PUT    | `/users/:id` | Update user     |
| DELETE | `/users/:id` | Delete user     |

### Example Request Body (POST/PUT)

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

## 🚀 Deployment (Render)

1. Push to GitHub
2. Create a **Render → Web Service**
3. Add Environment Variables:

```
PORT=3000
NODE_ENV=production
DATABASE_URL=./database.sqlite
API_KEY=your-api-key
JWT_SECRET=your-secret
JWT_EXPIRES_IN=24h
```

4. Set Build & Start commands:

```
Build:   npm install
Start:   npm start
```

5. Deploy 🎉

---

## 👤 Author

**Krishan Baragama**
REST API Project — EPITA
2025

---

## ✔ License

This project is for educational purposes.

---

# 🎉 Done!


