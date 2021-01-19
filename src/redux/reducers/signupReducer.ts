import {
    SET_SIGNUP_ACCOUNT,
    SET_SIGNUP_PASSWORD,
    SET_SIGNUP_CONFIRM_PASSWORD,
    SET_SIGNUP_USERNAME,
    SET_SIGNUP_MESSAGE,
    SET_SIGNUP_UPLOAD_FILE_NAME,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SET_SUCCESS_DIALOG,
    SIGNUP_FAIL,
} from '../actionTypes'

import {signupState} from './../../Interfaces'

const initState: signupState = {
    account: '',
    userName: '',
    password: '',
    confirmPassword: '',
    message: '',
    status: '',
    fileName: '',
    successDialog: false
}

const loginReducer = (state = initState, action: any): signupState => {
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
        case SET_SIGNUP_UPLOAD_FILE_NAME:{
            return {...state, fileName: action.payload}
        }
        case SIGNUP_REQUEST: {
            return {...state, status: 'processing'};
        }
        case SIGNUP_SUCCESS: {
            return {...state, status: 'success', successDialog: true, message: '', fileName: ''};
        }
        case SET_SUCCESS_DIALOG: {
            return {...state, successDialog: action.payload, message: '', fileName: ''}
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