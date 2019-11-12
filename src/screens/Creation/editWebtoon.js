import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Item,
  Input,
  Icon,
  Card,
  CardItem,
  Button,
  Label,
  Spinner,
} from 'native-base';
import {initLoginState} from 'reducers';
import {connect} from 'react-redux';
import {
  actionGetMyEpisode,
  actionGetMyWebtoon,
} from '../../redux/actions/actionWebtoon';
import {host} from '../../functions/host';
import {getUserId, getUserToken} from '../../functions';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;
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
    await this.props.getMyWebtoon(userId, token);
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
        <View style={{marginTop: '2%', height: HEIGHT * 0.5}}>
          <Text style={{fontSize: 20}}>Episode</Text>
          {this.props.myEpisode.data <= 0 ? (
            <Text>Empty Episode</Text>
          ) : (
            <FlatList
              data={this.props.myEpisode.data}
              renderItem={({item, index}) => {
                return (
                  <View
                    key={item._id}
                    style={{flexDirection: 'row', margin: 10}}>
                    <Image
                      source={{uri: `${host}${item.image_cover}`}}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                      }}
                    />
                    <View style={{marginLeft: 15}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          fontStyle: 'italic',
                        }}>
                        Ep.{index + 1}
                      </Text>
                      <Text style={{fontSize: 16}}>{item.title}</Text>
                      <Text style={{fontSize: 16}}>
                        Update at {item.update_at.slice(0, 10)}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          )}
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
    getMyWebtoon: (userId, token) =>
      dispatch(actionGetMyWebtoon(userId, token)),
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
