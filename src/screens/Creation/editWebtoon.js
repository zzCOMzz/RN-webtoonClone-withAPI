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
import {connect} from 'react-redux';
class EditEpisode extends Component {
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
            <Input
              value={this.props.navigation.getParam('titleWebtoon')}
              style={{marginHorizontal: 10}}
            />
          </Item>
        </View>
        <View style={{flex: 1, marginTop: '2%'}}>
          <Text style={{fontSize: 20}}>Episode</Text>
          {/*
          FlatList
          */}
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
          <Button
            transparent
            onPress={() => alert('Webtoon Deleted')}
            style={{
              justifyContent: 'center',
              borderWidth: 3,
              marginTop: 20,
              borderColor: 'red',
            }}>
            <Text style={{color: 'black'}}>Delete Webtoon</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default connect()(EditEpisode);

const Styles = StyleSheet.create({
  searchInput: {
    borderWidth: 8,
    marginBottom: 5,
  },
  titleItem: {fontSize: 16, fontWeight: 'bold'},
  image: {height: 60, width: 50},
});
