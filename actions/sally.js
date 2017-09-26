export function initTimer(dispatch) {
    dispatch({'type': 'INIT_TIMER'})
}

export function clearTimer(dispatch) {
    dispatch({'type': 'CLEAR_TIMER'})
}