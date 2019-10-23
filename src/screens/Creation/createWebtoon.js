import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Item, Input, Icon, Card, CardItem, Button, Label} from 'native-base';
import {actionGetMyWebtoon} from '../../redux/actions/actionWebtoon';
import {connect} from 'react-redux';
import {addWebtoon, getUserId, getUserToken} from '../../functions';

class CreateWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBanner: {
        uri:
          'https://images.vexels.com/media/users/3/130153/isolated/preview/93a30c258ebb3defaeabbe2568d9425b-dslr-camera-icon-by-vexels.png',
      },
      webtoonTitle: '',
      webtoonGenre: '',
    };
  }

  handleUploadWebtoon = async () => {
    const userId = await getUserId();
    const userToken = await getUserToken();
    const formData = new FormData();
    formData.append('banner', this.state.imageBanner);
    formData.append('genre', this.state.webtoonGenre);
    formData.append('title', this.state.webtoonTitle);
    const response = await addWebtoon(formData, this.state.webtoonTitle);
    const {data} = response;

    if (data.success) {
      ToastAndroid.showWithGravity(
        `${data.message}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      this.setState({
        imageBanner: {
          uri:
            'https://images.vexels.com/media/users/3/130153/isolated/preview/93a30c258ebb3defaeabbe2568d9425b-dslr-camera-icon-by-vexels.png',
        },
        webtoonTitle: '',
        webtoonGenre: '',
      });
      this.props.actionGetMyWebtoon(userId, token);
    } else {
      ToastAndroid.showWithGravity(
        `${data.message}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  handleaddPhoto = () => {
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
        let photo = {
          uri: res.uri,
          type: res.type,
          name: res.fileName,
        };
        this.setState({
          imageBanner: photo,
        });
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{marginTop: '3%'}}>
          <Text style={{fontSize: 20}}>Title</Text>
          <Item reguler style={Styles.searchInput}>
            <Input
              placeholder="Title"
              style={{marginHorizontal: 10}}
              value={this.state.webtoonTitle}
              onChangeText={text => this.setState({webtoonTitle: text})}
            />
          </Item>
          <Text style={{fontSize: 20}}>Genre</Text>
          <Item reguler style={Styles.searchInput}>
            <Input
              placeholder="Genre"
              style={{marginHorizontal: 10}}
              value={this.state.webtoonGenre}
              onChangeText={text => this.setState({webtoonGenre: text})}
            />
          </Item>
          <View>
            <Text style={{fontSize: 20}}>Add Image Banner</Text>
            <View style={{alignItems: 'center'}}>
              <Image
                source={{uri: this.state.imageBanner.uri}}
                style={{width: '100%', height: 140}}
              />
              <Icon name="ios-camera" onPress={() => this.handleaddPhoto()} />
            </View>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 10}}>
          <Button
            success
            onPress={() => this.handleUploadWebtoon()}
            style={{justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>Upload Webtoon</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionGetMyWebtoon: (userId, token) =>
      dispatch(actionGetMyWebtoon(userId, token)),
  };
};

const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateWebtoon);
const Styles = StyleSheet.create({
  searchInput: {
    borderWidth: 8,
    marginBottom: 5,
  },
  titleItem: {fontSize: 16, fontWeight: 'bold'},
  image: {height: 60, width: 50},
});
