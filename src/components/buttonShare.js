import React, {Component} from 'react';
import {Icon, Content} from 'native-base';
import {Share} from 'react-native';

class ButtonShare extends Component {
  constructor(props) {
    super(props);
  }
  shareOptions = {
    title: 'Webtoon Comic',
    message: 'Read This Comic', // Note that according to the documentation at least one of "message" or "url" fields is required
    url: 'www.example.com',
    subject: 'Hello From Webtoon',
  };
  render() {
    return (
      <Content style={{marginRight: 30}}>
        <Icon onPress={() => Share.share(this.shareOptions)} name="share" />
      </Content>
    );
  }
}
export default ButtonShare;
