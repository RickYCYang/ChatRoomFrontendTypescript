import {
    serverHostName,
    DEV_ACCESS_CONTROL_ALLOW_ORIGIN
} from '../config'

import {
    getCookie
} from './StorageService';

import axios, {AxiosRequestConfig} from 'axios';

axios.defaults.baseURL = serverHostName;
//axios.defaults.headers.get['Content-Type'] = 'application/json';
//axios.defaults.headers.get['Accept'] = 'application/json';

//axios.defaults.headers.post['Accept'] = 'application/json';
//axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//axios.defaults.headers.Origin = 'http://localhost:3001';
//axios.defaults.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001'; //serverHostName;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; // default
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'; // default


export const axiosGet = (url: string, params: object): object => {
    console.log('url', url, params);
    console.log('hostname', axios.defaults.baseURL);
    let config: AxiosRequestConfig = {
        params: params
    }
    return axios.get(url, config);
}

export const axiosPost = (url: string, data: object): object => {
    return axios.post(url, data);
}

export const axiosPostFormData = (url: string, data: any): object => {
    console.log('data', data);
    let config: AxiosRequestConfig = {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]: any) => {
        //console.log(key, value);
        formData.append(key, value);
    });
    return axios.post(url, formData, config);
}

export const axiosPatchFormData = (url: string, data: any): object => {
    console.log('data', data);
    let config: AxiosRequestConfig = {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]: any) => {
        //console.log(key, value);
        formData.append(key, value);
    });
    return axios.patch(url, formData, config);
}

export default axios;

/*
export let fetchGet = (webApi: string): object => {
    //console.log(hostName + "/" + webApi);
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('Content-Type', 'application/json');
    //requestHeaders.set('Authorization', token||'');
    return fetch(DEV_HOST_NAME + "/" + webApi, {
        method: 'GET',
        //dataType: 'jsonp',
        headers: requestHeaders
    }).then(
      (response: any) => {
          return response.json();
      }).then((result) => {
        return result;
      }).catch((error) => {
          console.log("fetchGet: " + webApi, error);
      }
    );   
}

export let fetchPost = (webApi: string, data: object) => {
    //console.log("web api", PROD_HOST_NAME + "/" + webApi);
    const requestHeaders: any = {
        //'Access-Control-Allow-Origin': DEV_ACCESS_CONTROL_ALLOW_ORIGIN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Authorization': token
    };
    //Dev: DEV_HOST_NAME, Prod: PROD_HOST_NAME
    return fetch(DEV_HOST_NAME + "/" + webApi,{
        method: 'POST',
        headers: requestHeaders,
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(
      (response) => {
          return response.json();
      }).then((result) => {
        return result;
      }).catch((error) => {
          console.log("fetchPost", error);
      }
    );   
}
*/