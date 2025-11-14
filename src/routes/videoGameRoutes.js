import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as videoGameController from "../controllers/videoGameController.js"

const router = express.Router()

router.get("/", logMiddleware, videoGameController.getAllGames)  // GET /games
router.get("/:id", videoGameController.getGameById)              // GET /games/:id
router.post("/", videoGameController.createGame)                 // POST /games
router.put("/:id", videoGameController.updateGame)               // PUT /games/:id
router.delete("/:id", videoGameController.deleteGame)            // DELETE /games/:id

export default router
