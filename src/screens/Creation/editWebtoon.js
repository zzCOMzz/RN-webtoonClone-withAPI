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
import {
  actionGetMyEpisode,
  actionGetMyWebtoon,
} from '../../redux/actions/actionWebtoon';
import {getUserId, getUserToken} from '../../functions';

class EditEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webtoonId: this.props.navigation.getParam('webtoonId'),
    };
  }

  async componentDidMount() {
    const userId = await getUserId();
    const token = await getUserToken();
    await this.props.getMyEpisode(userId, this.state.webtoonId, token);
    console.log('My EPISODE ', this.props);
  }
  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{marginTop: '3%'}}>
          <Text style={{fontSize: 20}}>Title</Text>
          <Item reguler style={Styles.searchInput}>
            <Input
              value={this.props.navigation.getParam('webtoonTitle')}
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
              this.props.navigation.navigate('CreateWebtoonEpisode', {
                webtoonId: this.state.webtoonId,
                webtoonTitle: this.props.navigation.getParam('webtoonTitle'),
              })
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

const mapStateToProps = state => {
  return {
    myEpisode: state.getEpisode.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMyEpisode: (userId, webtoonId, token) =>
      dispatch(actionGetMyEpisode(userId, webtoonId, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEpisode);

const Styles = StyleSheet.create({
  searchInput: {
    borderWidth: 8,
    marginBottom: 5,
  },
  titleItem: {fontSize: 16, fontWeight: 'bold'},
  image: {height: 60, width: 50},
});
