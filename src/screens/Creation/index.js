import React, {Component} from 'react';

import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {Item, Input, Icon, Card, CardItem, Button, Fab} from 'native-base';
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
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataImage}
            renderItem={({item}) => {
              return (
                <Card key={item.id}>
                  <CardItem>
                    <Image source={{uri: item.url}} style={Styles.image} />
                    <View style={{marginLeft: 15}}>
                      <Text style={Styles.titleItem}>{item.title}</Text>
                      <Text style={{fontSize: 12}}>
                        {Math.floor(Math.random() * 99)} Episode(s)
                      </Text>
                    </View>
                  </CardItem>
                </Card>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <Fab
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => alert('hello world')}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  searchInput: {
    marginTop: '2%',
    borderRadius: 15,
    borderWidth: 8,
    marginBottom: 5,
  },
  titleItem: {fontSize: 16, fontWeight: 'bold'},
  image: {height: 60, width: 50},
});
