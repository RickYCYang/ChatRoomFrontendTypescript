/* eslint-disable no-constant-condition */
import { put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  axiosPost,
  axiosPostFormData
} from '../../Services/ApiService';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from '../actionTypes';


export function* signupRequest(action: any) {
  console.log('action.payload', action.payload);
  const {account, password, userName, photo} = action.payload;  
  const result = yield axiosPostFormData(
    "signup", 
    {
      email: account, 
      password: password, 
      userName: userName, 
      photo: photo
    }
  );
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