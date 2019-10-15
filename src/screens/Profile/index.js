import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  AsyncStorage,
} from 'react-native';
import {Left, Item, Input, Icon} from 'native-base';
import HeaderProfile from 'components/headerProfile';

import {initLoginState} from 'reducers';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageProfile: 'https://static.thenounproject.com/png/994628-200.png',
      isEditProfile: false,
      nameProfile: 'JSON.parse(initLoginState.userData).email',
    };
  }

  handleEdit = () => {
    this.props.navigation.navigate('EditProfile');
  };

  render() {
    const {imageProfile, isEditProfile, nameProfile} = this.state;
    return (
      <View>
        <HeaderProfile
          handleFunc={() =>
            this.props.navigation.navigate('EditProfile', {
              imageProfile: !this.props.navigation.getParam('image')
                ? imageProfile
                : this.props.navigation.getParam('image'),
              name: !this.props.navigation.getParam('name')
                ? nameProfile
                : this.props.navigation.getParam('name'),
            })
          }
          title="Profile"
          icon="create"
        />
        <View style={{alignItems: 'center', marginTop: '10%'}}>
          <View style={Styles.imageProf}>
            <Image
              style={Styles.img}
              source={{
                uri: !this.props.navigation.getParam('image')
                  ? imageProfile
                  : this.props.navigation.getParam('image'),
              }}
            />
            <Text style={{fontSize: 30}}>
              {!this.props.navigation.getParam('name')
                ? nameProfile
                : this.props.navigation.getParam('name')}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Creation')}>
            <View style={Styles.creation}>
              <Text style={{fontSize: 25}}>My Webtoon Creation</Text>
              <Icon name="ios-arrow-forward" style={{margin: 4}} />
            </View>
          </TouchableOpacity>
          <View style={Styles.logoutBtn}>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.clear();
                this.props.navigation.navigate('Auth');
              }}>
              <Text style={{fontSize: 25}}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  textProf: {fontSize: 25, fontWeight: 'bold'},
  textHeader: {marginTop: 15, marginLeft: 35},
  img: {height: 150, width: 150, borderRadius: 100},
  imageProf: {justifyContent: 'center', alignItems: 'center'},
  creation: {
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logoutBtn: {
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginTop: 5,
    paddingBottom: 5,
  },
  headerContainer: {
    marginTop: 0,
    padding: 0,
    borderBottomWidth: 2,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default ProfileScreen;
