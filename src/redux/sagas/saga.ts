/* eslint-disable no-constant-condition */

import { put, takeEvery } from 'redux-saga/effects'
import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  CONNECT_WEB_SOCKET,
  LOGOUT
} from '../actionTypes'
import {
    loginRequest,
    logout
} from './loginSaga';
import {connectWebSocket} from './chatRoomSaga';
import { signupRequest } from './signupSaga';

export default function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, loginRequest);
  yield takeEvery(SIGNUP_REQUEST, signupRequest);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(CONNECT_WEB_SOCKET, connectWebSocket);
}
