export interface messageInterface {
    sourceUser: string,
    targetUser: string,
    timestamp: string,
    message: string,
    messageType: string
}

export interface stateInterface {
    chatRoomReducer: chatRoomState,
    signupReducer: signupState,
    loginReducer: loginState,
    editReducer: editState
}

export interface keyInterface{
    key: string
}

export interface inputEventInterface{
    currentTarget:{
        value: string
    }
}

export interface userListInterface{
    userName:{
        userName: string,
        status: string,
        photo: string
    }
}

export interface chatRoomState {
    messageBox: messageInterface[],
    webSocket: any,
    onlineCount: number,
    connectStatus: string,
    styleMessageBox: boolean,
    isMobile: boolean,
    drawerOpen: boolean,
    userList: userListInterface,
    chatPeople: string,
    newMessageCount: any,
    imageModalOpen: boolean,
    imageEncodeString: string
}

export interface loginState {
    account: string,
    password: string,
    status: string,
    message: string
}

export interface signupState {
    status: string,
    account: string,
    password: string,
    confirmPassword: string,
    userName: string,
    message: string,
    fileName: string,
    successDialog: boolean
}

export interface editState {
    account: string,
    newPassword: string,
    newUserName: string,
    confirmNewPassword: string,
    newPhotoFileName: string,
    successDialog: boolean,
    message: string,
    status: string,
}