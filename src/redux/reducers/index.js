import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

// import reducerTodos from './../reducers/reducerTodos';
// import reducerUsers from './../reducers/reducerUsers';
import RootNavigator from '../../navigator';
import {reducerGetMyWebtoon} from './reducerWebtoon';
import {reducerGetMyEpisode} from './reducerGetEpisode';
import getProfileReducer from './reducerEditProfile';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  getProfile: getProfileReducer,
  getMyWebtoon: reducerGetMyWebtoon,
  getEpisode: reducerGetMyEpisode,
});

export default appReducer;
