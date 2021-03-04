import React, { useEffect, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    CONNECT_WEB_SOCKET,
    SET_WEB_SOCKET_IS_LISTENING
} from '../../redux/actionTypes';
import {
    listenUserList,
    listenNewMessage,
} from '../../Services/WebSocketService'
import MessagePanel from './Components/MessagePanel';
import MessageSender from './Components/MessageSender';
import {stateInterface} from '../../Interfaces';

const ChatRoom = () => {  
    const dispatch = useDispatch();
    const webSocket = useSelector((state: stateInterface) => state.chatRoomReducer.webSocket);
    const isMobile = useSelector((state: stateInterface) => state.chatRoomReducer.isMobile);
    const webSocketIsListening = useSelector((state: stateInterface) => state.chatRoomReducer.webSocketIsListening);
    ///Connect web socket
    useEffect(() => {
        if(!webSocket){
            dispatch({type: CONNECT_WEB_SOCKET});
        }else if(!webSocketIsListening){
            listenUserList(webSocket, dispatch);
            listenNewMessage(webSocket, dispatch, isMobile);
            dispatch({type: SET_WEB_SOCKET_IS_LISTENING});
        }
    }, [webSocket]);

    return (
        <div id='wrap'>
            <main id='mainGrid'>
                <MessagePanel/>
                <MessageSender/>
            </main>
        </div>
    );
}

export default ChatRoom;