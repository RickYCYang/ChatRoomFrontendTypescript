import React, {useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card, {
    CardPrimaryContent,
    CardActions,
    CardActionButtons,
} from "@material/react-card";
import Button from '@material/react-button';
import TextField, {Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import { push } from 'connected-react-router';
import {
    SET_SIGNUP_ACCOUNT,
    SET_SIGNUP_PASSWORD,
    SET_SIGNUP_CONFIRM_PASSWORD,
    SET_SIGNUP_USERNAME,
    SET_SIGNUP_MESSAGE,
    SET_SIGNUP_UPLOAD_FILE_NAME,
    SIGNUP_REQUEST
} from '../../redux/actionTypes';
import SignupDialog from './Components/SignupDialog';
import {stateInterface} from '../../Interfaces';
import {compressImage} from './../../Services/CommonService';

const Signup = () => {
    const dispatch = useDispatch();
    const uploadPhotoRef = useRef<HTMLInputElement>(null);
    const photo = useRef<File | null>(null);
    const {account, password, confirmPassword, userName, status, message, fileName} = useSelector((state: stateInterface) => state.signupReducer);

    const inputHandler = (e: any): void => {
        const {id, value} = e.currentTarget;
        switch(id){
            case "account":
                dispatch({
                    type: SET_SIGNUP_ACCOUNT,
                    payload: value,
                });
                break;
            case "password":
                dispatch({
                    type: SET_SIGNUP_PASSWORD,
                    payload: value,
                });
                break;
            case "confirmPassword":
                dispatch({
                    type: SET_SIGNUP_CONFIRM_PASSWORD,
                    payload: value,
                });
                break;
            case "userName":
                dispatch({
                    type: SET_SIGNUP_USERNAME,
                    payload: value,
                });
                break;
        }
    }

    const signupHandler = (): void => {
        console.log('photo', photo.current);
        console.log('signup', account, password, confirmPassword, userName);
        if(!account || !password || !confirmPassword || !userName){
            dispatch({
                type: SET_SIGNUP_MESSAGE,
                payload: 'Please fill in all information'
            });
            return;
        }
        if(confirmPassword !== password){
            dispatch({
                type: SET_SIGNUP_MESSAGE,
                payload: 'Passwords are not same!'
            });
            return;
        }
        if(account.indexOf('@') <= 0){
            dispatch({
                type: SET_SIGNUP_MESSAGE,
                payload: 'Invalid email!'
            });
            return;
        }
        if(!photo.current){
            dispatch({
                type: SET_SIGNUP_MESSAGE,
                payload: 'Please upload one photo'
            });
            return;
        }
        
        dispatch({
            type: SIGNUP_REQUEST,
            payload: {
                account: account,
                password: password,
                userName: userName,
                photo: photo.current
            }   
        });
    }

    const photoUploadHandler = async() => {
        if(uploadPhotoRef.current?.files && uploadPhotoRef.current?.files.length > 0){
            photo.current = uploadPhotoRef.current.files[0];
            dispatch({
                type: SET_SIGNUP_UPLOAD_FILE_NAME,
                payload: photo.current.name
            });
        }else {
            photo.current = null;
            dispatch({
                type: SET_SIGNUP_UPLOAD_FILE_NAME,
                payload: ''
            });
        }
    }

    return (
        <>
        <div id='signLoginContainer'>
            <Card id="signLoginCard">
                <CardPrimaryContent className="tittle">
                    <MaterialIcon role="button" icon="person" />
                    <a>Signup+</a>
                </CardPrimaryContent>
                <hr className='separate_line'/>
                <CardActions>
                    <CardActionButtons className='signup_login_info'>
                        <TextField
                            label='Email'
                            className="textField" 
                            //helperText={<HelperText>Help Me!</HelperText>}
                            onTrailingIconSelect={(): void => {
                                dispatch({
                                    type: SET_SIGNUP_ACCOUNT,
                                    payload: ''
                                })
                            }}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                        >
                            <Input
                                id="account"
                                type="account"
                                value={account}
                                onChange={inputHandler} 
                            />
                        </TextField>
                        <TextField
                            label='Nick Name'
                            className="textField" 
                            //helperText={<HelperText>Help Me!</HelperText>}
                            onTrailingIconSelect={(): void => {
                                dispatch({
                                    type: SET_SIGNUP_USERNAME,
                                    payload: ''
                                })
                            }}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                        >
                            <Input
                                id="userName"
                                type="string"
                                value={userName}
                                onChange={inputHandler} 
                            />
                        </TextField>
                        <TextField
                            label='Password'
                            className="textField"  
                            //helperText={<HelperText>Help Me!</HelperText>}
                            onTrailingIconSelect={ (): void => {
                                dispatch({
                                    type: SET_SIGNUP_PASSWORD,
                                    payload: ''
                                })
                            }}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                        >
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={inputHandler} 
                            />
                        </TextField>
                        <TextField
                            label='Confirm Password'
                            className="textField"  
                            //helperText={<HelperText>Help Me!</HelperText>}
                            onTrailingIconSelect={ (): void => {
                                dispatch({
                                    type: SET_SIGNUP_CONFIRM_PASSWORD,
                                    payload: ''
                                })
                            }}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                        >
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={inputHandler} 
                            />
                        </TextField>
                        <div className='textField'>
                            <div className='upload-image-div' style={{borderBottom: '1px solid darkgray'}}>
                                <Button 
                                    className="upload-image-btn"
                                    outlined={true} 
                                    raised={true} 
                                    icon={<MaterialIcon role="button" icon="image" />}
                                    onClick={() => {uploadPhotoRef.current?.click();}}
                                >Photo
                                </Button>
                                <input 
                                    type='file' 
                                    className={'input-element'} 
                                    ref={uploadPhotoRef} 
                                    accept="image/*" 
                                    onChange={photoUploadHandler}
                                />
                                <span id='upload-photo-name'>{fileName}</span>
                            </div>
                        </div>
                        <div className='signup_btn_block'>
                            <Button 
                                className="signup_login_btn"
                                outlined={true} 
                                raised={true} 
                                icon={<MaterialIcon role="button" icon="person_add" />}
                                onClick={signupHandler}
                            >Signup
                            </Button>
                            <Button 
                                className="signup_login_btn"
                                outlined={true} 
                                raised={true} 
                                icon={<MaterialIcon role="button" icon="keyboard_backspace" />}
                                onClick={() => {
                                    dispatch(push('login'));
                                }}
                            >login
                            </Button>
                        </div>
                    </CardActionButtons>
                </CardActions>
                {(status === "error" || message !== "")?(
                    <div className='warnMsg'>
                        <p>{message}</p>
                    </div>
                ): []}
            </Card>
        </div>
        <SignupDialog/>
        </>
    );
}

export default Signup;