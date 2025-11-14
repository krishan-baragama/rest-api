import db from '../config/database.js'

class VideoGame {
	static tableName = 'video_games'
	
	// Create table
	static createTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS ${this.tableName} (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				title TEXT NOT NULL,
				genre TEXT,
				platform TEXT,
				release_year INTEGER,
				rating REAL,
				price REAL,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
				updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
			)
		`
		db.exec(sql)
		console.log(`✅ Table '${this.tableName}' created/verified`)
	}
	
	static findAll() {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id`)
		return stmt.all()
	}
	
	static findById(id) {
		const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
		return stmt.get(id)
	}
	
	static create(gameData) {
		const { title, genre, platform, releaseYear, rating, price } = gameData
		const stmt = db.prepare(`
			INSERT INTO ${this.tableName} (title, genre, platform, release_year, rating, price)
			VALUES (?, ?, ?, ?, ?, ?)
		`)
		const result = stmt.run(
			title,
			genre ?? null,
			platform ?? null,
			releaseYear ?? null,
			rating ?? null,
			price ?? null
		)
		return this.findById(result.lastInsertRowid)
	}
	
	static update(id, gameData) {
		const { title, genre, platform, releaseYear, rating, price } = gameData
		
		const updates = []
		const values = []
		
		if (title !== undefined) {
			updates.push('title = ?')
			values.push(title)
		}
		if (genre !== undefined) {
			updates.push('genre = ?')
			values.push(genre)
		}
		if (platform !== undefined) {
			updates.push('platform = ?')
			values.push(platform)
		}
		if (releaseYear !== undefined) {
			updates.push('release_year = ?')
			values.push(releaseYear)
		}
		if (rating !== undefined) {
			updates.push('rating = ?')
			values.push(rating)
		}
		if (price !== undefined) {
			updates.push('price = ?')
			values.push(price)
		}
		
		updates.push('updated_at = CURRENT_TIMESTAMP')
		
		if (updates.length === 1) {
			return this.findById(id)
		}
		
		values.push(id)
		
		const stmt = db.prepare(`
			UPDATE ${this.tableName}
			SET ${updates.join(', ')}
			WHERE id = ?
		`)
		
		stmt.run(...values)
		return this.findById(id)
	}
	
	static delete(id) {
		const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
		const result = stmt.run(id)
		return result.changes > 0
	}
	
	static count() {
		const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
		return stmt.get().count
	}
	
	static seed() {
		const count = this.count()
		if (count === 0) {
			console.log('📝 Seeding video_games table...')
			
			const sampleGames = [
				{ title: 'The Legend of Zelda: Breath of the Wild', genre: 'Action-Adventure', platform: 'Nintendo Switch', releaseYear: 2017, rating: 9.8, price: 59.99 },
				{ title: 'Elden Ring', genre: 'Action RPG', platform: 'PC', releaseYear: 2022, rating: 9.5, price: 59.99 },
				{ title: 'Minecraft', genre: 'Sandbox', platform: 'Multi-platform', releaseYear: 2011, rating: 9.0, price: 26.95 },
				{ title: 'FIFA 24', genre: 'Sports', platform: 'PlayStation 5', releaseYear: 2023, rating: 8.2, price: 69.99 }
			]
			
			sampleGames.forEach(game => this.create(game))
			console.log(`✅ Seeded ${sampleGames.length} video games`)
		}
	}
}

export default VideoGame
