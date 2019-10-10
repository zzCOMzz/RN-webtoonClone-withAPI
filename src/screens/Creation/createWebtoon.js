import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Item, Input, Icon, Card, CardItem, Button, Label} from 'native-base';
import {initLoginState} from 'reducers';
export default class CreateWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: initLoginState.banners,
    };
  }

  render() {
    const {dataImage} = this.state;
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{marginTop: '3%'}}>
          <Text style={{fontSize: 20}}>Title</Text>
          <Item reguler style={Styles.searchInput}>
            <Input placeholder="Title" style={{marginHorizontal: 10}} />
          </Item>
        </View>
        <View style={{flex: 1, marginTop: '2%'}}>
          <Text style={{fontSize: 20}}>Episode</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataImage}
            renderItem={({item}) => {
              let date = item.id + 1;
              return (
                <Card key={item.id}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('EditWebtoon')
                    }>
                    <CardItem>
                      <Image source={{uri: item.url}} style={Styles.image} />
                      <View style={{marginLeft: 15}}>
                        <Text style={Styles.titleItem}>Ep. {item.id + 1}</Text>
                        <Text style={{fontSize: 12}}>
                          {(date += date + item.id)} May 2019
                        </Text>
                      </View>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{flex: 1, marginTop: 10}}>
          <Button
            warning
            onPress={() =>
              this.props.navigation.navigate('CreateWebtoonEpisode')
            }
            style={{justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>+ Add Episode</Text>
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
