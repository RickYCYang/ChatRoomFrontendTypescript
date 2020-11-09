import {
    CONNECT_WEB_SOCKET,
    CONNECT_WEB_SOCKET_SUCCESS,
    CONNECT_WEB_SOCKET_FAIL,
    SET_ONLINE_COUNT,
    SET_MESSAGE_BOX
} from '../actionTypes'

const initState = {
    messageBox: [],
    webSocket: '',
    onlineCount: 0,
    connectStatus: '',
}

const chatRoomReducer = (state = initState, action: any) => {
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
        case SET_ONLINE_COUNT:{
            return{
                ...state,
                onlineCount: action.payload
            }
        }
        case SET_MESSAGE_BOX:{
            return{
                ...state,
                messageBox: state.messageBox.concat(action.payload)
            }
        }
        default: return state;
    }
}

export default chatRoomReducer;