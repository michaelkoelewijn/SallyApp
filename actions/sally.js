
export function addPlayer(dispatch, name = '') {
    dispatch({'type': 'ADD_PLAYER', 'payload': name})
}

export function setPlayers(dispatch, players) {
    let connectedPlayers = []
    Object.keys(players).map((socketId, index) => {
        connectedPlayers.push(players[socketId])
    })
    dispatch({'type': 'SET_PLAYERS', 'payload': connectedPlayers})
}

export function setGameMaster(dispatch) {
    dispatch({'type': 'SET_GAMEMASTER', 'payload': true})
}

export function initTimer(dispatch, startTime) {
    let currDateTime, timeInSeconds
    window._timer = setInterval(() => {
        currDateTime = new Date()
        timeInSeconds = parseInt((currDateTime - startTime) / 1000)
        dispatch({'type': 'SET_TIMER', 'payload': timeInSeconds})
    }, 1000)
}