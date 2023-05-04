const express = require('express')
const router = express.Router()
const Team = require('../models/Team')

router.post('/', (req, res) => {
	const { teamName, player, bidPrice } = req.body

	Team.findOne({ name: teamName }, (err, team) => {
		if (err) {
			res.json({ message: err })
		}

		if (team) {
			team.players.push(player)
			team.purse -= bidPrice
			team.save((err, updatedTeam) => {
				if (err) {
					res.json({ message: err })
				}
				res.json({
					message: 'Player added to existing team',
					team: updatedTeam,
				})
			})
		} else {
			const newTeam = new Team({
				name: teamName,
				players: [player],
				purse: 750000000 - bidPrice,
			})
			newTeam.save((err, createdTeam) => {
				if (err) {
					res.json({ message: err })
				}
				res.json({ message: 'New team created', team: createdTeam })
			})
		}
	})
})

router.get('/', (req, res) => {
	Team.find({}, (err, teams) => {
		if (err) {
			res.json({ message: err })
		}
		res.json(teams)
	})
})

module.exports = router
