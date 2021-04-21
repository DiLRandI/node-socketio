const express = require('express')
const logger = require('morgan')
const path = require('path')
const app = express()
const http = require('http')
const socketIo = require('socket.io')

const server = http.createServer(app)
const io = socketIo(server)
const port = 3000
const botName = 'chat bot'
const formatMessage = (username, message) => {
  return {
    username,
    message,
    time: new Date().toLocaleTimeString()
  }
}

app.use(logger('dev'))

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
  console.log('Client connected')

  socket.on('joinUser', ({ username }) => {
    socket.emit('message', formatMessage(botName, 'Welcome to the chat'))
    socket.broadcast.emit('message', formatMessage(botName, `${username} join the chat`))
  })

  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'User left the channel'))
  })

  socket.on('chatMsg', (msg) => {
    console.log('Chat message ', msg)
    io.emit('message', formatMessage(botName, msg))
  })
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
