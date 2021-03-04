import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../../../redux/configureStore';
import { render, fireEvent, cleanup } from "@testing-library/react";
import MessageBoxText from '../../../view/ChatRoom/Components/MessageBoxText';
import { messageInterface } from '../../../Interfaces';
import chatImage from '../../../Image/chat.png';

const userMessageString: messageInterface = {
    sourceUser: 'Rick',
    targetUser: 'Public',
    timestamp: '2021/1/24 2:11:52:643',
    message: 'Hello World',
    messageType: 'string'
};

const userMessageImg: messageInterface = {
    sourceUser: 'Rick',
    targetUser: 'Public',
    timestamp: '2021/1/24 2:11:52:643',
    message: chatImage,
    messageType: 'image'
};

describe('Test <MessageBoxText {...userMessage} />', () => {
    /// Clear each component after test
    afterEach(cleanup);
    const store = configureStore({});

    test('Test string type message', () => {
        const { getByText, getByTestId, } = render(
            <Provider store={store}>
              <MessageBoxText {...userMessageString} />
            </Provider>
        );
        expect(getByTestId('message-box-text').textContent).toBe('Hello World');
    });
    
    
    test('Test image type message - content', () => {
        const { getByTestId, getByText, container } = render(
            <Provider store={store}>
              <MessageBoxText {...userMessageImg} />
            </Provider>
        );
        expect(getByTestId('message-box-text').innerHTML).toBe('<img src="chat.png" class="message-image">');
        
    }); 

    test('Test image type message - open modal', () => {
        const { getByTestId, getByText, container } = render(
            <Provider store={store}>
              <MessageBoxText {...userMessageImg} />
            </Provider>
        );
        const image = container.querySelector('img');
        if(image){
            fireEvent.click(image);
            expect(store.getState().chatRoomReducer.imageModalOpen).toBe(true);
        }
    }); 
});