/* eslint-disable no-constant-condition */

import { put, takeEvery } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  CONNECT_WEB_SOCKET
} from '../actionTypes'
import {
    loginRequest
} from './loginSaga';

import {
  connectWebSocket
} from './chatRoomSaga'

export default function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
  yield takeEvery(CONNECT_WEB_SOCKET, connectWebSocket);
}
