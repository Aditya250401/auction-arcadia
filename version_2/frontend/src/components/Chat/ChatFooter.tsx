import { useSocket } from '@/contexts/SocketContext'
import { useUser } from '@/contexts/UserContext'
import React, { useState } from 'react'

function ChatFooter() {
	const [currentBid, setCurrentBid] = useState<number>(0)
	const { socket } = useSocket()
	const { username } = useUser()

	const handleSendBid = () => {
		socket?.emit('send_bid', {
			bid: currentBid + 50,
			name: username,
			time: new Date(),
			socketId: socket.id,
		})
	}

	React.useEffect(() => {
		socket?.on('receive_bid', (data: { bid: number }) => {
			setCurrentBid(data.bid)
		})

		return () => {
			socket?.off('receive_bid')
		}
	}, [socket])

	return (
		<div className="basis-[8%] border-t-2 p-2 flex items-center justify-center">
			<button
				onClick={handleSendBid}
				className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
			>
				Make a Bid
			</button>
		</div>
	)
}

export default ChatFooter
