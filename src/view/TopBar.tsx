import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import TopAppBar, {
    TopAppBarIcon,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
  } from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import {
    SET_DRAWER_OPEN,
    LOGOUT
} from '../redux/actionTypes';
import {stateInterface} from '../Interfaces';


const TopBar = () => {
    const dispatch = useDispatch();
    const {drawerOpen, webSocket, chatPeople, userList} = useSelector((state: stateInterface) => state.chatRoomReducer);
    
    /// Turn on/off drawer
    const showDrawerHandler = () => {
        dispatch({
            type: SET_DRAWER_OPEN,
            payload: !drawerOpen
        })
    }

    /// Logout handler
    const logoutHandler = (): void => {
        dispatch({
            type: LOGOUT,
            payload: webSocket
        })
    };

    const getOnlinePeople = useCallback(() => {
        return Object.values(userList).filter((item) => item.status === 'online').length;
    }, [userList]);

    return(
        <TopAppBar>
            <TopAppBarRow>
                <TopAppBarSection align='start'>
                    <TopAppBarIcon navIcon tabIndex={0}>
                        <MaterialIcon hasRipple icon='menu' onClick={showDrawerHandler}/>
                    </TopAppBarIcon>
                    <TopAppBarTitle tabIndex={1}>
                        Chat Room
                        <MaterialIcon 
                            hasRipple 
                            icon='chat' 
                        />
                    </TopAppBarTitle>
                </TopAppBarSection>
                <TopAppBarSection>
                    <div id='chat-people-block'>
                        <p id='chat-people'> Chat: {chatPeople} </p>
                        <p id='online-people'> ( Online People: {getOnlinePeople()} )</p>
                    </div>
                </TopAppBarSection>
                <TopAppBarSection align='end' role='toolbar'>
                    <TopAppBarIcon actionItem tabIndex={0}>
                        <MaterialIcon 
                            aria-label="Edit" 
                            hasRipple 
                            icon='person'
                            data-tooltip-id="tooltip-id"
                            onClick={() => {dispatch(push('/edit'))}}
                        />
                       
                    </TopAppBarIcon>
                    <TopAppBarIcon actionItem tabIndex={1}>
                        <MaterialIcon 
                            aria-label="Logout" 
                            hasRipple 
                            icon='exit_to_app' 
                            onClick={logoutHandler}
                        />
                    </TopAppBarIcon>
                </TopAppBarSection>
            </TopAppBarRow>
        </TopAppBar>
    );
};

export default TopBar;