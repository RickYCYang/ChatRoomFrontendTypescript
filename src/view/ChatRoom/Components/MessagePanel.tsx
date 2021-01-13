import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import MessageBox from './MessageBox';
import {getLocalStorageWithExpiry} from '../../../Services/StorageService';
import {
    messageInterface,
    stateInterface
} from '../../../Interfaces'; 

const MessagePanel = () => {
    const userName = getLocalStorageWithExpiry('userName');
    const {messageBox, styleMessageBox, chatPeople} = useSelector((state: stateInterface) => state.chatRoomReducer);
    const messagePanelRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);
    const backgroundStyleCss: {style: string, nonStyle: string} = {
        style: 'style-messagePanel-background', 
        nonStyle: 'non-style-messagePanel-background'
    };

    useEffect(() => {
        if(messageBox && messagePanelRef.current){
            if(messagePanelRef.current.offsetHeight < messagePanelRef.current.scrollHeight
                && messagePanelRef.current.scrollTop + messagePanelRef.current.offsetHeight + 200
                > messagePanelRef.current.scrollHeight){
                    messagePanelRef.current.scrollTo({
                        behavior: "smooth", 
                        top: messagePanelRef.current?.scrollHeight - messagePanelRef.current.offsetHeight
                    });
                }
        }
    }, [messageBox]); 
    

    return(
        <div className={(styleMessageBox)? backgroundStyleCss.style: backgroundStyleCss.nonStyle}>
            <div id="messagePanel" ref={messagePanelRef}>
                {
                    messageBox.filter((userMessage:messageInterface) => {
                        if(chatPeople === 'Public' && userMessage.targetUser === 'Public'){
                            return userMessage;
                        }else if((chatPeople === userMessage.targetUser && userName === userMessage.sourceUser) ||
                                 (chatPeople === userMessage.sourceUser && userName === userMessage.targetUser)
                                ){
                                    return userMessage;
                                }
                    }).map((userMessage: messageInterface) => (
                        <MessageBox {...userMessage} key={userMessage.sourceUser + userMessage.timestamp}/>
                    ))
                }
                <div className='anchor' ref={anchorRef}></div>
            </div>
        </div>
    );
}

export default MessagePanel;