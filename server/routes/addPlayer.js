const express = require('express')
const router = express.Router()
const Team = require('../models/Team')

router.post('/', (req, res) => {
	const { teamName, player, bidPrice } = req.body
	Team.findOne({ name: teamName }, (err, team) => {
		if (isNaN(parseFloat(bidPrice)) || !teamName) {
			return res.status(400).json({ message: 'Invalid input' })
		}

		Team.findOne({ name: teamName }, (err, team) => {
			if (err) {
				return res.json({ message: err })
			}

			if (team) {
				team.players.push(player)
				team.purse -= bidPrice
				team.save((err, updatedTeam) => {
					if (err) {
						return res.json({ message: err })
					}
					return res.json({
						message: 'Player added to existing team',
						team: updatedTeam,
					})
				})
			} else {
				const newTeam = new Team({
					name: teamName,
					players: [player],
					purse: 75000000 - bidPrice,
				})
				newTeam.save((err, createdTeam) => {
					if (err) {
						return res.json(err)
					}
					return res.json({
						message: 'New team created',
						team: createdTeam,
					})
				})
			}
		})
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
