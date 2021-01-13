import React from 'react';
import { getLocalStorageWithExpiry } from '../../../Services/StorageService';
import MessageBoxUserInfo from './MessageBoxUserInfo';
import MessageBoxText from './MessageBoxText';
import {messageInterface} from '../../../Interfaces';

const MessageBox = React.memo((userMessage: messageInterface) => {
    const userName = getLocalStorageWithExpiry('userName');
    return(
        <div 
            className={(userName === userMessage.sourceUser)? "message-box-mine": "message-box-other"}>
            <MessageBoxUserInfo {...userMessage} />
            <MessageBoxText {...userMessage} />
        </div>
    );
}, (prevProps: messageInterface, nextProps: messageInterface): boolean => {
    return (prevProps.sourceUser === nextProps.sourceUser && prevProps.timestamp === nextProps.timestamp);
});

export default MessageBox