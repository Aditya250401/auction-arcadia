import React, { useState, useEffect } from 'react'
import './try1.css'
import './master.css'
import { useFetchAllPlayersQuery } from '../store/Api/playerApi'

function PlayerInfo({ playerId, setRole }) {
	const { data: players = [], error, isLoading } = useFetchAllPlayersQuery()

	useEffect(() => {
		if (players && players[playerId]) {
			const { player_role: role, player_video: video } = players[playerId]
			setRole(role)

			const handleKeyPress = (event) => {
				if (event.key === 'm') {
					setSelectedVideo(null)
				} else if (event.key === 'n') {
					handleVideoClick(event, video)
				}
			}

			document.addEventListener('keydown', handleKeyPress)
			return () => {
				document.removeEventListener('keydown', handleKeyPress)
			}
		}
	}, [playerId, players, setRole])

	const [selectedVideo, setSelectedVideo] = useState(null)

	const handleVideoClick = (event, video) => {
		event.preventDefault()
		setSelectedVideo(
			<iframe
				title="video"
				src={video}
				width="1150vw"
				height="850vh"
				allowFullScreen
			></iframe>
		)
	}

	if (isLoading) {
		return <div>player is loading...</div>
	}

	if (error) {
		return <div>Oh no, there was an error</div>
	}

	if (!players) {
		return null
	}

	const myPlayer = players[playerId]

	if (!myPlayer) {
		return null
	}

	const {
		slug_id,
		player_basePrice: base_price,
		player_currentPrice: current_price,
		player_name: player,
		player_role: role,
		player_stats: { average, economy, matches, runs, strike_rate, wickets },
		player_team: team,
		player_video: video,
	} = myPlayer

	if (selectedVideo) {
		return (
			<>
				<div>{selectedVideo}</div>
				<button
					onClick={() => {
						setSelectedVideo(null)
					}}
				>
					exit
				</button>
			</>
		)
	}

	return (
		<>
			<div className="base-price1">
				<span className="playerName">{player}</span>
			</div>
			<div className="container">
				<div className="player-photo ">
					<img src={`/images/${player}.png`} alt={player} />
				</div>
				<div className="app-card" style={{ width: '40vw' }}>
					<div className="content-section-title">Statistics</div>
					<div className="stat">
						<h3>{role}</h3>
					</div>
					<div className="player-stats">
						<div className="stat">
							<h3>Matches</h3>
							<p>{matches}</p>
						</div>
						{runs !== null && (
							<div className="stat">
								<h3>Runs</h3>
								<p>{runs}</p>
							</div>
						)}
						{strike_rate !== null && (
							<div className="stat">
								<h3>Strike Rate</h3>
								<p>{strike_rate}</p>
							</div>
						)}
						{average !== null && (
							<div className="stat">
								<h3>Average</h3>
								<p>{average}</p>
							</div>
						)}
						{wickets !== '' && (
							<div className="stat">
								<h3>Wickets</h3>
								<p>{wickets}</p>
							</div>
						)}
						{economy !== '' && (
							<div className="stat">
								<h3>Economy</h3>
								<p>{economy}</p>
							</div>
						)}
					</div>
					<div className="stat" style={{ width: '40vw' }}>
						<h3>Base Price</h3>
						<p>{base_price}</p>
					</div>
					{video !== '' && (
						<a
							className="stat"
							key={slug_id}
							href="#video"
							onClick={(event) => handleVideoClick(event, video)}
						>
							"play video"
						</a>
					)}
				</div>
			</div>
		</>
	)
}

export default PlayerInfo
