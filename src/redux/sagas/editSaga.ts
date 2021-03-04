/* eslint-disable no-constant-condition */
import { put } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  axiosPost,
  axiosPostFormData,
  axiosPatchFormData,
  axiosGet,
} from '../../Services/ApiService';
import {
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAIL,
  GET_USER_ACCOUNT_SUCCESS,
  GET_USER_ACCOUNT_FAIL
} from '../actionTypes';
import {
  setLocalStorageWithExpiry
} from '../../Services/StorageService'

export function* getUserInfoRequest(action: any){
  try{
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
  }catch(err){
    console.log('error occurs')
    yield put({
      type: GET_USER_ACCOUNT_FAIL,
      payload:{
        status: 'error',
        message: 'Error occurs when geting user account'
      }
    });
  }
}

export function* editUserInfoRequest(action: any){
  console.log('action.payload', action.payload);
  const {uid, userName, photo} = action.payload;  
  
    console.log('sending request');
    const result = yield axiosPatchFormData(
      "edit", 
      {
        uid: uid, 
        userName: userName, 
        photo: photo
      }
    );
    if(result.data.status === 'success'){
      yield setLocalStorageWithExpiry('userName', userName, 1);
      yield put({
        type: EDIT_USER_INFO_SUCCESS,
        payload: {
          status: result.data.status
        }
      })
    }else{
      yield put({
        type: EDIT_USER_INFO_FAIL,
        payload: {
          message: result.data.message,
          account: result.data.status
        }
      })
    }
    console.log('result', result);
  
}
