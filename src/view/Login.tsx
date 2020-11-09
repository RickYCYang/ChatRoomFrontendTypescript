import React, {useCallback, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import Card, {
    CardPrimaryContent,
    CardMedia,
    CardActions,
    CardActionButtons,
} from "@material/react-card";
import Button from '@material/react-button';
import TextField, {Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import {
    getCookie
} from '../ApiService'; 
import { push } from 'connected-react-router'
import {
    SET_USER_ACCOUNT,
    SET_USER_PASSWORD,
    LOGIN_REQUEST
} from '../redux/actionTypes';

interface stateInterface {
    loginReducer:{
        account: string,
        password: string,
        status: string,
        message: string
    }
}

const Login = () => {
    const dispatch = useDispatch();
    const {account, password, status, message} = useSelector((state: stateInterface) => state.loginReducer);
    const token =  getCookie('token');
    
    let setAccountPassword = (e: any): void => {
        const {id, value} = e.currentTarget;
        switch(id){
            case "account":
                dispatch({
                    type: SET_USER_ACCOUNT,
                    payload: value,
                });
            case "password":
                dispatch({
                    type: SET_USER_PASSWORD,
                    payload: value,
                });
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
    
    useEffect((): any => {
        checkLogined();
    }, [token]);

    const checkLogined = useCallback((): any => {
        console.log('checkLogined', token !== undefined);
        if(token) {
            dispatch(push('/'));
        }
    }, [token]);

    return(
    <Grid>        
        <Row>    
            <Cell columns={3} />
            <Cell columns={6}>
                <Card id="loginCard">
                    <CardPrimaryContent id="tittle">
                        <h1>Rick's Chat Room: Beta</h1>
                        <CardMedia id="logoImg" square imageUrl={require('../Image/chat.png')} />   
                    </CardPrimaryContent>
                    <CardActions style={{display: "block"}}>
                        <CardActionButtons id="textFieldArea">
                            <TextField
                                label='Email'
                                className="textField" 
                                //helperText={<HelperText>Help Me!</HelperText>}
                                //onTrailingIconSelect={() => setAccount("")}
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
                                //onTrailingIconSelect={() => setPassword("")}
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
                                    className="loginBtn"
                                    outlined={true} 
                                    raised={true} 
                                    icon={<MaterialIcon role="button" icon="login" />}
                                    onClick={loginHandler}
                                >Login
                                </Button>
                                <Button 
                                    className="loginBtn"
                                    outlined={true} 
                                    raised={true} 
                                    disabled={true}
                                    icon={<MaterialIcon role="button" icon="account_box" />}
                                    onClick={() => {}}
                                >Signup
                                </Button>
                            </div>
                        </CardActionButtons>
                    </CardActions>
                    {(status === "error")?(
                        <div>
                            <p className='warnMsg'>{message}</p>
                        </div>
                    ): []}
                </Card>
            </Cell>
            <Cell columns={3} />
        </Row>
    </Grid>
    )
}

export default Login;