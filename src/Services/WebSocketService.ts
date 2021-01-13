import webSocketClient from 'socket.io-client'
import {serverHostName} from '../config';
import {
    getLocalStorageWithExpiry,
    setLocalStorageWithExpiry
} from './StorageService';
import {
    SET_MESSAGE_BOX,
    SET_USER_LIST,
    SET_NEW_MESSAGE_ALARM
} from '../redux/actionTypes';
import {
    messageInterface, 
    userListInterface
} from '../Interfaces'


const getUserName = (): string => {
    return getLocalStorageWithExpiry('userName');
}

export const createWebSocket = () => {
    const userName = getUserName();
    return webSocketClient(serverHostName, {query: `userName=${userName}`});
}

export const disconnectWebSocket = (webSocket: any): void => {
    const userName = getUserName();
    webSocket.disconnect(serverHostName, {query: `userName=${userName}`});
}

export const sendNewMessage = (webSocket: any, messageType: string, sourceUser: string, targetUser: string, message: string, 
    timestamp: string) => {
    //console.log('socket', sourceUser, targetUser);
    webSocket.emit('sendMessage', {
        sourceUser: sourceUser,
        targetUser: targetUser,
        messageType: messageType,
        message: message,
        timestamp: timestamp
    });
}

export const listenUserList = (webSocket: any, dispatch: any) => {
    webSocket.on('userList', (userList: userListInterface) => {
        dispatch({
            type: SET_USER_LIST,
            payload: userList
        });
    })
}

export const listenPublicMessage = (webSocket: any, dispatch: any, isMobile: boolean) => {   
    webSocket.on('newPublicMessage', (userMessage: messageInterface) => {   
        setNewMessageAlarm(dispatch, userMessage.sourceUser, userMessage.targetUser);
        dispatch({
            type: SET_MESSAGE_BOX,
            payload: userMessage
        });
        if(!document.hasFocus() && !isMobile){  
            new Notification(userMessage.sourceUser, {
                body: userMessage.message,
                icon: require('../Image/message.png'),
            }); 
        }
    });
}

export const listenPrivateMessage = (webSocket: any, dispatch: any, isMobile: boolean) => {
    webSocket.on('newPrivateMessage', (userMessage: messageInterface) => { 
        setNewMessageAlarm(dispatch, userMessage.sourceUser, userMessage.targetUser);
        dispatch({
            type: SET_MESSAGE_BOX,
            payload: userMessage
        });
       if(!document.hasFocus() && !isMobile){  
        new Notification(userMessage.sourceUser, {
            body: userMessage.message,
            icon: require('../Image/message.png'),
            }); 
        }
    });
}

const setNewMessageAlarm = (dispatch: any, sourceUser: string, targetUser: string) => {
    const userName = getUserName();
    if(userName !== sourceUser){
        dispatch({
            type: SET_NEW_MESSAGE_ALARM,
            payload: {
                type: 'append',
                userName: (targetUser === 'Public')? targetUser: sourceUser
            }
        });
    }
}