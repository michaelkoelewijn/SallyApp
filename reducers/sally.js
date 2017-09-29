const initialState = {
	timer: 0,
	people: 0
}

export default function(state = initialState, action) {
	switch (action.type) {
		case 'INIT_TIMER':
            return {
				...state,
				timer: ++state.timer
			}

		case 'CLEAR_TIMER':
			return {
				...state,
				timer: 0
			}

		default:
			return state
	}
}