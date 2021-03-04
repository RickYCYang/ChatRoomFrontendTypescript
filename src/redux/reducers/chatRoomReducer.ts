import {
    CONNECT_WEB_SOCKET,
    CONNECT_WEB_SOCKET_SUCCESS,
    CONNECT_WEB_SOCKET_FAIL,
    DISCONNECT_WEB_SOCKET,
    SET_WEB_SOCKET_IS_LISTENING,
    SET_MESSAGE_BOX,
    SET_MESSAGE_BOX_STYLE,
    SET_IS_MOBILE,
    SET_DRAWER_OPEN,
    SET_USER_LIST,
    SET_CHAT_PEOPLE,
    SET_NEW_MESSAGE_ALARM,
    SET_IMAGE_MODAL
} from '../actionTypes'
import {chatRoomState} from '../../Interfaces'

const initState: chatRoomState = {
    messageBox: [],
    webSocket: null,
    onlineCount: 0,
    connectStatus: '',
    styleMessageBox: true,
    isMobile: false,
    drawerOpen: false,
    userList: {
        userName:{
            userName: '',
            status: '',
            photo: '',
            socketId: '',
        }
    },
    chatPeople: '',
    newMessageCount: {},
    imageModalOpen: false,
    imageEncodeString: '',
    webSocketIsListening: false
}

const chatRoomReducer = (state = initState, action: any): chatRoomState => {
    switch(action.type){
        case CONNECT_WEB_SOCKET:{
            return {
                ...state,
                connectStatus: 'connecting'
            }
        }
        case CONNECT_WEB_SOCKET_SUCCESS:{
            return{
                ...state,
                connectStatus: 'connected',
                webSocket: action.payload
            }
        }
        case CONNECT_WEB_SOCKET_FAIL:{
            return{
                ...state,
                connectStatus: 'disconnect',
                webSocket: action.payload
            }
        }
        case DISCONNECT_WEB_SOCKET:{
            return{
                ...state,
                webSocket: null
            }
        }
        case SET_USER_LIST:{
            return{
                ...state,
                userList: action.payload
            }
        }
        case SET_MESSAGE_BOX:{
            return{
                ...state,
                messageBox: state.messageBox.concat(action.payload)
            }
        }
        case SET_MESSAGE_BOX_STYLE:{
            return{
                ...state,
                styleMessageBox: action.payload
            }
        }
        case SET_IS_MOBILE:{
            return{
                ...state,
                isMobile: action.payload
            }
        }
        
        case SET_DRAWER_OPEN:{
            return{
                ...state,
                drawerOpen: action.payload
            }
        }
        case SET_CHAT_PEOPLE:{
            return {
                ...state,
                chatPeople: action.payload
            }
        }
        case SET_NEW_MESSAGE_ALARM:{
            const {userName} = action.payload
            let counter = 0;
            if(action.payload.type === 'reset' || state.chatPeople === userName){
                return{
                    ...state,
                    newMessageCount: {
                        ...state.newMessageCount,
                        [userName]: counter
                    }
                }
            }else{
                Object.entries(state.newMessageCount).forEach(([key, value]) => {
                    if(key === userName && typeof value === 'number'){
                        counter = value;
                    }
                });
                return{
                    ...state,
                    newMessageCount: {
                        ...state.newMessageCount,
                        [userName]: counter + 1
                    }
                }
            }
        }
        case SET_IMAGE_MODAL: {
            return{
                ...state,
                imageModalOpen: action.payload.imageModalOpen,
                imageEncodeString: action.payload.imageEncodeString,
            }
        }
        case SET_WEB_SOCKET_IS_LISTENING: {
            return {
                ...state,
                webSocketIsListening: true
            }
        }
        default: return state;
    }
}

export default chatRoomReducer;