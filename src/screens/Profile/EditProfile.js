import React, {Component} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import {Item, Input, Icon} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import HeaderProfile from 'components/headerProfile';

import Axios from 'axios';
import Host from '../../functions/host';

import {
  getUserId,
  getUserToken,
  createFormData,
  editProfile,
} from '../../functions';
import {connect} from 'react-redux';
import {actionGetProfile} from '../../redux/actions/actionEditProfile';

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageProfile: this.props.navigation.getParam('imageProfile'),
      nameProfile: this.props.navigation.getParam('name'),
    };
  }

  componentDidMount() {}

  handleEditPhoto = () => {
    const options = {
      title: 'Select Photo',
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
        console.log(res);
        const sourceImage = res;
        this.setState({
          imageProfile: sourceImage,
        });
      }
    });
  };

  async handleUpdate() {
    const token = await getUserToken();
    const userId = await getUserId();

    const formData = await createFormData(this.state.imageProfile, 'profile', {
      username: this.state.nameProfile,
    });

    await editProfile(formData);

    await this.props.actionGetProfile(userId, token);

    this.props.navigation.navigate('Profile');
  }
  render() {
    const {imageProfile, nameProfile} = this.state;
    return (
      <View>
        <HeaderProfile
          handleFunc={async () => {
            await this.handleUpdate();
            this.props.navigation.navigate('Profile');
          }}
          title="Edit Profile"
          icon="checkmark"
        />
        <View style={Styles.imageContainer}>
          <View style={Styles.imgStyle}>
            <Image
              style={{height: 150, width: 150, borderRadius: 100}}
              source={{
                uri: !imageProfile
                  ? this.props.navigation.getParam('image')
                  : imageProfile.uri,
              }}
            />
            <TouchableOpacity onPress={() => this.handleEditPhoto()}>
              <Icon name="camera" />
            </TouchableOpacity>
            <Item style={{paddingHorizontal: 40}}>
              <Input
                value={nameProfile}
                placeholder={this.props.navigation.getParam('name')}
                onChangeText={text => this.setState({nameProfile: text})}
              />
            </Item>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProfile: (userId, token) => {
      dispatch(actionGetProfile(userId, token));
    },
  };
};

export default connect(
  mapDispatchToProps,
  {actionGetProfile},
)(EditProfileScreen);

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
