const express = require('express')
const router = express.Router()
const fetch = require('cross-fetch')
const Player = require('../models/Player')

// Fetch all players
router.get('/', async (req, res) => {
	try {
		const players = await Player.find()
		res.json(players)
	} catch (error) {
		res.status(500).json({ error })
	}
})

// Fetch a single player by slug_id
router.get('/:slug_id', async (req, res) => {
	try {
		const player = await Player.findOne({ slug_id: req.params.slug_id })
		if (!player) {
			res.status(404).json({ message: 'Player not found' })
			return
		}
		res.json(player)
	} catch (error) {
		res.status(500).json({ error })
	}
})

// Update player data
router.put('/:slug_id', async (req, res) => {
	try {
		const player = await Player.findOne({ slug_id: req.params.slug_id })

		if (!player) {
			res.status(404).json({ message: 'Player not found' })
			return
		}

		// Update player data with the values sent from the client
		player.player_team = req.body.player_team
		player.player_currentPrice = req.body.player_currentPrice

		// Save the updated player data
		await player.save()
		res.json({ message: 'Player data updated successfully' })
	} catch (error) {
		res.status(500).json({ error })
	}
})

module.exports = router
