import React from 'react';
import MaterialIcon from '@material/react-material-icon';
import {messageInterface} from '../../../Interfaces';

const MessageBoxUserInfo = (userMessage: messageInterface) => {
    return(
        <div className='message-box-userInfo'>
            <MaterialIcon role="button" icon="account_circle" className="account_icon"/>
            <span data-testid="userNname-timestamp">
                {userMessage.sourceUser}({userMessage.timestamp})
            </span>
        </div>
    );
}

export default MessageBoxUserInfo;