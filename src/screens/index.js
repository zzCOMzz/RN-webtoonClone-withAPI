import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//? Import Component
import Header from 'components/header';
import ButtonShare from 'components/buttonShare';
import ButtonWithFunc from 'components/buttonFunc';
//? Import Screens
import BottomTabStack from './bottomTab';
import LoginScreen from './Login';
import AuthLoadingScreen from './AuthLoading';
import Details from './Details';
import DetailEpisode from './DetailEpisode';
import EditProfile from './Profile/EditProfile';
import CreationScreen from './Creation';
import CreateWebtoon from './Creation/createWebtoon';

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
    Creation: {
      screen: CreationScreen,
      navigationOptions: {
        headerTitle: <Header titleText="My Webtoon" />,
      },
    },
    CreationWebtoon: {
      screen: CreateWebtoon,
      navigationOptions: {
        headerTitle: <Header titleText="Create Webtoon" />,
        headerRight: (
          <ButtonWithFunc
            handleFunct={() => alert('helo')}
            iconName="checkmark"
          />
        ),
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
