import React from 'react';
import {Provider} from 'react-redux'; 
import {render, cleanup, fireEvent, getByText, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from '../../../redux/configureStore';
import {shallow} from 'enzyme';
import {convertFile, compressImage} from '../../../Services/CommonService';
import {getLocalStorageWithExpiry} from '../../../Services/StorageService';
import {sendNewMessage} from '../../../Services/WebSocketService';
import {
    stateInterface,
    keyInterface,
    inputEventInterface
} from '../../../Interfaces'; 
import MessageSender from '../../../view/ChatRoom/Components/MessageSender';

jest.mock('../../../Services/WebSocketService');

describe('Test <MessageSender/>', () => {
    beforeEach(cleanup);
    const store = configureStore({});

    test('Test input event', () => {
        //expect(store.getState().chatRoomReducer.imageModalOpen).toBe(true);
        //sendNewMessage(webSocket, 'string', userName, chatPeople, message, timestamp);
        (sendNewMessage as jest.Mock).mockImplementation((webSocket, type, userName, chatPeople, message, timestamp) => {
            //console.log('parameter', webSocket, type, userName, chatPeople, message, timestamp);
        });
        const {getByTestId, container} = render(
            <Provider store={store}>
                <MessageSender />
            </Provider>
        );
        const input = screen.getByTestId('msgTextEditInput');
        userEvent.type(input, 'Hello World!')
        expect(input).toHaveValue('Hello World!');
        const sendBtn = getByTestId('txtSendBtn');
        userEvent.click(sendBtn);
        expect(sendNewMessage).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue('');
        fireEvent.keyPress(sendBtn, {key: 'Enter'});
        expect(input).toHaveValue('');
        expect(sendNewMessage).toHaveBeenCalledTimes(2);
    });
})

