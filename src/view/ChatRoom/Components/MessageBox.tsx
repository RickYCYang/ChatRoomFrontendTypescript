import React, {useState, useEffect} from 'react';
import MaterialIcon from '@material/react-material-icon';
import { getCookie } from '../../../ApiService';
import {Cell, Row} from '@material/react-layout-grid';

interface message{
    userName: string,
    timestamp: string,
    message: string
}

const MessageBox = (message: message) => {
    const userName = getCookie('userName');
    return(
        <div style={{float: (userName !== message.userName)? 'left': 'right'}}>
            <MaterialIcon role="button" icon="account_circle" className="account_icon"/>
            <span className="message">{message.userName}({message.timestamp}): {message.message}</span>
        </div>
    );
}

export default MessageBox