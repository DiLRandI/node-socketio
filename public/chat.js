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
  // eslint-disable-next-line no-undef
  const socket = io()

  chatBtn.onclick = (ev) => {
    ev.preventDefault()
    if (chatMsg.value.trim() !== '') {
      socket.emit('chatMsg', chatMsg.value)
    }
    chatMsg.value = ''
    chatMsg.focus()
  }

  socket.emit('joinUser', { userName })
  socket.on('message', (msg) => {
    const timeEl = document.createElement('span')
    timeEl.className = 'chat-time'
    timeEl.innerText = msg.time

    const userEl = document.createElement('span')
    userEl.className = 'chat-user'
    userEl.innerText = msg.userName

    const msgEl = document.createElement('span')
    msgEl.className = 'chat-message'
    msgEl.innerText = msg.message

    const chatEl = document.createElement('div')
    chatEl.className = 'chat-message-display'
    chatEl.appendChild(timeEl)
    chatEl.appendChild(userEl)
    chatEl.appendChild(msgEl)

    chat.appendChild(chatEl)

    chat.scrollTop = chat.scrollHeight
  })
}())
