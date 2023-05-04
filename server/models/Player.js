const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema({
	player: {
		type: String,
	},
	team: {
		type: String,
	},
	role: {
		type: String,
	},
	matches: {
		type: String,
	},
	runs: {
		type: String,
	},
	wickets: {
		type: String,
	},
	average: {
		type: String,
	},
	strike_rate: {
		type: String,
	},
	economy: {
		type: String,
	},
	base_price: {
		type: String,
	},
	video: {
		type: String,
	},
	FP: {
		type: Boolean,
	},
	Selected: {
		type: Boolean,
	},
	slug_id: {
		type: Number,
		required: true,
		unique: true,
	},
})

const Player = mongoose.model('Player', PlayerSchema)
module.exports = Player
