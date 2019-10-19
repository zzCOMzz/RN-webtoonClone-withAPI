import {createStore} from 'redux';

import appReducers from './reducers';

const store = createStore(appReducers, {});

export {store};
