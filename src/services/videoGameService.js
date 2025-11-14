import VideoGame from '../models/VideoGame.js'

// Get all video games
export const getAllGames = () => {
	return VideoGame.findAll()
}

// Get game by ID
export const getGameById = (id) => {
	return VideoGame.findById(id)
}

// Create new game
export const createGame = (gameData) => {
	const { title, platform } = gameData
	
	if (!title || !platform) {
		throw new Error('Title and platform are required')
	}
	
	return VideoGame.create(gameData)
}

// Update game
export const updateGame = (id, gameData) => {
	const existing = VideoGame.findById(id)
	if (!existing) {
		return null
	}
	return VideoGame.update(id, gameData)
}

// Delete game
export const deleteGame = (id) => {
	return VideoGame.delete(id)
}
