import React from 'react';
import * as reactRedux from 'react-redux';
import configureStore from '../../../redux/configureStore';
import {render, fireEvent, cleanup, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import {getLocalStorageWithExpiry} from '../../../Services/StorageService';
import Login from '../../../view/LoginSignup/Login';
import {
    stateInterface,
    keyInterface
} from '../../../Interfaces';

jest.mock('../../../Services/StorageService');


describe('Test <Login>', () => {
    beforeEach(cleanup);
    const store = configureStore({});
    /*
    const mockDispatch = jest.fn();
    const mockUseDispatch = jest.spyOn(reactRedux, 'useDispatch');
    */
    test('Enter email field', () => {
        const {getByTestId, container} = render(
            <reactRedux.Provider store={store}>
                <Login />
            </reactRedux.Provider>
        );
        const emailInput = screen.getByTestId('email');
        userEvent.type(emailInput, 'rickyang2910@gmail.com');
        expect(store.getState().loginReducer.account).toBe('rickyang2910@gmail.com');
        expect(emailInput).toHaveValue('rickyang2910@gmail.com');
    });

    test('Enter password field', () => {
        const {getByTestId, container} = render(
            <reactRedux.Provider store={store}>
                <Login />
            </reactRedux.Provider>
        );
        const passwordInput = screen.getByTestId('password');
        userEvent.type(passwordInput, '790909');
        expect(passwordInput).toHaveValue('790909');
    });
})