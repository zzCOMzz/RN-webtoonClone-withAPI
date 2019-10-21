import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

// import reducerTodos from './../reducers/reducerTodos';
// import reducerUsers from './../reducers/reducerUsers';
import RootNavigator from '../../navigator';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
});

export default appReducer;
