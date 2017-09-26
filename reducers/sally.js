const initialState = {
    timer: 0
}

export default function(state = initialState, action) {
	switch (action.type) {
        case 'INIT_TIMER':
            return state;
		default:
			return state;
	}
}