
export function addPlayer(dispatch, name = '') {
    dispatch({'type': 'ADD_PLAYER', 'payload': name})
}

export function setPlayer(dispatch, player) {
    dispatch({ 'type':'SET_PLAYER', 'payload': player })
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
    let timer = -4
    window._timer = setInterval(() => {
        ++timer
        dispatch({'type': 'SET_TIMER', 'payload': timer})
    }, 1000)
}