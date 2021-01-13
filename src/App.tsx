import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './redux/configureStore';
import './App.scss';
import Login from './view/LoginSignup/Login';
import Home from './view/Home'
import Signup from './view/LoginSignup/Signup';
import Edit from './view/LoginSignup/Edit';


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
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/edit">
                    <Edit />
                </Route>
                <Route exact path="*">
                    <div>
                        <h1>Sorry, No this page</h1>
                    </div>
                </Route>
            </Switch>
            </ConnectedRouter>
        </Provider>
    );
}

export default App