import {
    SET_SIGNUP_ACCOUNT,
    SET_SIGNUP_PASSWORD,
    SET_SIGNUP_CONFIRM_PASSWORD,
    SET_SIGNUP_USERNAME,
    SET_SIGNUP_MESSAGE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from '../actionTypes'

const initState: object = {
    account: '',
    userName: '',
    password: '',
    confirmPassword: '',
    message: '',
    status: '',
}

const loginReducer = (state: object = initState, action: any) => {
    switch(action.type){
        case SET_SIGNUP_ACCOUNT: {
            return {...state, account: action.payload};
        }
        case SET_SIGNUP_PASSWORD: {
            return {...state, password: action.payload};
        }
        case SET_SIGNUP_USERNAME: {
            return {...state, userName: action.payload};
        }
        case SET_SIGNUP_CONFIRM_PASSWORD: {
            return {...state, confirmPassword: action.payload};
        }
        case SET_SIGNUP_MESSAGE:{
            return {...state, message: action.payload}
        }
        case SIGNUP_REQUEST: {
            return {...state, status: 'processing'};
        }
        case SIGNUP_SUCCESS: {
            return {...state, status: 'success'};
        }
        case SIGNUP_FAIL: {
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