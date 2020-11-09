import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './redux/configureStore';
import './App.scss';
import Login from './view/Login';
import Home from './view/Home'


const store = configureStore({});

const App = () => {
    return (
        <Provider store={store}>
            {/*<Navigator />*/}
            <ConnectedRouter history={history}>      
            <Switch>
                <Route exact path="/">
                    <Home /> 
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
            </ConnectedRouter>
        </Provider>
    );
}

export default App