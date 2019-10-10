import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {Item, Input, Icon, Card, CardItem, Button} from 'native-base';
import {initLoginState} from 'reducers';

class FavouriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: initLoginState.banners,
    };
  }

  filterMethod = input => {
    if (input.trim() === '') {
      this.setState({dataImage: initLoginState.banners});
    } else {
      const newImage = this.state.dataImage.filter(item => {
        const textInput = input.toUpperCase();
        const titleText = item.title.toUpperCase();
        if (titleText.indexOf(textInput) > -1) {
          return item;
        }
      });
      this.setState({dataImage: newImage});
    }
  };

  render() {
    const {dataImage} = this.state;
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Item rounded style={Styles.searchInput}>
          <Input
            placeholder="Search"
            onChangeText={text => this.filterMethod(text)}
            style={{marginHorizontal: 5}}
          />
          <Icon name="search" />
        </Item>
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
                      <Text>{Math.floor(Math.random() * 99)} Favourite</Text>
                    </View>
                  </CardItem>
                </Card>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
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
  titleItem: {fontSize: 20, fontWeight: 'bold'},
  image: {height: 120, width: 120},
});

export default FavouriteScreen;
