import {
    GET_USER_ACCOUNT_SUCCESS,
    GET_USER_ACCOUNT_FAIL,
    SET_EDIT_USER_NAME,
    SET_EDIT_PASSWORD,
    SET_EDIT_CONFIRM_PASSWORD,
    SET_EDIT_FILE_NAME,
    SET_EDIT_MESSAGE
} from '../actionTypes'
import {editState} from '../../Interfaces';

const initState: editState = {
    account: '',
    newPassword: '',
    newUserName: '',
    confirmNewPassword: '',
    newPhotoFileName: '',
    successDialog: false,
    message: '',
    status: '',
}

const editReducer = (state = initState, action: any): editState => {
    switch(action.type){
        case GET_USER_ACCOUNT_SUCCESS: {
            return {
                ...state,
                account: action.payload.account
            }
        }
        case GET_USER_ACCOUNT_FAIL: {
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message
            }
        }
        case SET_EDIT_USER_NAME: {
            return {
                ...state,
                newUserName: action.payload
            }
        }
        case SET_EDIT_PASSWORD: {
            return {
                ...state,
                newPassword: action.payload
            }
        }
        case SET_EDIT_CONFIRM_PASSWORD: {
            return {
                ...state,
                confirmNewPassword: action.payload
            }
        }
        case SET_EDIT_FILE_NAME: {
            return {
                ...state,
                newPhotoFileName: action.payload
            }
        }
        case SET_EDIT_MESSAGE: {
            return {
                ...state,
                message: action.payload
            }
        }
        default: return state;
    }
}

export default editReducer;