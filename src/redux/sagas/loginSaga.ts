/* eslint-disable no-constant-condition */
import { put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  axiosPost
} from '../../Services/ApiService';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  DISCONNECT_WEB_SOCKET
} from '../actionTypes';
import {
  setLocalStorageWithExpiry,
  //getLocalStorageWithExpiry,
  removeLocalStorage,
} from '../../Services/StorageService'

import {
  disconnectWebSocket
} from '../../Services/WebSocketService';

export function* loginRequest(action: any) {
  let {account, password} = action.payload;
  console.log(account, password);
  let result = yield axiosPost("login", {email: account, password: password});
  //console.log(result);
  if(result.data.status === "fail"){
    console.log('Fail:', result);
    yield put({ 
      type: LOGIN_FAIL,
      payload: {
        message: result.data.message
      }
    })
  }else if(result.data.status === "success"){
    console.log('success:', result);
    const {token, userName} = result.data;
    yield setLocalStorageWithExpiry('token', token, 1);
    yield setLocalStorageWithExpiry('userName', userName, 1);
    yield put({ type: LOGIN_SUCCESS });
    yield put(push('/'));
  }
}

export function *logout(action: any){
  console.log('logout action', action);
  const webSocket = action.payload;
  yield removeLocalStorage('userName');
  yield removeLocalStorage('token');
  yield disconnectWebSocket(webSocket);
  yield put({type: DISCONNECT_WEB_SOCKET});
  yield put(push('/login'));
}
