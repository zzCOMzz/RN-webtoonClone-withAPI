import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//? Import Component
import Header from 'components/header';
import ButtonWithFunc from 'components/buttonFunc';

import CreationScreen from '../screens/Creation';
import CreateWebtoon from '../screens/Creation/createWebtoon';
import CreateWebtoonEpisode from '../screens/Creation/createEpisode';
import EditWebtoon from '../screens/Creation/editWebtoon';
import EditEpisode from '../screens/Creation/editEpisode';

const CreatorScreen = createStackNavigator(
  {
    Creation: {
      screen: CreationScreen,
      navigationOptions: {
        headerTitle: (
          <Header
            stylesHeader={{marginLeft: 40}}
            titleText="My Webtoon Creation"
          />
        ),
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

export default CreatorScreen;
