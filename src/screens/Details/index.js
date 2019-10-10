import React, {Component} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {Card, CardItem} from 'native-base';

import {initLoginState} from 'reducers';
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: initLoginState.banners,
    };
  }

  render() {
    const {dataImage} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={Styles.viewBanner}>
          <Image source={{uri: dataImage[0].url}} style={Styles.imageBanner} />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={dataImage}
            renderItem={({item}) => {
              return (
                <Card key={item.id}>
                  <CardItem>
                    <Image
                      source={{uri: item.url}}
                      style={{height: 100, width: 100}}
                    />
                    <View style={{marginLeft: 15}}>
                      <Text style={{fontSize: 16}}>Ep. {item.id + 1}</Text>
                      <View style={Styles.textDate}>
                        <Text>{item.id + 4} Mei 2019</Text>
                      </View>
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
  textDate: {
    height: 30,
    width: 110,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
  },
  imageBanner: {width: '100%', height: 220},
  viewBanner: {borderWidth: 4, borderRadius: 4},
});
export default Details;
