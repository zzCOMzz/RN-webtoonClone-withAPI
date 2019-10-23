import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {host} from '../../functions/host';
import {Icon, Card, CardItem, Button, Fab} from 'native-base';
import {initLoginState} from 'reducers';
import {getUserId, getUserToken} from '../../functions';
import {connect} from 'react-redux';
import {actionGetMyWebtoon} from '../../redux/actions/actionWebtoon';
class Creation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataImage: initLoginState.banners,
      fabAction: false,
    };
  }
  async componentDidMount() {
    const userId = await getUserId();
    const token = await getUserToken();
    await this.props.dipatchGetMyWebtoon(userId, token);
    console.log('get My Webtoon', this.props);
  }

  render() {
    const {dataImage, fabAction} = this.state;
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.getMyWebtoon.data}
            renderItem={({item}) => {
              return (
                <Card key={item._id}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('EditWebtoon')
                    }>
                    <CardItem>
                      <Image
                        source={{uri: `${host}${item.image_banner}`}}
                        style={Styles.image}
                      />
                      <View style={{marginLeft: 15}}>
                        <Text style={Styles.titleItem}>
                          {item.title.toUpperCase()}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}>
                          <Text style={{fontSize: 15, marginRight: 35}}>
                            Genre : {item.genre}
                          </Text>
                          <Text style={{fontSize: 15}}>
                            favourite : {item.favourite}
                          </Text>
                        </View>
                      </View>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              );
            }}
            keyExtractor={item => item._id}
          />
        </View>

        <Fab
          direction="up"
          active={fabAction}
          containerStyle={{}}
          style={{backgroundColor: 'orange'}}
          position="bottomRight"
          onPress={() => this.setState({fabAction: !fabAction})}>
          <Icon name={fabAction ? 'apps' : 'menu'} />
          <Button
            style={{backgroundColor: '#00FF42'}}
            onPress={() => this.props.navigation.navigate('CreationWebtoon')}>
            <Icon name="add" />
          </Button>
          <Button
            style={{backgroundColor: '#FF1242'}}
            onPress={() => this.props.navigation.navigate('Profile')}>
            <Icon name="arrow-back" />
          </Button>
        </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    getMyWebtoon: state.getMyWebtoon.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dipatchGetMyWebtoon: (userId, token) => {
      dispatch(actionGetMyWebtoon(userId, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Creation);

const Styles = StyleSheet.create({
  searchInput: {
    marginTop: '2%',
    borderRadius: 15,
    borderWidth: 8,
    marginBottom: 5,
  },
  titleItem: {fontSize: 20, fontWeight: 'bold'},
  image: {height: 80, width: 65},
});
