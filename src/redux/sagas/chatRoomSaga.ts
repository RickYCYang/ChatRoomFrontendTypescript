/* eslint-disable no-constant-condition */
import { put } from 'redux-saga/effects';
import {
    CONNECT_WEB_SOCKET_SUCCESS,
    CONNECT_WEB_SOCKET_FAIL
} from '../actionTypes';
import {
    createWebSocket,
} from '../../Services/WebSocketService'

export function *connectWebSocket(action: any) {
    //console.log('connectWebSocket', action);
    let webSocket = yield createWebSocket(); //webSocketClient(DEV_HOST_NAME, {query: `userName=${userName}`}); //webSocketClient('http://localhost:3000');
    if(webSocket){
        yield put({
            type: CONNECT_WEB_SOCKET_SUCCESS,
            payload: webSocket
        });
    }else{
        yield put({
            type: CONNECT_WEB_SOCKET_FAIL
        })
    }
}
