export function initTimer(dispatch) {
    dispatch({'type': 'INIT_TIMER'})
}

export function clearTimer(dispatch) {
    dispatch({'type': 'CLEAR_TIMER'})
}

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