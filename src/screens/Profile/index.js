import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Left, Item, Input, Icon} from 'native-base';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageProfile: 'https://static.thenounproject.com/png/994628-200.png',
      isEditProfile: false,
      nameProfile: 'Your Name',
    };
  }

  handleEdit = () => {
    this.props.navigation.navigate('EditProfile');
  };

  render() {
    const {imageProfile, isEditProfile, nameProfile} = this.state;
    return (
      <View>
        <View style={Styles.headerContainer}>
          <View style={Styles.header}>
            <View style={Styles.textHeader}>
              <Text style={Styles.textProf}>Profile</Text>
            </View>
            <View style={{marginTop: 17, marginRight: 30}}>
              <TouchableOpacity onPress={() => this.handleEdit()}>
                <Icon name="create" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: '10%'}}>
          <View style={Styles.imageProf}>
            <Image
              style={Styles.img}
              source={{
                uri: imageProfile,
              }}
            />
            <Text style={{fontSize: 30}}>{nameProfile}</Text>
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <View style={Styles.creation}>
            <Text style={{fontSize: 25}}>My Webtoon Creation</Text>
            <Icon name="ios-arrow-forward" style={{margin: 4}} />
          </View>
          <View style={Styles.logoutBtn}>
            <Text style={{fontSize: 25}}>Log Out</Text>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  textProf: {fontSize: 25, fontWeight: 'bold'},
  textHeader: {marginTop: 15, marginLeft: 35},
  img: {height: 150, width: 150},
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
