const express = require('express')
const logger = require('morgan')
const path = require('path')
const app = express()
const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer(app)
const io = socketIo(server)
const port = 3000
app.use(logger('dev'))

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
  console.log('Client connected')
  socket.broadcast.emit('message', 'User join the chat')
  socket.on('disconnect', () => {
    io.emit('message', 'User left the channel')
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
