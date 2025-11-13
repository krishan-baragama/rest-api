import { logMiddleware } from "./middleware/middleware.js"
import express from "express"


const app = express()
app.use(express.json())

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Dave" },
]

app.get("/", logMiddleware, (req, res) => {
    res.json({ users})
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
