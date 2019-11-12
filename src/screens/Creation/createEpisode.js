import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {
  Item,
  Input,
  Icon,
  Card,
  CardItem,
  Button,
  Label,
  Spinner,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import CropPicker from 'react-native-image-crop-picker';
import {
  actionGetMyEpisode,
  actionGetMyWebtoon,
} from '../../redux/actions/actionWebtoon';
import {
  addEpisode,
  addImageEpisode,
  getUserId,
  getUserToken,
} from '../../functions';
import {connect} from 'react-redux';

let imageStatic = {
  uri:
    'https://images.vexels.com/media/users/3/130153/isolated/preview/93a30c258ebb3defaeabbe2568d9425b-dslr-camera-icon-by-vexels.png',
};
class CreateEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageEpisodeCover: imageStatic,
      imageEpisode: [],
      episodeTitle: '',
      webtoonId: this.props.navigation.getParam('webtoonId'),
      webtoonTitle: this.props.navigation.getParam('webtoonTitle'),
      isLoading: false,
    };
  }

  handleAddImageCover = () => {
    Keyboard.dismiss();
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        alert('Add Image was Canceled');
      } else if (res.error) {
        console.log(res.error);
        alert('Response Erorr');
      } else if (res.customButton) {
        console.log(res.customButton);
      } else {
        let opt = {
          uri: res.uri,
          type: res.type,
          name: res.fileName,
        };

        this.setState({
          imageEpisodeCover: opt,
        });
      }
    });
  };

  handleAddImage = () => {
    Keyboard.dismiss();
    CropPicker.openPicker({multiple: true}).then(images => {
      images.map(image => {
        let randomName = Math.floor(Math.random() * 99999);
        let ext = image.mime.slice(6, 10).trim();
        let opt = {
          uri: image.path,
          type: image.mime,
          name: `${randomName}.${ext}`,
        };

        this.setState({imageEpisode: [...this.state.imageEpisode, opt]});
      });
    });
  };

  handleUpload = async () => {
    const token = await getUserToken();
    const userId = await getUserId();
    this.setState({isLoading: true});
    const {
      webtoonId,
      webtoonTitle,
      episodeTitle,
      imageEpisode,
      imageEpisodeCover,
    } = this.state;

    const formEpisode = new FormData();
    const formImage = new FormData();

    formEpisode.append('cover', imageEpisodeCover);
    const episode = await addEpisode(
      formEpisode,
      webtoonId,
      webtoonTitle,
      episodeTitle,
    ).catch(err => ToastAndroid.show(`${err}`, 3000));
    let response = episode.data.data;

    imageEpisode.forEach(img => {
      formImage.append('episode', img);
    });

    const imageUpload = await addImageEpisode(
      formImage,
      webtoonId,
      webtoonTitle,
      response._id,
      episodeTitle,
    ).catch(err => ToastAndroid.show(`${err}`, 3000));
    let imageResponse = imageUpload.data;

    if (imageResponse.success) {
      ToastAndroid.showWithGravity(
        `${imageResponse.message}`,
        4000,
        ToastAndroid.CENTER,
      );
      this.setState({isLoading: false});
      this.setState({
        imageEpisodeCover: imageStatic,
        imageEpisode: [],
        episodeTitle: '',
        webtoonId: this.props.navigation.getParam('webtoonId'),
        webtoonTitle: this.props.navigation.getParam('webtoonTitle'),
      });
      await this.props.actionGetMyEpisode(userId, this.state.webtoonId, token);
      await this.props.actionGetMyWebtoon(userId, token);
      this.props.navigation.navigate('EditWebtoon');
    } else {
      this.setState({
        isLoading: false,
        imageEpisodeCover: imageStatic,
        imageEpisode: [],
        episodeTitle: '',
        webtoonId: this.props.navigation.getParam('webtoonId'),
        webtoonTitle: this.props.navigation.getParam('webtoonTitle'),
      });
      ToastAndroid.show(`${imageResponse.message}`, 4000);
    }

    this.setState({});
  };

  deleteImage = photo => {
    let a = this.state.imageEpisode.filter(p => photo.uri !== p.uri);
    this.setState({imageEpisode: a});
  };

  render() {
    const {isLoading} = this.state;
    let isImage = this.state.imageEpisode.length;
    return (
      <View style={{marginHorizontal: 10}}>
        <View style={{marginTop: '3%', flex: 2}}>
          <Text style={{fontSize: 20}}>Title Episode</Text>
          <Item reguler style={Styles.searchInput}>
            <Input
              placeholder="Title Of Episode"
              value={this.state.episodeTitle}
              onChangeText={episodeTitle => this.setState({episodeTitle})}
              style={{marginHorizontal: 10}}
            />
          </Item>
        </View>

        <View
          style={{flex: 8, marginTop: Dimensions.get('screen').height * 0.12}}>
          <View style={{height: 150}}>
            <Text style={{fontSize: 20}}>Add Cover</Text>
            <TouchableOpacity onPress={() => this.handleAddImageCover()}>
              {isLoading ? (
                <Spinner color="yellow" />
              ) : (
                <Image
                  source={this.state.imageEpisodeCover}
                  style={{
                    width: '100%',
                    height: Dimensions.get('screen').height * 0.2,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 30,
              borderWidth: 1,
              borderRadius: 8,
              padding: 10,
              height: Dimensions.get('window').height * 0.3,
              backgroundColor:
                isImage <= 0 ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)',
            }}>
            <Text
              style={{fontSize: 18, color: isImage <= 0 ? 'white' : 'black'}}>
              Episodes
            </Text>
            {isLoading ? (
              <Spinner color="large" />
            ) : (
              <ScrollView>
                {this.state.imageEpisode.map((item, idx) => {
                  return (
                    <View
                      key={item.uri}
                      style={{
                        flex: 1,
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                      }}>
                      <Image
                        source={item}
                        style={{width: 90, height: 90, marginBottom: 20}}
                      />
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => this.deleteImage(item)}
                          style={{
                            backgroundColor: 'red',
                            height: 40,
                            width: 80,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'white'}}>Delete</Text>
                        </TouchableOpacity>
                        <View>
                          <Text>{item.name}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              marginTop: Dimensions.get('screen').height * 0.01,
            }}>
            {isLoading ? (
              <Spinner size="large" color="yellow" />
            ) : (
              <View>
                <View>
                  <Button
                    disabled={isLoading}
                    style={{
                      justifyContent: 'center',
                      backgroundColor: '#fbc531',
                      borderRadius: 8,
                    }}
                    onPress={() => this.handleAddImage()}>
                    <Text style={{color: 'white', fontSize: 20}}>+ Image</Text>
                  </Button>
                </View>
                <View
                  style={{
                    marginTop: Dimensions.get('screen').height * 0.1,
                    justifyContent: 'center',
                  }}>
                  <Button
                    disabled={isLoading}
                    transparent
                    onPress={() => this.handleUpload()}
                    style={{
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: '#4cd137',
                    }}>
                    <Text style={{color: '#4cd137', fontSize: 20}}>
                      Upload{' '}
                    </Text>
                  </Button>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {actionGetMyEpisode, actionGetMyWebtoon},
)(CreateEpisode);

const Styles = StyleSheet.create({
  searchInput: {
    borderWidth: 8,
    marginBottom: 5,
  },
  titleItem: {fontSize: 16, fontWeight: 'bold'},
  image: {height: 60, width: 50},
});
