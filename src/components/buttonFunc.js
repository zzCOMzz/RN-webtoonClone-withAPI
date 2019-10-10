import React, {Component} from 'react';
import {Icon, Content} from 'native-base';

class ButtonShare extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content style={{marginRight: 30}}>
        <Icon
          onPress={() => this.props.handleFunct()}
          name={this.props.iconName}
        />
      </Content>
    );
  }
}
export default ButtonShare;
