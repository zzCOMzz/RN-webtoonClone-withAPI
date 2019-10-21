import {createStore, applyMiddleware} from 'redux';

import appReducers from './reducers';
import middlewares from './middlerware';

const store = createStore(appReducers, {}, applyMiddleware(...middlewares));

export {store};
