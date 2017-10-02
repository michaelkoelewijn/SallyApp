const initialState = {
	timer: 0,
	people: []
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

		case 'ADD_PLAYER':
			return {
				...state,
				people: [...state.people,action.payload]
			}	

		default:
			return state
	}
}