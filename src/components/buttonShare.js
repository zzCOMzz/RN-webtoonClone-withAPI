import React, {Component} from 'react';
import {Icon, Content} from 'native-base';

class ButtonShare extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Content style={{marginRight: 30}}>
        <Icon name="share" />
      </Content>
    );
  }
}
export default ButtonShare;
