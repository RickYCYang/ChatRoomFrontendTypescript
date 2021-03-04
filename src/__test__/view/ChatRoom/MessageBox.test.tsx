import React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent, cleanup} from "@testing-library/react";
import MessageBox from '../../../view/ChatRoom/Components/MessageBox';
import {messageInterface} from '../../../Interfaces';
import configureStore from '../../../redux/configureStore';
import {getLocalStorageWithExpiry} from '../../../Services/StorageService';

const messageFromMe: messageInterface = {
    sourceUser: 'Rick',
    targetUser: 'Public',
    timestamp: '2021/1/24 2:11:52:643',
    message: 'Hello World',
    messageType: 'string'
};

const messageFromOthers: messageInterface = {
    sourceUser: 'Aris',
    targetUser: 'Public',
    timestamp: '2021/1/24 2:11:52:643',
    message: 'Hello World',
    messageType: 'string'
};

jest.mock("../../../Services/StorageService");

describe('Test <MessageBox {...userMessage}> ', () => {
    beforeEach(cleanup);
    const store = configureStore({});

    test('MessageBox CSS: Send by self', () => {
        (getLocalStorageWithExpiry as jest.Mock).mockReturnValue('Rick');
        const {getByText, getByTestId, container} = render(
            <Provider store={store}>
                <MessageBox {...messageFromMe} />
            </Provider>
        );
        expect(getByTestId('message-box').className).toBe('message-box-mine');
    });

    test('MessageBox CSS: Send others', () => {
        (getLocalStorageWithExpiry as jest.Mock).mockReturnValue('Rick');
        const { getByTestId, container } = render(
            <Provider store={store}>
                <MessageBox {...messageFromOthers} />
            </Provider>
        );
        expect(getByTestId('message-box').className).toBe('message-box-other');
    })
})