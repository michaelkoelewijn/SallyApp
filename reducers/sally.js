const initialState = {
	timer: 0,
	people: [],
	player: '',
	isGameMaster: false
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

		case 'SET_PLAYER':
			return {
				...state,
				player: action.payload
			}	

		case 'SET_PLAYERS': 
			return {
				...state,
				people: action.payload
			}
			
		case 'SET_GAMEMASTER':
			return {
				...state,
				isGameMaster: action.payload
			}	

		case 'SET_TIMER':
			return {
				...state,
				timer: action.payload
			}

		default:
			return state
	}
}