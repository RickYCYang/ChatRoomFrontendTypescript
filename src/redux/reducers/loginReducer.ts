import {
    SET_LOGIN_ACCOUNT,
    SET_LOGIN_PASSWORD,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actionTypes'
import {loginState} from '../../Interfaces';

const initState: loginState = {
    account: '',
    password: '',
    message: '',
    status: '',
}

const loginReducer = (state = initState, action: any): loginState => {
    switch(action.type){
        case SET_LOGIN_ACCOUNT: {
            return {...state, account: action.payload};
        }
        case SET_LOGIN_PASSWORD: {
            return {...state, password: action.payload};
        }
        case LOGIN_REQUEST: {
            return {...state, status: 'loading'};
        }
        case LOGIN_SUCCESS: {
            return {...state, status: 'logined'};
        }
        case LOGIN_FAIL: {
            return {
                ...state, 
                status: 'error',
                message: action.payload.message,
            };
        }
        default: return state;
    }
}

export default loginReducer;