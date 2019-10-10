import React, {Component} from 'react';
import {Text, View} from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 20}}>{this.props.titleText}</Text>
      </View>
    );
  }
}

export default Header;
