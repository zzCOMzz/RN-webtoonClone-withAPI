import React from 'react';
import {View} from 'react-native';
import {Icon} from 'native-base';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import ForYouScreen from './ForYou';
import FavouriteScreen from './Favourite';
import ProfileScreen from './Profile';

const BottomTabStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: ForYouScreen,
      navigationOptions: {
        tabBarLabel: 'ForYou',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="apps" style={{color: tintColor}} size={25} />
          </View>
        ),
      },
    },
    Favourite: {
      screen: FavouriteScreen,
      navigationOptions: {
        tabBarLabel: 'Favourite',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="star" style={{color: tintColor}} size={25} />
          </View>
        ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon name="person" style={{color: tintColor}} size={25} />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#74E91D',
    inactiveColor: 'grey',
    barStyle: {
      backgroundColor: 'white',
    },
  },
);

export default BottomTabStack;
