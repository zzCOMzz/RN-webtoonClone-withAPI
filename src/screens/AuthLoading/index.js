import React, {useEffect} from 'react';
import {View, Text, Image, AsyncStorage} from 'react-native';

import {appReducer, initLoginState} from 'reducers';
import {Spinner} from 'native-base';
const AuthLoadingScreen = props => {
  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      console.log('Ini token Asli ', token);

      setTimeout(() => {
        props.navigation.navigate(token ? 'App' : 'Login');
      }, 1200);
    });
  });
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30%',
        }}>
        <Image
          style={{width: 200, height: 200}}
          source={require('../../Assets/webtoon-logo.png')}
        />
      </View>
      <View>
        <Spinner color="blue" size="large" />
      </View>
    </View>
  );
};

export default AuthLoadingScreen;
