import React, {useRef, useEffect} from 'react';
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
    GET_USER_ACCOUNT_REQUEST,
    SET_EDIT_USER_NAME,
    SET_EDIT_FILE_NAME,
    SET_EDIT_MESSAGE,
    EDIT_USER_INFO_REQUEST
} from '../../redux/actionTypes';
import {stateInterface} from '../../Interfaces';
import {getLocalStorageWithExpiry} from '../../Services/StorageService';
import EditDialog from './Components/EditDialog'

const Edit = () => {
    const uid: string = getLocalStorageWithExpiry('uid');
    const uploadPhotoRef = useRef<HTMLInputElement>(null);
    const newPhoto = useRef<File | null>(null);
    const dispatch = useDispatch();
    const {
        account, 
        newUserName,
        newPhotoFileName,
        successDialog,
        message,
        status
    }  = useSelector((state: stateInterface) => state.editReducer);

    useEffect(() => {
        if(!uid){
            dispatch(push('/login'));
        }
        dispatch({
            type: GET_USER_ACCOUNT_REQUEST,
            payload: {
                uid: uid
            }
        })
    }, []);

    const editUserNameHandler = (e: any): void => {
        const {value} = e.currentTarget;
        dispatch({
            type: SET_EDIT_USER_NAME,
            payload: value,
        });
    }

    const photoUploadHandler = () => {
        if(uploadPhotoRef.current?.files && uploadPhotoRef.current?.files.length > 0){
            newPhoto.current = uploadPhotoRef.current.files[0];
            dispatch({
                type: SET_EDIT_FILE_NAME,
                payload: newPhoto.current.name
            });
        }else {
            newPhoto.current = null;
            dispatch({
                type: SET_EDIT_FILE_NAME,
                payload: ''
            });
        }
    }

    const updateHandler = (): void => {        
        if(!newUserName && !newPhoto.current){
            dispatch({
                type: SET_EDIT_MESSAGE,
                payload: 'No information has been update'
            });
            return;
        }
        dispatch({
            type: EDIT_USER_INFO_REQUEST,
            payload: {
                uid: uid,
                userName: newUserName,
                photo: newPhoto.current
            }   
        });
    }

    return (
        <>
        <div id='signLoginContainer'>
            <Card id="signLoginCard">
                <CardPrimaryContent className="tittle">
                    <MaterialIcon role="button" icon="person" />
                    <span>Information</span>
                </CardPrimaryContent>
                <hr className='separate_line'/>
                <CardActions>
                    <CardActionButtons className='signup_login_info'>
                        <TextField
                            label='Email'
                            className="textField" 
                            disabled={true}
                        >
                            <Input
                                id="account"
                                type="account"
                                value={account}
                                disabled={true}
                                //onChange={inputHandler} 
                            />
                        </TextField>
                        <TextField
                            label='New Nick Name (Optional)'
                            className="textField" 
                            //helperText={<HelperText>Help Me!</HelperText>}
                            onTrailingIconSelect={(): void => {
                                dispatch({
                                    type: SET_EDIT_USER_NAME,
                                    payload: ''
                                })
                            }}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                        >
                            <Input
                                id="newUserName"
                                type="string"
                                value={newUserName}
                                onChange={editUserNameHandler} 
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
                                <span id='upload-photo-name'>{newPhotoFileName}</span>
                            </div>
                        </div>
                        <div className='signup_btn_block'>
                            <Button 
                                className="signup_login_btn"
                                outlined={true} 
                                raised={true} 
                                icon={<MaterialIcon role="button" icon="person_add" />}
                                onClick={updateHandler}
                            >Update
                            </Button>
                            <Button 
                                className="signup_login_btn"
                                outlined={true} 
                                raised={true} 
                                icon={<MaterialIcon role="button" icon="keyboard_backspace" />}
                                onClick={() => {
                                    dispatch(push('/'));
                                }}
                            >Back
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
        <EditDialog/>
        </>
    );
}

export default Edit;