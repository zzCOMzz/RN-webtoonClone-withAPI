import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//? Import Component
import Header from 'components/header';
import ButtonShare from 'components/buttonShare';
import ButtonWithFunc from 'components/buttonFunc';
//? Import Screens
import BottomTabStack from './bottomTab';
import LoginScreen from '../screens/Login';
import AuthLoadingScreen from '../screens/AuthLoading';
import Details from '../screens/Details';
import DetailEpisode from '../screens/DetailEpisode';
import EditProfile from '../screens/Profile/EditProfile';
import CreationScreen from '../screens/Creation';
import CreateWebtoon from '../screens/Creation/createWebtoon';
import CreateWebtoonEpisode from '../screens/Creation/createEpisode';
import EditWebtoon from '../screens/Creation/editWebtoon';
import EditEpisode from '../screens/Creation/editEpisode';

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
            handleFunct={() => alert('hello Creation Webtoon')}
            iconName="checkmark"
          />
        ),
      },
    },
    CreateWebtoonEpisode: {
      screen: CreateWebtoonEpisode,
      navigationOptions: {
        headerTitle: <Header titleText="Create Episode" />,
        headerRight: (
          <ButtonWithFunc
            handleFunct={() => alert('Create Episode')}
            iconName="checkmark"
          />
        ),
      },
    },
    EditWebtoon: {
      screen: EditWebtoon,
      navigationOptions: {
        headerTitle: <Header titleText="Edit Webtoon" />,
        headerRight: (
          <ButtonWithFunc
            handleFunct={() => alert('Edit Episode')}
            iconName="checkmark"
          />
        ),
      },
    },
    EditEpisode: {
      screen: EditEpisode,
      navigationOptions: {
        headerTitle: <Header titleText="Edit Episode" />,
        headerRight: (
          <ButtonWithFunc
            handleFunct={() => alert('Edit Episode')}
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
      initialRouteName: 'Auth',
    },
  ),
);
