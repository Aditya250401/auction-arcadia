const express = require('express')
const app = express()
const cors = require('cors')
const { Server } = require('socket.io')
const http = require('http')
const debugPrint = require('../utils/debugPrint')

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})

io.on('connection', (socket) => {
	debugPrint(`User Connected: ${socket.id}`)

	socket.on('send_bid', (data) => {
		io.emit('receive_bid', data)
	})

	socket.on('typing', (data) => {
		socket.broadcast.emit('typing_response', data)
	})

	socket.on('disconnect', () => {
		debugPrint('User Disconnected', socket.id)
		io.emit('receive_bid', {
			text: 'A user left the chat.',
			socketId: 'kurakani',
		})
	})
})

module.exports = { app, server }
