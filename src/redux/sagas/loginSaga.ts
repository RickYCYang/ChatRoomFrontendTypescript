/* eslint-disable no-constant-condition */
import { put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  fetchGet,
  fetchPost
} from '../../ApiService';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actionTypes';

import {
  setCookie
} from '../../ApiService'

export function* loginRequest(action: any) {
  let {account, password} = action.payload;
  let result = yield fetchPost("login", {email: account, password: password});
  if(result.status === "fail"){
    console.log('Fail:', result);
    yield put({ 
      type: LOGIN_FAIL,
      payload: {
        message: result.message
      }
    })
  }else if(result.status === "success"){
    console.log('success:', result);
    yield put({ 
      type: LOGIN_SUCCESS,
      payload: {
        token: result.token,
        email: result.email,
        userName: result.userName
      }
    });
    yield setCookie('token', result.token);
    yield setCookie('userName', result.userName);
    yield put(push('/'));
  }
}
