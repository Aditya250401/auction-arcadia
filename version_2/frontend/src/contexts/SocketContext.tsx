'use client'
import IBid from '@/interfaces/IBid'
import ISocketContext from '@/interfaces/ISocketContext'
import { createContext, useContext, useEffect, useState } from 'react'
import * as socketIO from 'socket.io-client'
import { useUser } from './UserContext'
import { useRouter } from 'next/navigation'

const intialData: ISocketContext = {
	socket: undefined,
	bids: [],
	currentBid: undefined,
	currentBidder: undefined,
}

const SocketContext = createContext<ISocketContext>(intialData)

export function useSocket() {
	return useContext(SocketContext)
}

export default function SocketProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [socket, setSocket] = useState<socketIO.Socket>()
	const [bids, setBids] = useState<IBid[]>([])
	const [currentBid, setCurrentBid] = useState<number>(0)
	const [currentBidder, setCurrentBidder] = useState<string>()

	const { username } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (!username) {
			router.replace('/')
			return
		}
		let socket = socketIO.connect(process.env.NEXT_PUBLIC_BASE_URL!)
		socket.on('receive_bid', (data: IBid) => {
			setBids((prev) => [...prev, data])
			setCurrentBid(data.bid)
			setCurrentBidder(data.name)
			console.log(data)
		})
		setSocket(socket)
	}, [username, router])

	return (
		<SocketContext.Provider value={{ socket, bids, currentBid, currentBidder }}>
			{children}
		</SocketContext.Provider>
	)
}
