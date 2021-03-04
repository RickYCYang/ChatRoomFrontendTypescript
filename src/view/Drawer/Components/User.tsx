import React from 'react';
import {useSelector} from 'react-redux';
import {getLocalStorageWithExpiry} from '../../../Services/StorageService';
import MaterialIcon from '@material/react-material-icon';
import {stateInterface, userInfoInterface} from '../../../Interfaces';
import {serverHostName} from '../../../config';


const User = () => {
    const userName = getLocalStorageWithExpiry('userName');
    const userList = useSelector((state: stateInterface) => state.chatRoomReducer.userList);
    const userInfo: userInfoInterface = Object.values(userList).filter((user) => user.userName === userName)[0];
    const photo = (userInfo)? userInfo.photo: '';

    return(
        <div id='drawer-user'>
            {(photo)?
                <img 
                    id='drawer-user-photo'
                    src={`${serverHostName}/${photo}`}
                    alt="new"
                />
                :
                <MaterialIcon 
                    className='userImage'
                    icon={(userName==='Public')? 'people': 'person'}
                />
            } 
            <p id='drawer-user-name'>{userName}</p>
        </div>
    );
}

export default User