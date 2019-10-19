import React from 'react';
import {Provider, connect} from 'react-redux';
import {createReduxContainer} from 'react-navigation-redux-helpers';

import AppStackNavigator from 'navigator';
// import {store} from './src/redux/store';

const App = () => {
  return <AppStackNavigator />;
};

export default App;
