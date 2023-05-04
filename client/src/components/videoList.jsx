import React, { useState } from 'react'
import './try1.css'

const videoData = [
	{
		alt: 'David warner',
		url: 'https://drive.google.com/file/d/15iXlXU8km3DVdJabC8XEds4nmwJbQjfh/view',
		src: 'https://drive.google.com/file/d/15iXlXU8km3DVdJabC8XEds4nmwJbQjfh/preview',
	},
	{
		alt: 'Rishab pant',
		url: 'https://drive.google.com/file/d/1LAm5f7LhtJ13WvDBdFNyzTVKtv5OHDBC/view',
		src: 'https://drive.google.com/file/d/1LAm5f7LhtJ13WvDBdFNyzTVKtv5OHDBC/preview',
	},
	{
		alt: 'Video 3',
		url: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4',
		src: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4',
	},
]

function VideoList() {
	const [selectedVideo, setSelectedVideo] = useState(null)
	const handleVideoClick = (event, video) => {
		event.preventDefault()
		setSelectedVideo(
			<iframe
				src={video.src}
				width="1150vw"
				height="850vh"
				frameBorder="0"
				allowFullScreen
			></iframe>
		)
	}

	if (selectedVideo) {
		return <div>{selectedVideo}</div>
	}

	return (
		<div clasName="playerVideo">
			{videoData.map((video, index) => (
				<a
					className="stat"
					key={index}
					href="#"
					onClick={(event) => handleVideoClick(event, video)}
				>
					{video.alt}
				</a>
			))}
		</div>
	)
}

export default VideoList
