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

  io.on('connection', (socket) => {  
    console.log('a user connected');
  
    socket.on('CLIENT:ADD_PLAYER', (data) => {
      //ADD TO LIST AND SEND TO ALL CONNECTED SOCKETS
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  })
  

  
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})