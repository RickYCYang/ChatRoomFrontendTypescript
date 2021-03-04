import React from "react";
import { render, cleanup } from "@testing-library/react";
import MessageBoxUserInfo from "../../../view/ChatRoom/Components/MessageBoxUserInfo";
import {messageInterface} from '../../../Interfaces';

const userMessage: messageInterface = {
    sourceUser: 'Rick',
    targetUser: 'Public',
    timestamp: '2021/1/24 2:11:52:643',
    message: 'Hello World',
    messageType: 'string'
};

describe("Test  <MessageBoxUserInfo {...userMessage} />", () => {
    afterEach(cleanup);
    test("Test correct user name and timestamp", () => {
        const { getByTestId, getByText, container } = render(<MessageBoxUserInfo {...userMessage} />);
        expect(getByTestId('userNname-timestamp').textContent).toBe(`${userMessage.sourceUser}(${userMessage.timestamp})`);
    });
});