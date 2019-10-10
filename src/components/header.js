import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'native-base';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20}}>Hello Webtoon</Text>
      </View>
    );
  }
}

export default Header;
