import React, {Component} from 'react';

import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {Item, Input, Icon, Card, CardItem, Button, Label} from 'native-base';
import {initLoginState} from 'reducers';
export default class Creation extends Component {
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
            renderItem={({item}) => {
              let date = item.id + 1;
              return (
                <Card key={item.id}>
                  <CardItem>
                    <Image source={{uri: item.url}} style={Styles.image} />
                    <View style={{marginLeft: 20}}>
                      <Text style={Styles.titleItem}>
                        {item.id + 1}.Gambar.png{' '}
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
          <Button style={{justifyContent: 'center', backgroundColor: 'gray'}}>
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
