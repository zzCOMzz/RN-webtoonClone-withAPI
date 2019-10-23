import React, {useEffect, Component} from 'react';
import {View, Text, Image, AsyncStorage} from 'react-native';
import {Spinner} from 'native-base';

import {connect} from 'react-redux';
import {getUserId, getUserToken} from '../../functions';
import {actionGetProfile} from '../../redux/actions/actionEditProfile';

class ReloadAllReducer extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const userId = await getUserId();
    const userToken = await getUserToken();
    this.props.editProfile(userId, userToken);
    console.log(userId, userToken);
    AsyncStorage.getItem('token').then(token => {
      console.log('Ini token Asli ', token);

      setTimeout(() => {
        this.props.navigation.navigate(token ? 'App' : 'Login');
      }, 1000);
    });
  }
  render() {
    return <AuthLoadingScreen />;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    editProfile: (userId, token) => {
      dispatch(actionGetProfile(userId, token));
    },
  };
};
const mapStateToProps = state => {
  return {
    userData: state.getProfile,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReloadAllReducer);

const AuthLoadingScreen = props => {
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
