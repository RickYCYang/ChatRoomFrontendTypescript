import Cookies from 'js-cookie';
import {
    PROD_HOST_NAME,
    DEV_HOST_NAME,
    DEV_ACCESS_CONTROL_ALLOW_ORIGIN
} from './config'

const hostName: string = "https://express-chat-room-back-end.herokuapp.com" //"http://localhost:3000"
const token: string|undefined =  getCookie("token");

export function getCookie(key: string): string|undefined {    
    return Cookies.get(key);;
}

export let setCookie = (key: string, value: string): void => {
    Cookies.set(key, value, { expires: 7 });
}

export let delCookie = (key: string): void => {
    Cookies.remove(key);
}

export let fetchGet = (webApi: string): object => {
    //console.log(hostName + "/" + webApi);
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Authorization', token||'');
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
        'Access-Control-Allow-Origin': DEV_ACCESS_CONTROL_ALLOW_ORIGIN,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    };
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