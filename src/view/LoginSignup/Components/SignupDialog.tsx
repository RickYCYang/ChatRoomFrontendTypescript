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
import { SET_SUCCESS_DIALOG } from '../../../redux/actionTypes'

const SignupDialog = () => {
    const dispatch = useDispatch();
    const {successDialog} = useSelector((state: stateInterface) => state.signupReducer);

    const returnLoginHandler = useCallback((e: any) => {
        dispatch(push('login'));
        dispatch({
            type: SET_SUCCESS_DIALOG,
            payload: false
        })
    }, [successDialog]);

    return(
        <Dialog id='signupDialog' open={successDialog}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <div>Signup successfully</div>
            </DialogContent>
            <DialogFooter>
                <Button 
                    className="signup_login_btn"
                    outlined={true} 
                    raised={true} 
                    icon={<MaterialIcon role="button" icon="account_box" />}
                    onClick={returnLoginHandler}
                >Login
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default SignupDialog;