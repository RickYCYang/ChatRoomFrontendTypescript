import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getLocalStorageWithExpiry } from '../../../Services/StorageService';
import {
    SET_IMAGE_MODAL
} from '../../../redux/actionTypes'
import {
    messageInterface,
    stateInterface
} from '../../../Interfaces';

const MessageBoxText = (userMessage: messageInterface) => {
    const styleMessageBox = useSelector((state: stateInterface) => state.chatRoomReducer.styleMessageBox);
    const dispatch = useDispatch();
    const userName = getLocalStorageWithExpiry('userName');

    const openImageMadal = (): void => {
        dispatch({
            type: SET_IMAGE_MODAL,
            payload:{
                imageModalOpen: true,
                imageEncodeString: userMessage.message
            }
        })
    }
    
    const getMessage = () => {
        switch(userMessage.messageType){
            case 'string':{
                return userMessage.message
            }
            case 'image':{
                return <img src={userMessage.message} className='message-image' onClick={openImageMadal} />
            }
        }   
    }
    //console.log('userMessage', userMessage);
    return(
        <div data-testid='message-box-text' className={(styleMessageBox)?((userName === userMessage.sourceUser)? "style-message-text-mine": "style-message-text-other"): 'message-text'}>
            {   
                getMessage()
            }
        </div>
    );
}

export default MessageBoxText;