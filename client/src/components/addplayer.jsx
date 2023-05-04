import React, { useState, useEffect } from 'react'
import axios from 'axios'
function convertNumberToWords(number) {
	const ones = [
		'',
		'one',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'eight',
		'nine',
	]
	const tens = [
		'',
		'ten',
		'twenty',
		'thirty',
		'forty',
		'fifty',
		'sixty',
		'seventy',
		'eighty',
		'ninety',
	]
	const teens = [
		'eleven',
		'twelve',
		'thirteen',
		'fourteen',
		'fifteen',
		'sixteen',
		'seventeen',
		'eighteen',
		'nineteen',
	]
	const suffixes = ['thousand', 'million', 'billion', 'trillion']

	// handle zero and empty input
	if (number === 0) return 'zero'
	if (number === '') return ''

	// convert word form to numeric form
	if (isNaN(number)) {
		number = number.split(/\s+/).reduce((acc, word) => {
			if (word === 'and') return acc
			if (word in ones) return acc + ones.indexOf(word)
			if (word in tens) return acc + 10 * tens.indexOf(word)
			if (word in teens) return acc + teens.indexOf(word) + 11
			if (word === 'hundred') return acc * 100
			if (suffixes.includes(word))
				return acc * Math.pow(1000, suffixes.indexOf(word) + 1)
			return acc
		}, 0)
	}

	// handle numeric form
	if (number < 10) return ones[number]
	if (number < 20) return teens[number - 11]
	if (number < 100)
		return tens[Math.floor(number / 10)] + ' ' + ones[number % 10]
	if (number < 1000) {
		const hundredthDigit = Math.floor(number / 100)
		const remainder = number % 100
		return (
			ones[hundredthDigit] +
			' hundred' +
			(remainder === 0 ? '' : ' and ' + convertNumberToWords(remainder))
		)
	}
	for (let i = suffixes.length - 1; i >= 0; i--) {
		const suffix = Math.pow(1000, i + 1)
		if (number >= suffix) {
			const thousands = Math.floor(number / suffix)
			const remainder = number % suffix
			return (
				convertNumberToWords(thousands) +
				' ' +
				suffixes[i] +
				(remainder === 0 ? '' : ', ' + convertNumberToWords(remainder))
			)
		}
	}
}

function AddPlayer() {
	const [selectedTeam, setSelectedTeam] = useState('')
	const [selectedPlayer, setSelectedPlayer] = useState('')
	const [basePrice, setBasePrice] = useState('')
	const [players, setPlayers] = useState([])

	useEffect(() => {
		async function fetchPlayers() {
			const response = await axios.get('http://localhost:3000/player')
			setPlayers(response.data)
		}
		fetchPlayers()
	}, [])

	const handleTeamChange = (event) => {
		setSelectedTeam(event.target.value)
	}

	const handlePlayerChange = (event) => {
		setSelectedPlayer(event.target.value)
	}

	const handleBasePriceChange = (event) => {
		setBasePrice(event.target.value)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			const response = await axios.post('http://localhost:3000/addPlayer', {
				teamName: selectedTeam,
				player: selectedPlayer,
				bidPrice: basePrice,
			})

			console.log(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="team-select">Select IPL team:</label>
			<select id="team-select" value={selectedTeam} onChange={handleTeamChange}>
				<option value="">Select a team</option>
				<option value="MI">Mumbai Indians</option>
				<option value="CSK">Chennai Super Kings</option>
				<option value="RCB">Royal Challengers Bangalore</option>
				<option value="KKR">Kolkata Knight Riders</option>
				<option value="SRH">Sunrisers Hyderabad</option>
				<option value="DC">Delhi Capitals</option>
				<option value="RR">Rajasthan Royals</option>
				<option value="KXIP">Kings XI Punjab</option>
				<option value="GTT">Gujrat Titans</option>
				<option value="LSG">Lucknow Super Giants</option>
				<option value="SS">Sydney Sixers</option>
				<option value="MS">Melbourne Stars</option>
				<option value="AS">Adelaide Strikers</option>
				<option value="HH">Hobart Hurricanes</option>
				<option value="PS">perth scochers</option>
			</select>

			<br />

			<label htmlFor="player-select">Select a player:</label>
			<select
				id="player-select"
				value={selectedPlayer}
				onChange={handlePlayerChange}
			>
				<option value="">Select a player</option>
				{players.map((player) => (
					<option key={player.slug_id} value={JSON.stringify(player)}>
						{player.player}
					</option>
				))}
			</select>

			<br />

			<label htmlFor="base-price-input">Enter base price:</label>
			<input
				id="base-price-input"
				type="number"
				value={basePrice}
				onChange={handleBasePriceChange}
			/>
			{console.log('ffffff', convertNumberToWords(basePrice))}

			<br />

			<button type="submit">Submit</button>
		</form>
	)
}

export default AddPlayer
