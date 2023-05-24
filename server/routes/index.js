const express = require('express')
const router = express.Router()
const fetch = require('cross-fetch')
const Player = require('../models/Player')

router.get('/', async (req, res) => {
	fetch(process.env.SHEET_URL)
		.then((response) => response.json())
		.then((players) => {
			try {
				Player.deleteMany({})
					.then(() => {
						const transformedPlayers = players.data.map((player, index) => {
							return {
								slug_id: index,
								player_name: player.player,
								player_stats: {
									matches: player.matches,
									runs: player.runs,
									average: player.average,
									strike_rate: player.strike_rate,
									wickets: player.wickets,
									economy: player.economy,
								},
								player_basePrice: player.base_price,
								player_currentPrice: null,
								player_team: null,
								player_role: player.role,
								player_video: player.video,
							}
						})

						Player.insertMany(transformedPlayers)
							.then(() => {
								res.json({ message: 'success' })
							})
							.catch((error) => {
								res.status(500).json({ error })
							})
					})
					.catch((error) => {
						res.status(500).json({ error })
					})
			} catch (error) {
				res.status(500).json({ error })
			}
		})
})

module.exports = router
