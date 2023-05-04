import React, { useState, useEffect } from 'react'
import './master.css'
import PlayerInfo from './playerInfo'
import axios from 'axios'
import TeamsCollection from './teamsCollection'
import AddPlayer from './addplayer'
import VideoList from './videoList'

const TeamCollectionWithId = ({ teamId }) => {
	return <TeamsCollection teamId={teamId} />
}

const MainSection = ({ componentId }) => {
	const [user, setUser] = useState({})
	const [playerId, setPlayerId] = useState(1)

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`http://localhost:3000/player/${playerId}`)
			setUser(res.data)
		}
		fetchUser()
	}, [playerId])

	//write a function to change the player id and call it on button click
	const changePlayer = (direction) => {
		setPlayerId((prevPlayerId) => {
			const newPlayerId = prevPlayerId + direction
			return newPlayerId >= 0 ? newPlayerId : prevPlayerId
		})
	}
	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === 'ArrowLeft') {
				changePlayer(-1)
			} else if (event.key === 'ArrowRight') {
				changePlayer(1)
			}
		}
		document.addEventListener('keydown', handleKeyPress)
		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [])

	const myplayer = user && user.data
	if (!myplayer) return null

	const { role } = myplayer
	console.log(role)

	let mainContainerClass = 'content-wrapper'
	if (role === 'Batsman') {
		mainContainerClass += ' batsman-background'
	} else if (role === 'Bowler') {
		mainContainerClass += ' bowler-background'
	} else if (role === 'All Rounder') {
		mainContainerClass += ' allrounder-background'
	} else if (role === 'Wicket Keeper') {
		mainContainerClass += ' wicketkeeper-background'
	}

	switch (componentId) {
		case 1:
			return (
				<div className={mainContainerClass}>
					<PlayerInfo user={user} />
				</div>
			)
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
		case 16:
			return (
				<div className="content-wrapper">
					<TeamCollectionWithId teamId={componentId} />
				</div>
			)
		case 17:
			return (
				<div className="content-wrapper">
					<AddPlayer />
				</div>
			)

		default:
			return <div>Please select a component</div>
	}
}

export default MainSection
