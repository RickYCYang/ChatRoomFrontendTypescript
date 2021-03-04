import React, { useCallback } from 'react';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
  } from '@material/react-dialog';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { stateInterface } from '../../../Interfaces';
import { SET_EDIT_SUCCESS_DIALOG } from '../../../redux/actionTypes'

const EditDialog = () => {
    const dispatch = useDispatch();
    const successDialog = useSelector((state: stateInterface) => state.editReducer.successDialog);

    const returnChatRoomHandler = useCallback((e: any) => {
        dispatch(push('/'));
        dispatch({
            type: SET_EDIT_SUCCESS_DIALOG,
            payload: false
        })
    }, [successDialog]);

    return(
        <Dialog id='signupDialog' open={successDialog}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <div>Update account information successfully</div>
            </DialogContent>
            <DialogFooter>
                <Button 
                    className="signup_login_btn"
                    outlined={true} 
                    raised={true} 
                    icon={<MaterialIcon role="button" icon="account_box" />}
                    onClick={returnChatRoomHandler}
                >Chatroom
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default EditDialog;