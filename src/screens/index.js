import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ForYouScreen from './ForYou';
import FavouriteScreen from './Favourite';
import LoginScreen from './Login';
import AuthLoadingScreen from './AuthLoading';

const AppStack = createStackNavigator({
  Home: {
    screen: ForYouScreen,
    navigationOptions: {
      header: null,
    },
  },
  Favourite: {
    screen: FavouriteScreen,
  },
});
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
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);
