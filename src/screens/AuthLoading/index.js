import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {appReducer, initLoginState} from 'reducers';
const AuthLoadingScreen = props => {
  useEffect(() => {
    const isUserExist = initLoginState.isLogin;
    setTimeout(() => {
      props.navigation.navigate(isUserExist ? 'App' : 'Auth');
    }, 1200);
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
    </View>
  );
};

export default AuthLoadingScreen;
