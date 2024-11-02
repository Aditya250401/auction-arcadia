'use client'
import { useSocket } from '@/contexts/SocketContext'
import { useUser } from '@/contexts/UserContext'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog'
import confetti from 'canvas-confetti'
import IBid from '@/interfaces/IBid'
import PlayerStats from '../playerStats'

function AuctionPage() {
	const players = [
		{
			name: 'Virat Kohli',
			image: '/placeholder.svg?height=300&width=400',
			stats: {
				matches: 200,
				runs: 6283,
				average: 52.8,
				strikeRate: 129.94,
				hundreds: 5,
				fifties: 42,
				highestScore: 113,
				wickets: 4,
				economyRate: 8.83,
			},
		},
		{
			name: 'Rohit Sharma',
			image: '/placeholder.svg?height=300&width=400',
			stats: {
				matches: 213,
				runs: 5611,
				average: 31.17,
				strikeRate: 130.39,
				hundreds: 1,
				fifties: 40,
				highestScore: 109,
				wickets: 15,
				economyRate: 7.98,
			},
		},
		{
			name: 'MS Dhoni',
			image: '/placeholder.svg?height=300&width=400',
			stats: {
				matches: 234,
				runs: 4978,
				average: 39.2,
				strikeRate: 135.2,
				hundreds: 0,
				fifties: 24,
				highestScore: 84,
				wickets: 0,
				economyRate: 0,
			},
		},
	]

	const lastbidRef = useRef<HTMLDivElement>(null)
	const { socket,bids,currentBid,currentBidder } = useSocket()
	const { username } = useUser()

	const [newbid, setNewbid] = useState<string>('')

	const [currentTeam, setCurrentTeam] = useState('')
	const [isSold, setIsSold] = useState(false)
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
	const [bidIncrease, setBidIncrease] = useState(0)




	// Handle sending a bid through the socket
	const handleSendBid = () => {
		if (socket && bidIncrease > 0) {
			const newBid = currentBid ? currentBid + bidIncrease : bidIncrease
			const newBidbid = {
				bid: newBid,
				name: username,
				time: new Date(),
				socketId: socket.id,
			}

			// Send the bid via socket
			socket.emit('send_bid', newBidbid)

		}
	}

	const handleBidIncrease = (amount: number) => {
		setBidIncrease(amount)
		handleSendBid()
	}

	const handleSold = () => {
		setIsSold(true)
		triggerConfetti()
	}

	const handleNextPlayer = () => {
		setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length)
		setIsSold(false)
	}

	const triggerConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.85 },
			colors: ['#FFD700', '#1E90FF', '#4169E1', '#FFA500'],
		})
	}

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | null = null
		if (isSold) {
			interval = setInterval(triggerConfetti, 1000)
		}
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isSold])

	const currentPlayer = players[currentPlayerIndex]

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-yellow-500 flex items-center justify-center p-4 relative overflow-hidden">
			<Card className="w-full max-w-4xl backdrop-blur-lg bg-white/10 border-white/20 text-white relative">
				<CardHeader className="text-center relative">
					<CardTitle className="text-3xl font-bold text-yellow-300">
						IPL Auction 2024
					</CardTitle>
					<CardDescription className="text-blue-200">
						Bid on top cricket talents
					</CardDescription>
					<Button
						className="absolute top-4 right-4 bg-yellow-500 text-blue-900 hover:bg-yellow-600"
						onClick={handleSold}
					>
						Sold
					</Button>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="text-center">
						<img
							src="/images/gettyimages-1434940895-2048x2048.jpg"
							alt={currentPlayer.name}
							className="w-full max-w-md h-64 object-cover rounded-lg mb-4 mx-auto"
						/>
						<h2 className="text-2xl font-bold mb-2 text-yellow-300">
							{currentPlayer.name}
						</h2>

						<PlayerStats stats={currentPlayer.stats} />

						<div className="text-3xl font-bold mb-2 text-yellow-300">
							Current Bid: ₹{currentBid && currentBid / 100000} lakhs
						</div>
						<div className="text-lg text-blue-200 mb-4">
							Current Bidder: {currentTeam}
						</div>
					</div>

					<div className="flex justify-center gap-4">
						<Button
							onClick={() => handleBidIncrease(100000)}
							className="bg-yellow-500 text-blue-900 hover:bg-yellow-600"
						>
							+₹1 Lakh
						</Button>
						<Button
							onClick={() => handleBidIncrease(500000)}
							className="bg-yellow-500 text-blue-900 hover:bg-yellow-600"
						>
							+₹5 Lakh
						</Button>
						<Button
							onClick={() => handleBidIncrease(1000000)}
							className="bg-yellow-500 text-blue-900 hover:bg-yellow-600"
						>
							+₹10 Lakh
						</Button>
					</div>

					<div>
						<h3 className="text-xl font-semibold mb-2 text-center text-yellow-300">
							Recent Bids
						</h3>{' '}
						<div className="flex flex-wrap justify-center gap-4">
							{bids &&
								bids.slice(-5).map((bid, index) => (
									<Card
										key={index}
										className="bg-blue-800/50 border-blue-400 w-48"
									>
										<CardContent className="p-4">
											<div className="flex items-center space-x-2 mb-2">
												<Avatar className="h-8 w-8">
													<AvatarFallback>{bid.name[0]}</AvatarFallback>
												</Avatar>
												<span className="font-semibold text-sm text-yellow-300">
													{bid.name}
												</span>
											</div>
											<div className="text-right">
												<div className="font-bold text-yellow-300">
													₹{bid.bid}
												</div>
											</div>
										</CardContent>
									</Card>
								))}
						</div>
					</div>
				</CardContent>
				<CardFooter className="text-center text-blue-200">
					<p>
						Next player:{' '}
						{players[(currentPlayerIndex + 1) % players.length].name}
					</p>
				</CardFooter>
			</Card>

			<Dialog open={isSold} onOpenChange={setIsSold}>
				<DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-900 via-blue-700 to-yellow-500 border-0 z-50">
					<DialogHeader>
						<DialogTitle className="text-3xl font-bold text-center text-white">
							SOLD!
						</DialogTitle>
						<DialogDescription className="text-center text-yellow-300">
							{currentPlayer.name} has been sold!
						</DialogDescription>
					</DialogHeader>
					<div className="text-center space-y-4">
						<img
							src="/images/gettyimages-1434940895-2048x2048.jpg"
							alt={currentPlayer.name}
							className="w-32 h-32 rounded-full mx-auto border-4 border-white"
						/>
						<div>
							<h3 className="text-2xl font-bold text-white mb-1">
								{currentPlayer.name}
							</h3>
							<p className="text-xl text-yellow-300 font-semibold">
								Sold to {currentTeam}
							</p>
						</div>
						<div className="text-4xl font-bold text-white">
							₹{currentBid && currentBid / 100000} lakhs
						</div>
					</div>
					<DialogFooter className="sm:justify-center">
						<Button
							variant="secondary"
							className="bg-yellow-500 text-blue-900 hover:bg-yellow-600"
							onClick={handleNextPlayer}
						>
							Next Player
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default AuctionPage
