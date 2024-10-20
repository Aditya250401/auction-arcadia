const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
	slug_id: {
		type: Number,
	},
	player_name: {
		type: String,
	},
	player_stats: {
		type: {
			matches: String,
			runs: Number,
			average: Number,
			strike_rate: Number,
			wickets: String,
			economy: String,
		},
	},
	player_basePrice: {
		type: String,
	},
	player_currentPrice: {
		type: String,
	},
	player_team: {
		type: String,
	},
	player_role: {
		type: String,
	},
	player_video: {
		type: String,
	},
	player_sold: {
		type: Boolean,
		default: false,
	},
})

module.exports = mongoose.model('Player', playerSchema)
