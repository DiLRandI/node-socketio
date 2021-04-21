(function () {
  const userName = decodeURIComponent((location.search.replace('?Name=', '').split('+').join(' ').trim()))
  document.title += ' ' + userName

  /**
   * @type {HTMLDivElement}
   */
  const chat = document.getElementById('chat')
  /**
   * @type {HTMLInputElement}
   */
  const chatMsg = document.getElementById('chatMsg')
  /**
   * @type {HTMLButtonElement}
   */
  const chatBtn = document.getElementById('sendMsg')
  const socket = io()

  chatBtn.onclick = (ev) => {
    ev.preventDefault()
    socket.emit('message', chatMsg.value)
  }

  socket.on('message', (msg) => {
    const timeEl = document.createElement('span')
    timeEl.innerText = new Date().toLocaleTimeString()
    timeEl.style = 'margin: 10px;'

    const msgEl = document.createElement('span')
    msgEl.innerText = msg
    msgEl.style = 'margin: 10px; padding: 5px'

    const chatEl = document.createElement('div')
    chatEl.appendChild(timeEl)
    chatEl.appendChild(msgEl)

    chat.appendChild(chatEl)
  })
}())
