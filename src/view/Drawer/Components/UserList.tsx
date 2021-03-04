import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import {getLocalStorageWithExpiry} from '../../../Services/StorageService';
import { 
    SET_CHAT_PEOPLE,
    SET_NEW_MESSAGE_ALARM
} from '../../../redux/actionTypes';
import ＭessageAlarm from './ＭessageAlarm';
import {
    stateInterface,
    userListProps,
    userInfoInterface
} from '../../../Interfaces';
import {serverHostName} from '../../../config';

const UserList = (props: userListProps) => {
    const dispatch = useDispatch();
    const myUserName = getLocalStorageWithExpiry('userName');
    const {userList, newMessageCount} = useSelector((state: stateInterface) => state.chatRoomReducer);
    const {isOnline} = props;
    const [selectedIndex, setSelectedIndex] = useState(-1);
    let users: any = {};
    if(isOnline){
        users = Object.values(userList).filter((user) => user.status === 'online' && user.userName !== myUserName);
        users.splice(0, 0, {userName: 'Public', status: 'online'});
    }else{
        users = Object.values(userList).filter((user) => user.status === 'offline' && user.userName !== myUserName);
    }

    const changeChatPeople = useCallback((index: number) => {
        if(isOnline){
            setSelectedIndex(index);
            dispatch({
                type: SET_CHAT_PEOPLE,
                payload: users[index].userName
            });
            dispatch({
                type: SET_NEW_MESSAGE_ALARM,
                payload: {
                    type: 'reset',
                    userName: users[index].userName
                }
            })
        }
    }, [users]);

    useEffect(() => {
        if(isOnline){
            changeChatPeople(0); //Default is public
        }
    }, []);

    return(
        <List 
            singleSelection={isOnline}
            selectedIndex={selectedIndex}
            handleSelect={changeChatPeople}
        >
            {
                users.map((user: userInfoInterface) => {
                    return(
                        <ListItem key={user.userName}>
                            <ListItemGraphic graphic={
                                (user.photo)?
                                    <img src={`${serverHostName}/${user.photo}`} alt="userPhoto" />
                                    :
                                    <MaterialIcon 
                                        className='userImage'
                                        icon={(user.userName==='Public')? 'people': 'person'}
                                    />
                                } 
                            />
                            <ListItemText primaryText={user.userName} />
                            {(newMessageCount[user.userName] > 0)?
                            <ＭessageAlarm 
                                newMessageCount={(newMessageCount[user.userName])? newMessageCount[user.userName]: 0} 
                            />: []
                            }
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

export default UserList;