import React, {useEffect, useReducer, useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import {Input, Card, CardItem, Item, Icon, Image} from 'native-base';
import {appReducer, initLoginState} from 'reducers';

class ScreenForYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataImage: initLoginState.banners,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <View>
        <View>
          <Item rounded style={{paddingHorizontal: 10, marginTop: '2%'}}>
            <Input placeholder="Search" style={{marginHorizontal: 5}} />
            <Icon name="search" />
          </Item>
        </View>
      </View>
    );
  }
}

export default ScreenForYou;
