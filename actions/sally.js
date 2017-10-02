export function initTimer(dispatch) {
    dispatch({'type': 'INIT_TIMER'})
}

export function clearTimer(dispatch) {
    dispatch({'type': 'CLEAR_TIMER'})
}

export function addPlayer(dispatch, name = '') {
    dispatch({'type': 'ADD_PLAYER', 'payload': name})
}