import React, {useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import TextField, {Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';
//import imageCompression from 'browser-image-compression';
import {convertFile, compressImage} from '../../../Services/CommonService';
import {getLocalStorageWithExpiry} from '../../../Services/StorageService';
import {sendNewMessage} from '../../../Services/WebSocketService';
import {
    stateInterface,
    keyInterface,
    inputEventInterface
} from '../../../Interfaces'; 



const MessageSender = () => {
    const [message, setMessage] = useState('');
    const fileUpload = useRef<HTMLInputElement>(null);
    const  {webSocket, chatPeople} = useSelector((state: stateInterface) => state.chatRoomReducer);
    const userName = getLocalStorageWithExpiry('userName') || '';
    
    const messageHandler = (e: inputEventInterface): void => {
        const {value} = e.currentTarget;
        setMessage(value);
    }

    const getTimeStamp = (): string => {
        const date: Date = new Date();
        const timestamp: string = date.getFullYear() + '/' + (date.getMonth() + 1) +  '/' + date.getDate() +
            ' ' + new Date().getHours() + ':' + new Date().getMinutes() + 
            ':' + new Date().getSeconds() + ':' + new Date().getUTCMilliseconds();
        return timestamp;
    }

    const sendMessage = (): void => {
        const timestamp: string = getTimeStamp();
        sendNewMessage(webSocket, 'string', userName, chatPeople, message, timestamp);
        setMessage(''); //Clear Textedit
    }

    const enterClick = (key: keyInterface): void => {
        if(key.key === 'Enter'){
            sendMessage();
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', enterClick);
        return () => {
            document.removeEventListener('keypress', enterClick);
        }
    }, [message]);


    const fileUploadHandler = async() => {
        if(fileUpload.current?.files !== null && fileUpload.current?.files !== undefined){
            const file = fileUpload.current.files[0];
            //Compress Image at first
            try {
                const compressedFile = await compressImage(file);
                /* Convert Image to base64 decode */
                convertFile(compressedFile).then((fileBase64: string) => {
                const timestamp: string = getTimeStamp();
                sendNewMessage(webSocket, 'image', userName, chatPeople, fileBase64, timestamp);
            }).catch(err => console.log('error', err));
            } catch (error) {
                console.log(error);
            }
        }
    }

    return(
        <div id='messageSender'> 
            <TextField
                label='你想說什麼'
                id="msgTextEdit"                 
                //helperText={<HelperText>Help Me!</HelperText>}
                onTrailingIconSelect={() => {fileUpload.current?.click();}}
                trailingIcon={<MaterialIcon role="button" icon="image"/>}
            >
                <Input
                    id="msgTextEditInput" 
                    value={message}
                    onChange={messageHandler} 
                />
            </TextField>    
            <input type='file' className={'input-element'} ref={fileUpload} accept="image/*" onChange={fileUploadHandler}/> 
            <Button 
                id="txtSendBtn"
                outlined={true} 
                raised={true} 
                icon={<MaterialIcon role="button" icon="send" />}
                onClick={sendMessage}
            >Send
            </Button>
        </div>
    );
}

export default MessageSender;