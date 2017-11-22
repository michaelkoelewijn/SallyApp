const initialState = {
	timer: 0,
	people: [],
	player: '',
	isGameMaster: false,
	statistics: [],
	playerRecord: 0
}

export default function(state = initialState, action) {
	switch (action.type) {

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

		case 'ADD_STATS':
			return {
				...state,
				statistics: action.payload
			}	

		case 'SET_RECORD':
			return {
				...state,
				playerRecord: action.payload
			}	

		default:
			return state
	}
}