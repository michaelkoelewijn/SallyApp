import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'


const initialState = {}
const createStoreWithMiddleware = applyMiddleware()(createStore);
export default (initialState) => 
 createStoreWithMiddleware(reducer,initialState,composeWithDevTools(applyMiddleware(thunkMiddleware)))
