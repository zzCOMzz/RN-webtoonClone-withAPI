import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import BottomTabStack from './bottomTab';
import LoginScreen from './Login';
import AuthLoadingScreen from './AuthLoading';

import Details from './Details';

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppStack = createStackNavigator(
  {
    bottomTab: {
      screen: BottomTabStack,
      navigationOptions: {
        header: null,
      },
    },
    Details: {
      screen: Details,
      navigationOptions: {
        headerTitle: 'Details',
      },
    },
  },
  {},
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);
