import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Drawer, {DrawerContent} from '@material/react-drawer';
import {getLocalStorageWithExpiry} from '../../Services/StorageService';
import {SET_DRAWER_OPEN} from '../../redux/actionTypes';
import StyleList from './Components/StyleList';
import UserList from './Components/UserList';
import {stateInterface} from '../../Interfaces';

const DrawerBar = () => {
    const userName = getLocalStorageWithExpiry('userName');
    const dispatch = useDispatch();
    const {drawerOpen} = useSelector((state: stateInterface) => state.chatRoomReducer);

    const closeDrawer = () => {
        dispatch({
            type: SET_DRAWER_OPEN,
            payload: false
        })
    }

    return(
        <Drawer
            modal
            open={drawerOpen}
            onClose={closeDrawer}
        >
            <DrawerContent>
                <p id='drawer-greeting'>Welcome, {userName}</p>
                <hr style={{borderColor: '#2E86C1', width: '90%'}}/>
                <p className='drawer-title'>Style</p>
                <StyleList/>
                <hr style={{borderColor: '#2E86C1', width: '90%'}}/>
                <p className='drawer-title'>Online People</p>
                <UserList/>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerBar;