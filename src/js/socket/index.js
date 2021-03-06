import { socketDevDomain } from 'config/web-config'

const createSocket = name => {
  const socket = io(socketDevDomain)

  socket.on('online', user => {
    console.log(`${user.name} is online`)
  })

  socket.on('offline', user => {
    console.log(`${user.name} is offline`)
  })

  socket.emit('online', { name })

  window.onbeforeunload = () => {
    socket.emit('offline', { name })
    socket.disconnect()
  }

  return socket
}

module.exports = {
  createSocket
}
