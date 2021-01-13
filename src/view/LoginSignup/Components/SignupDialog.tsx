import React from 'react';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
  } from '@material/react-dialog';
import Button from '@material/react-button';
import MaterialIcon from '@material/react-material-icon';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import {stateInterface} from '../../../Interfaces';

const SignupDialog = () => {
    const dispatch = useDispatch();
    const {status} = useSelector((state: stateInterface) => state.signupReducer);
    return(
        <Dialog id='signupDialog' open={status==='success'}>
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
                    onClick={() => {
                        dispatch(push('login'));
                    }}
                >Login
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default SignupDialog;