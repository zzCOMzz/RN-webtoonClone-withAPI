import React, {useEffect} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {appReducer, initLoginState} from 'reducers';
const AuthLoadingScreen = props => {
  useEffect(() => {
    const isUserExist = initLoginState.isLogin;
    setTimeout(() => {
      props.navigation.navigate(isUserExist ? 'App' : 'Auth');
    }, 1200);
  });
  return (
    <View>
      <Text>Loading Screen he</Text>
    </View>
  );
};

export default AuthLoadingScreen;
