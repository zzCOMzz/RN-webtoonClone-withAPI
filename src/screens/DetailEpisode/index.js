import React, {Component} from 'react';
import {View, StyleSheet, Image, FlatList, Dimensions} from 'react-native';

import {initLoginState} from 'reducers';

class DetailEpisode extends Component {
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataImage}
          renderItem={({item}) => {
            return (
              <View>
                <Image source={{uri: item.url}} style={Styles.komik} />
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  komik: {height: 500, width: Dimensions.get('window').width},
});
export default DetailEpisode;
