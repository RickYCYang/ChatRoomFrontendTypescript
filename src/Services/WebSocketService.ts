import webSocketClient from 'socket.io-client'
import {serverHostName} from '../config';
import {
    getLocalStorageWithExpiry,
    setLocalStorageWithExpiry
} from './StorageService';

import {
    encrypt,
    decrypt
} from './CryptoService'
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

export const sendNewMessage = (webSocket: any, messageType: string, 
    sourceUser: string, targetUser: string, message: string, timestamp: string) => {
    console.log('before encrypt', sourceUser, targetUser, message);
    console.log('after encrypt', encrypt(message));
    console.log('after decrypt', decrypt(encrypt(message)));
    console.log('socket', sourceUser, targetUser, message);
    const  encryptMessage = encrypt(JSON.stringify(
        {
            sourceUser: sourceUser,
            targetUser: targetUser,
            messageType: messageType,
            message: message,
            timestamp: timestamp
        })
    );
    webSocket.emit('sendMessage', encryptMessage);
}

export const listenUserList = (webSocket: any, dispatch: any) => {
    webSocket.on('userList', (userList: userListInterface) => {
        console.log('userList', userList);
        dispatch({
            type: SET_USER_LIST,
            payload: userList
        });
    })
}

export const listenNewMessage = (webSocket: any, dispatch: any, isMobile: boolean) => {   
    webSocket.on('newMessage', (userMessage: string) => { 
        const decryptMessage: messageInterface = JSON.parse(decrypt(userMessage));  
        setNewMessageAlarm(dispatch, decryptMessage.sourceUser, decryptMessage.targetUser);
        dispatch({
            type: SET_MESSAGE_BOX,
            payload: decryptMessage
        });
        if(!document.hasFocus() && !isMobile){  
            new Notification(decryptMessage.sourceUser, {
                body: decryptMessage.message,
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