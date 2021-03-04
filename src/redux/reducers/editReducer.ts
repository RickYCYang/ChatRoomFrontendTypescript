import {
    GET_USER_ACCOUNT_SUCCESS,
    GET_USER_ACCOUNT_FAIL,
    EDIT_USER_INFO_SUCCESS,
    EDIT_USER_INFO_FAIL,
    SET_EDIT_USER_NAME,
    SET_EDIT_FILE_NAME,
    SET_EDIT_MESSAGE,
    SET_EDIT_SUCCESS_DIALOG
} from '../actionTypes'
import {editState} from '../../Interfaces';

const initState: editState = {
    account: '',
    newUserName: '',
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
        case EDIT_USER_INFO_FAIL: {
            return {
                ...state
            }
        }
        case EDIT_USER_INFO_SUCCESS: {
            return {
                ...state,
                successDialog: true
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
        case SET_EDIT_SUCCESS_DIALOG: {
            return {
                ...state,
                successDialog: action.payload
            }
        }
        default: return state;
    }
}

export default editReducer;