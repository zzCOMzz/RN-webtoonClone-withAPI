import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Left, Item, Input, Icon} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import HeaderProfile from 'components/headerProfile';

import {initLoginState} from 'reducers';
class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageProfile: this.props.navigation.getParam('imageProfile'),
      isEditProfile: false,
      nameProfile: this.props.navigation.getParam('name'),
    };
  }

  handleEditPhoto = () => {
    const options = {
      title: 'Select Photo',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        alert('Edit Poto Canceled');
      } else if (res.error) {
        console.log(res.error);
        alert('Response Erorr');
      } else if (res.customButton) {
        console.log(res.customButton);
      } else {
        const sourceImage = res.uri;
        this.setState({imageProfile: sourceImage});
      }
    });
  };
  render() {
    console.log(this.props.navigation.getParam('name'), 'edit Profile');
    const {imageProfile, isEditProfile, nameProfile} = this.state;
    return (
      <View>
        <HeaderProfile
          handleFunc={() => {
            this.props.navigation.navigate('Profile', {
              image: this.state.imageProfile,
              name:
                nameProfile !== nameProfile
                  ? this.props.navigation.getParam('name')
                  : nameProfile,
            });
          }}
          title="Edit Profile"
          icon="checkmark"
        />
        <View style={Styles.imageContainer}>
          <View style={Styles.imgStyle}>
            <Image
              style={{height: 150, width: 150, borderRadius: 100}}
              source={{
                uri: imageProfile,
              }}
            />
            <TouchableOpacity onPress={() => this.handleEditPhoto()}>
              <Icon name="camera" />
            </TouchableOpacity>
            <Item style={{paddingHorizontal: 40}}>
              <Input
                value={nameProfile}
                placeholder={
                  !this.props.navigation.getParam('name')
                    ? nameProfile
                    : this.props.navigation.getParam('name')
                }
                onChangeText={text => this.setState({nameProfile: text})}
              />
            </Item>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  imgStyle: {justifyContent: 'center', alignItems: 'center'},
  iconContainer: {marginTop: 17, marginRight: 30},
  imageContainer: {alignItems: 'center', marginTop: '10%'},
  textProf: {fontSize: 25, fontWeight: 'bold'},
  headerText: {marginTop: 15, marginLeft: 35},
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
export default EditProfileScreen;
