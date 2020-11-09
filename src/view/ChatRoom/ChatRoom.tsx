import React, { useEffect, useCallback, useState } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import {
    CONNECT_WEB_SOCKET,
    SET_ONLINE_COUNT
} from '../../redux/actionTypes'

import MessagePanel from './Components/MessagePanel';
import MessageSender from './Components/MessageSender';


interface stateInterface {
    chatRoomReducer:{
        webSocket: any,
        onlineCount: number
    }
}

const ChatRoom = () => {  
    const dispatch = useDispatch();
    const {webSocket, onlineCount} = useSelector((state: stateInterface) => state.chatRoomReducer)
    useEffect(() => {
        if(webSocket){
            initWebSocket();
        }else{
            dispatch({
                type: CONNECT_WEB_SOCKET,
            });
        }
    }, [webSocket]);

    const initWebSocket = () => {
        console.log('initWebSocket');
        webSocket.on('online', (onlineCount: number) => {
            console.log('onlineCount', onlineCount);
            dispatch({
                type: SET_ONLINE_COUNT,
                payload: onlineCount
            });
        });

        webSocket.on('msg', (message: object) => {
            console.log('message', message)
            dispatch({
                type: 'SET_MESSAGE_BOX',
                payload: message
            });
        });
    }

    return (
    <Grid id='mainGrid'>
        <Row>
            <Cell columns={12}>
                <MessagePanel/>
            </Cell>
        </Row>
        <Row>
            <Cell columns={12}>
                <MessageSender/>
            </Cell>
        </Row>
    </Grid>
    );
}

export default ChatRoom;