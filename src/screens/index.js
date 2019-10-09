import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import BottomTabStack from './bottomTab';
import LoginScreen from './Login';
import AuthLoadingScreen from './AuthLoading';

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: BottomTabStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);
