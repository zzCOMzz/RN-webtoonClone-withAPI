import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Item, Input, Icon, Card, CardItem, Button, Label} from 'native-base';
import {initLoginState} from 'reducers';
import ImagePicker from 'react-native-image-picker';
import CropPicker from 'react-native-image-crop-picker';
export default class CreateEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageEpisodeCover: {
        uri:
          'https://images.vexels.com/media/users/3/130153/isolated/preview/93a30c258ebb3defaeabbe2568d9425b-dslr-camera-icon-by-vexels.png',
      },
      imageEpisode: [],
      episodeTitle: '',
    };
  }

  handleAddImageCover = () => {
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
          fileName: res.fileName,
        };

        this.setState({
          imageEpisodeCover: opt,
        });
      }
    });
  };

  handleAddImage = () => {
    // const options = {
    //   title: 'Select Photo',
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    // ImagePicker.showImagePicker(options, res => {
    //   if (res.didCancel) {
    //     alert('Add Image was Canceled');
    //   } else if (res.error) {
    //     console.log(res.error);
    //     alert('Response Erorr');
    //   } else if (res.customButton) {
    //     console.log(res.customButton);
    //   } else {
    //     let opt = {
    //       uri: res.uri,
    //       type: res.type,
    //       fileName: res.fileName,
    //     };

    //     this.setState({
    //       imageEpisode: [...this.state.imageEpisode, opt],
    //     });
    //   }
    // });

    CropPicker.openPicker({multiple: true}).then(images => {
      console.log(images);
      images.map(image => {
        let opt = {
          uri: image.path,
          mime: image.mime,
        };

        this.setState({imageEpisode: [...this.state.imageEpisode, opt]});
      });
    });
  };

  deleteImage = photo => {
    let a = this.state.imageEpisode.filter(p => photo.uri !== p.uri);
    this.setState({imageEpisode: a});
  };
  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{marginTop: '3%'}}>
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
        <View style={{flex: 1, marginTop: '5%'}}>
          <Text style={{fontSize: 20}}>Add Cover</Text>
          <TouchableOpacity onPress={() => this.handleAddImageCover()}>
            <Image
              source={this.state.imageEpisodeCover}
              style={{width: '100%', height: 140}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            flex: 1,
            marginTop: '10%',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
          }}>
          {this.state.imageEpisode.map((item, idx) => {
            return (
              <View
                key={item.uri}
                style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                <Image
                  source={item}
                  style={{width: 90, height: 90, marginBottom: 20}}
                />
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                    <Text>{idx + 1}.jpg</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={{flex: 1, marginTop: 10}}>
          <Button
            style={{justifyContent: 'center', backgroundColor: 'gray'}}
            onPress={this.handleAddImage}>
            <Text style={{color: 'white', fontSize: 20}}>+ Image</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  searchInput: {
    borderWidth: 8,
    marginBottom: 5,
  },
  titleItem: {fontSize: 16, fontWeight: 'bold'},
  image: {height: 60, width: 50},
});
