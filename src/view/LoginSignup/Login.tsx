import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Card, {
    CardPrimaryContent,
    CardMedia,
    CardActions,
    CardActionButtons,
} from "@material/react-card";
import Button from '@material/react-button';
import TextField, {Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import { push } from 'connected-react-router'
import {
    SET_LOGIN_ACCOUNT,
    SET_LOGIN_PASSWORD,
    LOGIN_REQUEST
} from '../../redux/actionTypes';
import {getLocalStorageWithExpiry} from '../../Services/StorageService';
import {
    stateInterface,
    keyInterface
} from '../../Interfaces';


const Login = () => {
    const dispatch = useDispatch();
    const {account, password, status, message} = useSelector((state: stateInterface) => state.loginReducer);
    const token = getLocalStorageWithExpiry('token')

    let setAccountPassword = (e: any): void => {
        const {id, value} = e.currentTarget;
        switch(id){
            case "account":
                dispatch({
                    type: SET_LOGIN_ACCOUNT,
                    payload: value,
                });
                break;
            case "password":
                dispatch({
                    type: SET_LOGIN_PASSWORD,
                    payload: value,
                });
                break;
        }
    }
    
    let loginHandler = (): void => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                account: account,
                password: password
            }   
        })
    }
    
    ///Check if is logined
    useEffect((): void => {
        if(token){
            dispatch(push('/'));
        }
    }, [token]);

    const enterClick = (key: keyInterface): void => {
        if(key.key === 'Enter'){
            loginHandler();
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', enterClick);
        return () => {
            document.removeEventListener('keypress', enterClick);
        }
    }, [account, password]);

    return(
        <div id='signLoginContainer'>
            <Card id="signLoginCard">
                <CardPrimaryContent className="tittle">
                    <MaterialIcon role="button" icon="person" />
                    <a>Login</a>
                </CardPrimaryContent>
                <hr className='separate_line'/>
                <CardMedia id="login_logo" square imageUrl={require('../../Image/chat.png')} />   
                <CardActions>
                    <CardActionButtons className='signup_login_info'>
                        <TextField
                            label='Email'
                            className="textField" 
                            //helperText={<HelperText>Help Me!</HelperText>}
                            onTrailingIconSelect={(): void => {
                                dispatch({
                                    type: SET_LOGIN_ACCOUNT,
                                    payload: ''
                                })
                            }}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                        >
                            <Input
                                id="account"
                                type="email"
                                value={account}
                                onChange={setAccountPassword} 
                            />
                        </TextField>
                        <TextField
                            label='Password'
                            className="textField"  
                            //helperText={<HelperText>Help Me!</HelperText>}
                            onTrailingIconSelect={ (): void => {
                                dispatch({
                                    type: SET_LOGIN_PASSWORD,
                                    payload: ''
                                })
                            }}
                            trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                        >
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={setAccountPassword} 
                            />
                        </TextField>
                        <div>
                            <Button 
                                className="signup_login_btn"
                                outlined={true} 
                                raised={true} 
                                icon={<MaterialIcon role="button" icon="login" />}
                                onClick={loginHandler}
                            >Login
                            </Button>
                            <Button 
                                className="signup_login_btn"
                                outlined={true} 
                                raised={true} 
                                icon={<MaterialIcon role="button" icon="account_box" />}
                                onClick={() => {
                                    dispatch(push('signup'));
                                }}
                            >Signup
                            </Button>
                        </div>
                    </CardActionButtons>
                </CardActions>
                {(status === "error")?(
                    <div className='warnMsg'>
                        <p>{message}</p>
                    </div>
                ): []}
            </Card>
        </div>
    )
}

export default Login;