import React, {Component} from 'react';

import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {Item, Input, Icon, Card, CardItem, Button, Label} from 'native-base';
import {initLoginState} from 'reducers';
import ImagePicker from 'react-native-image-picker';
export default class CreateEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: initLoginState.banners,
    };
  }

  handleAddImage = () => {
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
        const sourceImage = res.uri;
        this.setState({
          dataImage: [...this.state.dataImage, {url: sourceImage, id: 5}],
        });
      }
    });
  };

  render() {
    const {dataImage} = this.state;
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{marginTop: '3%'}}>
          <Text style={{fontSize: 20}}>Name</Text>
          <Item reguler style={Styles.searchInput}>
            <Input placeholder="Name" style={{marginHorizontal: 10}} />
          </Item>
        </View>
        <View style={{flex: 1, marginTop: '5%'}}>
          <Text style={{fontSize: 20}}>Add Image</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataImage}
            renderItem={({item}, idx) => {
              let date = item.id + 1;
              return (
                <Card key={item.id}>
                  <CardItem>
                    <Image source={{uri: item.url}} style={Styles.image} />
                    <View style={{marginLeft: 20}}>
                      <Text style={Styles.titleItem}>
                        Gambar{item.id + 1}.png{' '}
                      </Text>
                      <Button
                        warning
                        style={{justifyContent: 'center', height: 20}}>
                        <Text style={{fontSize: 12}}>Delete</Text>
                      </Button>
                    </View>
                  </CardItem>
                </Card>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
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
