import React, { useState, useEffect } from 'react'
import './master.css'

import axios from 'axios'
// function convertNumberToWords(number) {
// 	const ones = [
// 		'',
// 		'one',
// 		'two',
// 		'three',
// 		'four',
// 		'five',
// 		'six',
// 		'seven',
// 		'eight',
// 		'nine',
// 	]
// 	const tens = [
// 		'',
// 		'ten',
// 		'twenty',
// 		'thirty',
// 		'forty',
// 		'fifty',
// 		'sixty',
// 		'seventy',
// 		'eighty',
// 		'ninety',
// 	]
// 	const teens = [
// 		'eleven',
// 		'twelve',
// 		'thirteen',
// 		'fourteen',
// 		'fifteen',
// 		'sixteen',
// 		'seventeen',
// 		'eighteen',
// 		'nineteen',
// 	]
// 	const suffixes = ['thousand', 'million', 'billion', 'trillion']

// 	// handle zero and empty input
// 	if (number === 0) return 'zero'
// 	if (number === '') return ''

// 	// convert word form to numeric form
// 	if (isNaN(number)) {
// 		number = number.split(/\s+/).reduce((acc, word) => {
// 			if (word === 'and') return acc
// 			if (word in ones) return acc + ones.indexOf(word)
// 			if (word in tens) return acc + 10 * tens.indexOf(word)
// 			if (word in teens) return acc + teens.indexOf(word) + 11
// 			if (word === 'hundred') return acc * 100
// 			if (suffixes.includes(word))
// 				return acc * Math.pow(1000, suffixes.indexOf(word) + 1)
// 			return acc
// 		}, 0)
// 	}

// 	// handle numeric form
// 	if (number < 10) return ones[number]
// 	if (number < 20) return teens[number - 11]
// 	if (number < 100)
// 		return tens[Math.floor(number / 10)] + ' ' + ones[number % 10]
// 	if (number < 1000) {
// 		const hundredthDigit = Math.floor(number / 100)
// 		const remainder = number % 100
// 		return (
// 			ones[hundredthDigit] +
// 			' hundred' +
// 			(remainder === 0 ? '' : ' and ' + convertNumberToWords(remainder))
// 		)
// 	}
// 	for (let i = suffixes.length - 1; i >= 0; i--) {
// 		const suffix = Math.pow(1000, i + 1)
// 		if (number >= suffix) {
// 			const thousands = Math.floor(number / suffix)
// 			const remainder = number % suffix
// 			return (
// 				convertNumberToWords(thousands) +
// 				' ' +
// 				suffixes[i] +
// 				(remainder === 0 ? '' : ', ' + convertNumberToWords(remainder))
// 			)
// 		}
// 	}
// }

const TeamsCollection = (props) => {
	const team_id = props.teamId - 1

	const [pteams, setTeams] = useState(null)

	const [isChecked, setIsChecked] = useState(false)
	const [batsmenCount, setBatsmenCount] = useState(0)
	const [bowlersCount, setBowlersCount] = useState(0)
	const [allRoundersCount, setAllRoundersCount] = useState(0)
	const [wicketKeepersCount, setWicketKeepersCount] = useState(0)
	const [foreignPlayerCount, setForeignPlayerCount] = useState(0)
	const [showSelectedPlayers, setShowSelectedPlayers] = useState(false)

	useEffect(() => {
		axios
			.get('http://localhost:3000/addPlayer')
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

	// Handle checkbox changes by updating the selectedPlayers state
	// const handleCheckboxChange = (player, checked) => {
	// 	if (checked) {
	// 		setSelectedPlayers((prevSelectedPlayers) => [
	// 			...prevSelectedPlayers,
	// 			player,
	// 		])
	// 	} else {
	// 		setSelectedPlayers((prevSelectedPlayers) =>
	// 			prevSelectedPlayers.filter(
	// 				(selectedPlayer) => selectedPlayer !== player
	// 			)
	// 		)
	// 	}
	// }

	// function handleCheckboxChange(event, player) {
	// 	console.log(event)
	// 	setIsChecked(event.target.checked)

	// 	if (event.target.checked) {
	// 		setSelectedPlayers((prevSelectedPlayers) => [
	// 			...prevSelectedPlayers,
	// 			player,
	// 		]) // add Player X to the array
	// 	} else {
	// 		setSelectedPlayers((prevSelectedPlayers) =>
	// 			prevSelectedPlayers.filter(
	// 				(selectedPlayer) => selectedPlayer !== player
	// 			)
	// 		) // remove Player X from the array
	// 	}
	// }

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
