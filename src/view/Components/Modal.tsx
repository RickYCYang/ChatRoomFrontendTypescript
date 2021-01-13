import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {stateInterface} from '../../Interfaces';
import {SET_IMAGE_MODAL} from '../../redux/actionTypes';

const Modal = () => {
    const {imageModalOpen, imageEncodeString} = useSelector((state: stateInterface) => state.chatRoomReducer);
    const dispatch = useDispatch();
    const closeModal = useCallback((): void => {
        dispatch({
            type: SET_IMAGE_MODAL,
            payload:{
                imageModalOpen: false,
                imageEncodeString: ''
            }
        })
    }, []);
    return(
        <div id="myModal" className="modal" style={{display: (imageModalOpen)? 'block': 'none'} }>
            <span className="close" style={{color: 'white'}} onClick={closeModal}>&times;</span>
            <img className="modal-content" alt='messageImage' src={imageEncodeString} />
        </div>
    );
}

export default Modal;