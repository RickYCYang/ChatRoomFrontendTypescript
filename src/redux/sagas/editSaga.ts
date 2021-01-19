/* eslint-disable no-constant-condition */
import { put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  axiosPost,
  axiosPostFormData,
  axiosGet,
} from '../../Services/ApiService';
import {
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_FAIL,
} from '../actionTypes';

export function* getUserInfoRequest(action: any){
  const result = yield axiosGet('edit/getUserAccount', {uid: action.payload.uid});
  console.log('result', result);
  if(result.data.status === 'success'){
    yield put({
      type: GET_USER_ACCOUNT_SUCCESS,
      payload: {
        account: result.data.account
      }
    })
  }else{
    yield put({
      type: GET_USER_ACCOUNT_FAIL,
      payload:{
        status: result.data.status,
        message: result.data.message
      }
    });
  }
}

export function* editUserInfoRequest(action: any){
  console.log('action.payload', action.payload);
  const {uid, userName, password, photo} = action.payload;  
  
    console.log('sending request');
    const result = yield axiosPostFormData(
      "edit", 
      {
        uid: uid, 
        password: password, 
        userName: userName, 
        photo: photo
      }
    );
    console.log('result', result);
  
}
