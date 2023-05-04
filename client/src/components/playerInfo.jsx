import React, { useState, useEffect } from 'react'
import './try1.css'
import './master.css'

function PlayerInfo(props) {
	console.log('props', props)
	const myplayer = props.user && props.user.data
	if (!myplayer) return null

	const {
		slug_id,
		player,
		role,
		wickets,
		matches,
		economy,
		runs,
		average,
		base_price,
		strike_rate,
		video,
	} = myplayer
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [selectedVideo, setSelectedVideo] = useState(null)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
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
	})

	// eslint-disable-next-line react-hooks/rules-of-hooks

	const handleVideoClick = (event, video) => {
		event.preventDefault()
		setSelectedVideo(
			<iframe
				src={video}
				width="1150vw"
				height="850vh"
				frameBorder="0"
				allowFullScreen
			></iframe>
		)
	}

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
					{console.log(`my player-----------/images/${player}.png`)}
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
						{runs !== '' && (
							<div className="stat">
								<h3>Runs</h3>
								<p>{runs}</p>
							</div>
						)}
						{strike_rate !== '' && (
							<div className="stat">
								<h3>Strike Rate</h3>
								<p>{strike_rate}</p>
							</div>
						)}
						{average !== '' && (
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
							href="#"
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

// <>
// 	<div className="content-wrapper-header">
// 		<div className="content-wrapper-context">
// 			<div className="img-content">
// 				<h1>{player}</h1>
// 			</div>

// 			<h3>{role}</h3>
// 		</div>
// 		<div className="app-card">
// 			<img
// 				className="content-wrapper-img"
// 				src="./sac_Small-removebg-preview.png"
// 				alt=""
// 			/>
// 		</div>
// 	</div>
// 	<div className="content-section">
// 		<div className="content-section-title">Statistics</div>
// 		<ul>
// 			<li className="adobe-product">
// 				<div className="products">Matches: {matches}</div>
// 				<span className="status"> runs: {runs}</span>
// 				<div className="button-wrapper">
// 					<span className="products">Wickets: {wickets}</span>
// 				</div>
// 			</li>
// 			<li className="adobe-product">
// 				<div className="products">Average: {average}</div>
// 				<span className="status">
// 					<span className=""></span>
// 					Strike Rate: {strike_rate}
// 				</span>
// 				<div className="button-wrapper">
// 					<span className="products">Economy: {economy}</span>
// 				</div>
// 			</li>
// 		</ul>
// 	</div>

// 	<div className="base-price">
// 		<div className="app-card">
// 			<span className="something">Base Price: {base_price}</span>
// 		</div>
// 	</div>
// </>
