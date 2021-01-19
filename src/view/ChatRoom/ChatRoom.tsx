import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    CONNECT_WEB_SOCKET
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
    const {webSocket, isMobile} = useSelector((state: stateInterface) => state.chatRoomReducer);
    
    ///Connect web socket
    useEffect(() => {
        if(webSocket){
            listenUserList(webSocket, dispatch);
            listenNewMessage(webSocket, dispatch, isMobile);
        }else{
            dispatch({type: CONNECT_WEB_SOCKET});
        }
    }, [webSocket]);

    return (
        <main id='mainGrid'>
            <MessagePanel/>
            <MessageSender/>
        </main>
    );
}

export default ChatRoom;