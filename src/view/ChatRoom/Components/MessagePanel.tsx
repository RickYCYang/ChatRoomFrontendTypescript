import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import MaterialIcon from '@material/react-material-icon';
import { getCookie } from '../../../ApiService';
import MessageBox from './MessageBox';

interface stateInterface{
    chatRoomReducer:{
        webSocket: any,
        onlineCount: number,
        messageBox: any
    }
}

interface message{
    userName: string,
    timestamp: string,
    message: string
}

const MessagePanel = () => {
    const {messageBox} = useSelector((state: stateInterface) => state.chatRoomReducer);
    const userName = getCookie('userName');
    console.log('userName', userName);
    let messagesEnd: any;

    useEffect(() => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    }) 

    return(
        <div id="messagePanel-bg">
            <div id="messagePanel">
                {
                    
                    messageBox.map((message: message) => (
                        <Row key={"row" + message.userName + message.timestamp}>
                            <Cell columns={12}>
                                <div className={(userName === message.userName)? "messageBox_mine": "messageBox_other"}>
                                    <MaterialIcon role="button" icon="account_circle" className="account_icon"/>
                                    <span>{message.userName}({message.timestamp})</span>
                                    <div className={(userName === message.userName)? "message_mine": "message_other"}>
                                        {message.message}
                                    </div>
                                </div>
                            </Cell>
                        </Row>
                    ))
                    
                }
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { messagesEnd = el; }}>
                </div>
            </div>
        </div>
    );
}

export default MessagePanel;