import React, { useState, useEffect } from 'react'
import './master.css'

import axios from 'axios'

const TeamsCollection = (props) => {
	const team_id = props.teamId - 1

	const [pteams, setTeams] = useState(null)

	const [batsmenCount, setBatsmenCount] = useState(0)
	const [bowlersCount, setBowlersCount] = useState(0)
	const [allRoundersCount, setAllRoundersCount] = useState(0)
	const [wicketKeepersCount, setWicketKeepersCount] = useState(0)
	const [foreignPlayerCount, setForeignPlayerCount] = useState(0)
	const [showSelectedPlayers, setShowSelectedPlayers] = useState(false)

	useEffect(() => {
		axios
			.get('http://localhost:5000/addPlayer')
			.then((response) => setTeams(response.data))
			.catch((error) => console.log(error))
	}, [])

	useEffect(() => {
		// count the number of players in each category based on their role
		let batsmen = 0
		let bowlers = 0
		let allRounders = 0
		let wicketKeepers = 0
		let foreignPlayer = 0
		let totalRating = 0
		pteams?.forEach((team) => {
			if (team.team_id === team_id) {
				team.players.forEach((player) => {
					const { role, FP, slug_id, rating } = JSON.parse(player)
					console.log('slug_id', slug_id)

					if (role === 'Batsman') {
						batsmen++
					} else if (role === 'Bowler') {
						bowlers++
					} else if (role === 'All Rounder') {
						allRounders++
					} else if (role === 'Wicket Keeper') {
						wicketKeepers++
					}
					if (FP === true) {
						foreignPlayer++
					}
					if (rating) {
						totalRating = totalRating + rating
					}
				})
			}
		})
		setBatsmenCount(batsmen)
		setBowlersCount(bowlers)
		setAllRoundersCount(allRounders)
		setWicketKeepersCount(wicketKeepers)
		setForeignPlayerCount(foreignPlayer)
	}, [pteams, team_id])

	const [selectedPlayers, setSelectedPlayers] = useState([])

	const currentTeam = pteams?.find((team) => team.team_id === team_id)
	// Filter the players array to show only the selected players

	if (showSelectedPlayers) {
		return (
			<div>
				{console.log(selectedPlayers)}
				{selectedPlayers?.map((player) => {
					const { player: thePlayer, FP } = JSON.parse(player)
					return (
						<div className="apps-card">
							<div className="app-card">
								<div className="products">{thePlayer}</div>
								<div></div>
								{FP !== false && <h3>FL</h3>}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className="content-section">
			<div className="content-section">
				<ul>
					<li className="adobe-product">
						<div className="products">{currentTeam?.name}</div>
						<span className="products">
							Purse: {(currentTeam?.purse / 10000000).toFixed(2)} Crores
						</span>
					</li>
					<li className="adobe-product">
						<div className="products">{`Batsmen: ${batsmenCount}`}</div>
						<div className="products">{`Bowlers: ${bowlersCount}`}</div>
						<div className="products">{`All-Rounders: ${allRoundersCount}`}</div>
						<div className="products">{}</div>
						<div className="products">{`Wiclet Keeper: ${wicketKeepersCount}`}</div>
					</li>
					<li className="adobe-product">
						<div className="products">{`foreign Players: ${foreignPlayerCount}`}</div>
						<div className="products">{}</div>
						<div className="products">{`Total: ${
							bowlersCount +
							batsmenCount +
							allRoundersCount +
							wicketKeepersCount
						}`}</div>
					</li>
				</ul>
			</div>

			<div className="apps-card">
				{currentTeam?.players.map((player) => {
					const { player: thePlayer, role, slug_id } = JSON.parse(player)

					return (
						<div className="app-card">
							<span></span>
							<div className="products">{thePlayer}</div>
							<div></div>
							<div className="app-card-buttons">
								<button className="content-button status-button">{role}</button>
							</div>
							<div key={slug_id}>
								<input
									type="checkbox"
									checked={selectedPlayers.includes(player)}
									onChange={(event) => {
										if (event.target.checked) {
											setSelectedPlayers((prevSelectedPlayers) => [
												...prevSelectedPlayers,
												player,
											])
										} else {
											setSelectedPlayers((prevSelectedPlayers) =>
												prevSelectedPlayers.filter(
													(selectedPlayer) => selectedPlayer._id !== player._id
												)
											)
										}
									}}
								/>
							</div>
						</div>
					)
				})}
			</div>

			<div className="apps-card">
				<button
					className="content-button status-button"
					onClick={() => setShowSelectedPlayers(!showSelectedPlayers)}
				>
					Final Players
				</button>
			</div>
		</div>
	)
}

export default TeamsCollection
