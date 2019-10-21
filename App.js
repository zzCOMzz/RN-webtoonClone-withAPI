import React from 'react';
import {Provider, connect} from 'react-redux';
import {createReduxContainer} from 'react-navigation-redux-helpers';

import AppStackNavigator from 'navigator';
import {store} from './src/redux/store';

const AppNavigation = createReduxContainer(AppStackNavigator, 'root');

const mapStatetProps = state => ({
  state: state.router,
});

const AppwithNavigationState = connect(mapStatetProps)(AppNavigation);

const App = () => {
  return (
    <Provider store={store}>
      <AppwithNavigationState />
    </Provider>
  );
};

export default App;
