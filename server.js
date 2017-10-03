const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const main = next({ dev })
const handle = main.getRequestHandler()

const port = process.env.PORT || 3000

main.prepare()
.then(() => {
  const app = express()
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  const server = app.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

  const io = require('socket.io')(server);  
  var connectedUsers = {};
  io.on('connection', (client) => { 
    console.log('a user connected');
    client.on('CLIENT:ADD_PLAYER', (data) => {
      //ADD TO LIST AND SEND TO ALL CONNECTED SOCKETS
      let numberOfConnectedSockets = parseInt(Object.keys(connectedUsers).length);
      let playerData = {
        name: data.name
      }

      if(numberOfConnectedSockets === 0) {
        playerData.gameMaster = true
        io.to(client.id).emit('SERVER:SET_GAMEMASTER', true)
      }

      connectedUsers[client.id] = playerData
    })

    //Send updated list of connected players once every x seconds
    var updateInterval = setInterval(() => {
      console.log('PLAYERLIST EMITTED')
      io.emit('SERVER:EMIT_PLAYERS', connectedUsers )
    }, 3000)

    client.on('disconnect', () => {
      console.log('user disconnected')
      clearInterval(updateInterval)
      delete connectedUsers[client.id]
    });
  })
  

  
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})