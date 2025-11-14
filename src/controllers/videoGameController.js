import * as videoGameService from '../services/videoGameService.js'

// Get all games
export const getAllGames = (req, res) => {
	try {
		const games = videoGameService.getAllGames()
		res.status(200).json(games)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get game by ID
export const getGameById = (req, res) => {
	try {
		const { id } = req.params
		const game = videoGameService.getGameById(id)
		
		if (!game) {
			return res.status(404).json({ message: 'Game not found' })
		}
		
		res.status(200).json(game)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new game
export const createGame = (req, res) => {
	try {
		const { title, genre, platform, releaseYear, rating, price } = req.body
		
		if (!title || !platform) {
			return res.status(400).json({ message: 'Title and platform are required' })
		}
		
		const newGame = videoGameService.createGame({
			title,
			genre,
			platform,
			releaseYear,
			rating,
			price
		})
		
		res.status(201).json(newGame)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Update game
export const updateGame = (req, res) => {
	try {
		const { id } = req.params
		const { title, genre, platform, releaseYear, rating, price } = req.body
		
		const updatedGame = videoGameService.updateGame(id, {
			title,
			genre,
			platform,
			releaseYear,
			rating,
			price
		})
		
		if (!updatedGame) {
			return res.status(404).json({ message: 'Game not found' })
		}
		
		res.status(200).json(updatedGame)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Delete game
export const deleteGame = (req, res) => {
	try {
		const { id } = req.params
		const deleted = videoGameService.deleteGame(id)
		
		if (!deleted) {
			return res.status(404).json({ message: 'Game not found' })
		}
		
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
