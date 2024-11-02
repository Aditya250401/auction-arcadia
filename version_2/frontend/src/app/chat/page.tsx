'use client'
import ChatBody from '@/components/Chat/ChatBody'
import ChatFooter from '@/components/Chat/ChatFooter'
import { useSocket } from '@/contexts/SocketContext'
import { useUser } from '@/contexts/UserContext'
import React, { useEffect } from 'react'

function Page() {
	const { socket } = useSocket()
	const { username } = useUser()

	console.log('socket', typeof socket)

	useEffect(() => {
		socket?.emit('send_bid', {
			bid: 0,
			socketId: socket?.id,
		})
		console.log('first bid made')
	}, [])

	return (
		<div className="flex relative flex-col w-full h-screen">
			<ChatBody />
		</div>
	)
}

export default Page
