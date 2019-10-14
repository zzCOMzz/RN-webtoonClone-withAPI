import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Item, Input, Icon, Card, CardItem, Button, Fab} from 'native-base';
import {initLoginState} from 'reducers';
export default class Creation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: initLoginState.banners,
      fabAction: false,
    };
  }

  render() {
    const {dataImage, fabAction} = this.state;
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataImage}
            renderItem={({item}) => {
              return (
                <Card key={item.id}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('EditWebtoon')
                    }>
                    <CardItem>
                      <Image source={{uri: item.url}} style={Styles.image} />
                      <View style={{marginLeft: 15}}>
                        <Text style={Styles.titleItem}>{item.title}</Text>
                        <Text style={{fontSize: 15}}>
                          {Math.floor(Math.random() * 99)} Episode(s)
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

        <Fab
          direction="up"
          active={fabAction}
          containerStyle={{}}
          style={{backgroundColor: 'orange'}}
          position="bottomRight"
          onPress={() => this.setState({fabAction: !fabAction})}>
          <Icon name={fabAction ? 'apps' : 'menu'} />
          <Button
            style={{backgroundColor: '#00FF42'}}
            onPress={() => this.props.navigation.navigate('CreationWebtoon')}>
            <Icon name="add" />
          </Button>
          <Button
            style={{backgroundColor: '#FF1242'}}
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Icon name="arrow-back" />
          </Button>
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
  titleItem: {fontSize: 20, fontWeight: 'bold'},
  image: {height: 80, width: 65},
});
