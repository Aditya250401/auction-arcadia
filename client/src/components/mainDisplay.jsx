import React, { useState } from 'react'
import './master.css'
import Teams from './teams'
import MainSection from './mainSection'

const MainDisplay = () => {
	// Fetch all players

	const [componentId, setComponentId] = useState(null)

	const handleHrefClick = (id) => {
		setComponentId(id)
	}

	return (
		<>
			<div className="app">
				<div className="wrapper">
					<Teams onHrefClick={handleHrefClick} />
					<div className="main-container">
						<MainSection componentId={componentId} />
					</div>
				</div>
			</div>
		</>
	)
}
export default MainDisplay
