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
import {actionGetMyEpisodeImage} from '../../redux/actions/actionWebtoon';
import {connect} from 'react-redux';
import {host} from '../../functions/host';
import {getUserId, getUserToken} from '../../functions';
class EditEpisode extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;

    this.state = {
      dataImage: initLoginState.banners,
      episodeTitle: navigation.getParam('episodeTitle'),
      episodeId: navigation.getParam('episodeId'),
      webtoonId: navigation.getParam('webtoonId'),
    };
  }
  async componentDidMount() {
    const token = await getUserToken();
    const userId = await getUserId();

    await this.props.getMyImageEpisode(
      userId,
      this.state.webtoonId,
      this.state.episodeId,
      token,
    );
  }

  render() {
    const {dataImage} = this.state;
    this.props.myEpisodeImage;
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{marginTop: '3%'}}>
          <Text style={{fontSize: 20}}>Title</Text>
          <Item reguler style={Styles.searchInput}>
            <Input
              value={this.state.episodeTitle}
              style={{marginHorizontal: 10}}
            />
          </Item>
        </View>
        <View style={{flex: 1, marginTop: '2%'}}>
          <Text style={{fontSize: 20}}>Episode</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.myEpisodeImage.data}
            renderItem={({item}) => {
              return (
                <Card key={item._id}>
                  <CardItem>
                    <Image
                      source={{uri: `${host}${item.image_url}`}}
                      style={Styles.image}
                    />
                    <View style={{marginLeft: 15}}>
                      <Text style={Styles.titleItem}>{item.image_name}</Text>
                    </View>
                  </CardItem>
                </Card>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={{flex: 1, marginTop: 10}}>
          <Button
            warning
            onPress={() =>
              this.props.navigation.navigate('CreateWebtoonEpisode')
            }
            style={{justifyContent: 'center'}}>
            <Text style={{color: 'white'}}>+ Image</Text>
          </Button>
          <Button
            transparent
            onPress={() => alert('Episode Deleted')}
            style={{
              justifyContent: 'center',
              borderWidth: 3,
              marginTop: 20,
              borderColor: 'red',
            }}>
            <Text style={{color: 'black'}}>Delete Episode</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    myEpisodeImage: state.getDetailMyEpisode.data,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMyImageEpisode: (userId, webtoonId, episodeId, token) =>
      dispatch(actionGetMyEpisodeImage(userId, webtoonId, episodeId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEpisode);
const Styles = StyleSheet.create({
  searchInput: {
    borderWidth: 8,
    marginBottom: 5,
  },
  titleItem: {fontSize: 16, fontWeight: 'bold'},
  image: {height: 60, width: 50},
});
