const initialState = {
    list: []
}

export default function(state = initialState, action) {
	switch (action.type) {
        case 'ADD_ITEM':

            let newRecord = {
                id: Date.now(),
                text: action.payload
            }

            return {
                ...state,
                list: [...state.list, newRecord]
            }
		default:
			return state;
	}
}