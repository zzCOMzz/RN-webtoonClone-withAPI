import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//? Import Component
import Header from 'components/header';
import ButtonShare from 'components/buttonShare';
import ButtonWithFunc from 'components/buttonFunc';

//? Import Screens
import BottomTabStack from './bottomTab';
import LoginScreen from '../screens/Auth/login';
import RegisterScreen from '../screens/Auth/register';
import AuthLoadingScreen from '../screens/AuthLoading';
import Details from '../screens/Details';
import DetailEpisode from '../screens/DetailEpisode';
import EditProfile from '../screens/Profile/EditProfile';

import CreatorStack from './creator';

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterScreen,
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
        headerTitle: <Header titleText="Details" />,
        headerRight: <ButtonShare iconName="share" />,
      },
    },
    DetailEpisode: {
      screen: DetailEpisode,
      navigationOptions: {
        headerTitle: <Header titleText="Ep. 1" />,
        headerRight: <ButtonShare iconName="share" />,
      },
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        header: null,
      },
    },
    Creator: {
      screen: CreatorStack,
      navigationOptions: {
        header: null,
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
      initialRouteName: 'AuthLoading',
    },
  ),
);
