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
import {stateInterface} from '../../../Interfaces'

const UserList = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const myUserName = getLocalStorageWithExpiry('userName');
    const {userList, newMessageCount} = useSelector((state: stateInterface) => state.chatRoomReducer);
    const dispatch = useDispatch();
    const onlineUser = Object.values(userList).filter((user) => user.status === 'online' && user.userName !== myUserName);
    onlineUser.splice(0, 0, {userName: 'Public', status: 'online'});

    const changeChatPeople = useCallback((index: number) => {
        setSelectedIndex(index);
        dispatch({
            type: SET_CHAT_PEOPLE,
            payload: onlineUser[index].userName
        });
        dispatch({
            type: SET_NEW_MESSAGE_ALARM,
            payload: {
                type: 'reset',
                userName: onlineUser[index].userName
            }
        })
    }, [onlineUser]);

    useEffect(() => {
        changeChatPeople(0); //Default is public
    }, []);

    return(
        <List 
            singleSelection 
            selectedIndex={selectedIndex}
            handleSelect={changeChatPeople}
        >
            {
                onlineUser.map((user) => {
                    return(
                        <ListItem key={user.userName}>
                            <ListItemGraphic graphic={
                                <MaterialIcon 
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