import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import {SET_MESSAGE_BOX_STYLE} from '../../../redux/actionTypes';

const StyleList = () => {
    const [styleListIndex, setStyleListIndex] = useState(0);
    const dispatch = useDispatch();

    const setMessageBoxStyle = (index: number): void => {
        setStyleListIndex(index);
        const isMessageBoxStyle = index === 0? true: false;
        dispatch({
            type: SET_MESSAGE_BOX_STYLE,
            payload: isMessageBoxStyle
        })
    }

    return(
        <List 
            singleSelection 
            selectedIndex={styleListIndex}
            handleSelect={setMessageBoxStyle}
        >
            <ListItem>
                <ListItemGraphic graphic={<MaterialIcon icon='color_lens'/>} />
                <ListItemText primaryText='Colorful Theme Style' />
            </ListItem>
            <ListItem>
                <ListItemGraphic graphic={<MaterialIcon icon='format_color_reset'/>} />
                <ListItemText primaryText='Simple Theme Style' />
            </ListItem>
        </List>
    );
}

export default StyleList;