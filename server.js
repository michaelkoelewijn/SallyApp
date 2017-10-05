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
  var allScores = {};
  var serverTime = '';

  io.on('connection', (client) => { 
    
    //ADDS PLAYER TO LIST
    client.on('CLIENT:ADD_PLAYER', (data) => {
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
      io.emit('SERVER:EMIT_PLAYERS', connectedUsers )
      io.emit('SERVER:EMIT_ALL_SCORES', allScores)
    }, 3000)


    client.on('CLIENT:EMIT_READY', () => {
      io.emit('SERVER:EMIT_READY', true)
    })

    client.on('CLIENT:SEND_START_SIGNAL', () => {
      serverTime = new Date()
      io.emit('SERVER:SEND_START_SIGNAL')
    })

    client.on('CLIENT:SEND_STOP_SIGNAL', (data) => {
      let currTime = new Date()
      let timeInSeconds = Math.ceil((currTime.getTime() - serverTime.getTime()) / 1000) - 5
      let scoreData = { 'name': data.name, 'time': timeInSeconds }
      allScores[client.id] = scoreData
      
      writeScoreToFile(scoreData)
    })

    //REMOVE PLAYER FROM SOCKET AND CLEAR ALL DATA
    client.on('disconnect', () => {
      delete connectedUsers[client.id]
      delete allScores[client.id]
    });
  })


  setTimeout(() => {
    clearInterval(updateInterval)
  }, (1000 * 60) * 5 ) // Clear interval after 5 minutes
  

  
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})


function writeScoreToFile(score) {
  var fs = require('fs')
  let fileName = './static/users.json'
  let fileData = fs.readFileSync(fileName, 'utf8')
  let json = JSON.parse(fileData)
  let serverTime = new Date()
  let dateString = `${serverTime.getFullYear()}-${serverTime.getMonth() + 1 }-${serverTime.getDate()}`
  let scoreData = { "date": dateString, "seconds": score.time }

  json[score.name].scores.push(scoreData)

  fs.writeFile(fileName, JSON.stringify(json), (error) => {
    if(error) {
      return console.log(error);
    }else {
      return console.log('succesfully updated database')
    }
  })
}