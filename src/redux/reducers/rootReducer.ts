import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer'
import chatRoomReducer from './chatRoomReducer';
import editReducer from './editReducer';


const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  loginReducer,
  signupReducer,
  chatRoomReducer,
  editReducer
});

export default createRootReducer;