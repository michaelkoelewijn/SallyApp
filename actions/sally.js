export function initTimer(dispatch) {
    setInterval(() => {
        dispatch({'type': 'INIT_TIMER'})
    }, 1000)
}