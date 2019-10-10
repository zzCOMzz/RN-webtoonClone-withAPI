import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Left, Item, Input, Icon} from 'native-base';
import ImagePicker from 'react-native-image-picker';
class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageProfile: 'https://static.thenounproject.com/png/994628-200.png',
      isEditProfile: false,
      nameProfile: 'Your Name',
    };
  }

  handleEdit = () => {
    this.props.navigation.navigate('Profile');
  };

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
        const sourceImage = {uri: res.uri};

        this.setState({imageProfile: sourceImage});
      }
    });
  };
  render() {
    const {imageProfile, isEditProfile, nameProfile} = this.state;
    return (
      <View>
        <View style={Styles.headerContainer}>
          <View style={Styles.header}>
            <View style={Styles.headerText}>
              <Text style={Styles.textPorf}>Edit Profile</Text>
            </View>
            <View style={Styles.iconContainer}>
              <TouchableOpacity onPress={() => this.handleEdit()}>
                <Icon name="checkmark" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={Styles.imageContainer}>
          <View style={Styles.imgStyle}>
            <Image
              style={{height: 150, width: 150}}
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
