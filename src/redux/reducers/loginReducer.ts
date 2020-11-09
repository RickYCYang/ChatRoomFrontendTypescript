import {
    SET_USER_ACCOUNT,
    SET_USER_PASSWORD,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actionTypes'

const initState: object = {
    account: '',
    password: '',
    status: '',
    email: '',
    error: '',
    userName: ''
}

const loginReducer = (state: object = initState, action: any) => {
    switch(action.type){
        case SET_USER_ACCOUNT: {
            return {...state, account: action.payload};
        }
        case SET_USER_PASSWORD: {
            return {...state, password: action.payload};
        }
        case LOGIN_REQUEST: {
            return {...state, status: 'loading'};
        }
        case LOGIN_SUCCESS: {
            return {
                ...state, 
                status: 'logined',
                email: action.payload.email,
                token: action.payload.token,
                userName: action.payload.userName
            };
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