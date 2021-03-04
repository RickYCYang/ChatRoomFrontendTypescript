import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Drawer, {DrawerContent} from '@material/react-drawer';
import {SET_DRAWER_OPEN} from '../../redux/actionTypes';
import StyleList from './Components/StyleList';
import UserList from './Components/UserList';
import User from './Components/User';
import {stateInterface} from '../../Interfaces';

const DrawerBar = () => {
    const dispatch = useDispatch();
    const drawerOpen = useSelector((state: stateInterface) => state.chatRoomReducer.drawerOpen);
    const [width, setwidth] = useState(window.innerWidth);

    const closeDrawer = () => {
        dispatch({
            type: SET_DRAWER_OPEN,
            payload: false
        })
    }

    useEffect(() => {
        const handleResize = () => {
            setwidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    });

    //console.log('widht', window.window.innerWidth);

    return(
        <Drawer
            modal={width<600}
            open={drawerOpen}
            onClose={closeDrawer}
        >
            <DrawerContent>
                <User />
                <hr style={{borderColor: '#2E86C1', width: '90%'}}/>
                <p className='drawer-title'>Theme</p>
                <StyleList/>
                <hr style={{borderColor: '#2E86C1', width: '90%'}}/>
                <p className='drawer-title'>Online People</p>
                <UserList isOnline={true}/>
                <hr style={{borderColor: '#2E86C1', width: '90%'}}/>
                <p className='drawer-title'>Offline People</p>
                <UserList isOnline={false}/>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerBar;