import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers/rootReducer';
import rootSaga from './sagas/saga';

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState: object) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware
      ),
    ),
  )
  sagaMiddleware.run(rootSaga);
  return store
}