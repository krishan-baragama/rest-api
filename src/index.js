import express from "express"
import { logMiddleware } from "./middleware/logger.js"
import {
	getAllUsers,
	getUserById,
	createUser,
} from "./controllers/userController.js"

const app = express()
const PORT = 3000

// middleware
app.use(express.json())
app.use(logMiddleware) // log every request

// routes using controllers
app.get("/users", getAllUsers)
app.get("/users/:id", getUserById)
app.post("/users", createUser)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
