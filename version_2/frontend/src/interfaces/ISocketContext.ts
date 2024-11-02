import { Socket } from 'socket.io-client'
import IBid from './IBid'

export default interface ISocketContext {
	socket: Socket | undefined
	bids: IBid[] | undefined
	currentBid: number | undefined
	currentBidder: string | undefined
}
