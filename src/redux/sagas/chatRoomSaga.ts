/* eslint-disable no-constant-condition */
import { put } from 'redux-saga/effects';

import {
    CONNECT_WEB_SOCKET_SUCCESS,
    CONNECT_WEB_SOCKET_FAIL

} from '../actionTypes';
import webSocketClient from 'socket.io-client'
import {
    PROD_HOST_NAME,
    DEV_HOST_NAME
} from '../../config'



export function *connectWebSocket(action: any) {
    console.log('connectWebSocket', action);
    let webSocket = yield webSocketClient(DEV_HOST_NAME); //webSocketClient('http://localhost:3000');
    if(webSocket){
        yield put({
            type: CONNECT_WEB_SOCKET_SUCCESS,
            payload: webSocket
        })
    }else{
        yield put({
            type: CONNECT_WEB_SOCKET_FAIL
        })
    }
}
