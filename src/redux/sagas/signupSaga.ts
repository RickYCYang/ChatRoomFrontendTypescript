/* eslint-disable no-constant-condition */
import { put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  axiosPost
} from '../../Services/ApiService';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from '../actionTypes';


export function* signupRequest(action: any) {
  const {account, password, userName} = action.payload;
  const result = yield axiosPost("signup", {email: account, password: password, userName: userName});
  const {status, message} = result.data;
  console.log('result', result);
  if(status === "error"){
    console.log('Fail:', result);
    yield put({ 
      type: SIGNUP_FAIL,
      payload: {
        message: message
      }
    })
  }else if(status === "success"){
    console.log('Signup success');
    yield put({ type: SIGNUP_SUCCESS });
  }
}
