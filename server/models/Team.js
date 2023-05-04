const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	players: {
		type: [mongoose.Schema.Types.Mixed],
		required: true,
	},
	purse: {
		type: Number,
		required: true,
	},
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team
