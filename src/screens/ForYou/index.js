import React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import {Input, Card, CardItem, Item, Icon, Button} from 'native-base';
import {appReducer, initLoginState} from 'reducers';

class ScreenForYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataImage: initLoginState.banners,
    };
  }

  componentDidMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataImage.length - 1
              ? 0
              : this.state.position + 1,
        });
      }, 3000),
    });
  }

  render() {
    const {dataImage, position} = this.state;
    return (
      <View style={{marginHorizontal: 10}}>
        <Item rounded style={Styles.searchInput}>
          <Input placeholder="Search" style={{marginHorizontal: 5}} />
          <Icon name="search" />
        </Item>
        <ScrollView
          nestedScrollEnabled={false}
          style={{marginBottom: '10%'}}
          showsVerticalScrollIndicator={false}>
          <Item style={Styles.bannerSlide}>
            <Slideshow
              dataSource={dataImage}
              position={position}
              onPositionChanged={position => this.setState({position})}
            />
          </Item>

          <View style={{marginTop: 10}}>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 20}}>Favourite</Text>
            </View>
            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dataImage}
                renderItem={({item}) => (
                  <Card>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Details')}>
                      <CardItem>
                        <Image
                          source={{uri: item.url}}
                          style={{height: 100, width: 100}}
                        />
                      </CardItem>
                      <View style={{alignItems: 'center', marginBottom: 5}}>
                        <Text style={{fontSize: 14}}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 20}}>All</Text>
            </View>
            <View>
              {dataImage.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Details')}>
                    <Card key={item.id}>
                      <CardItem>
                        <Image
                          source={{uri: item.url}}
                          style={{height: 100, width: 100}}
                        />
                        <View style={{marginLeft: 15}}>
                          <Text style={{fontSize: 16}}>{item.title}</Text>
                          <Button
                            onPress={() => alert('he')}
                            warning
                            style={Styles.btnFavour}>
                            <Text>+ Favourite</Text>
                          </Button>
                        </View>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  searchInput: {
    marginTop: '2%',
    borderRadius: 15,
    borderWidth: 8,
    marginBottom: 5,
  },
  bannerSlide: {padding: 5, margin: 4, borderWidth: 5, borderRadius: 4},
  btnFavour: {
    height: 30,
    width: 110,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
  },
});

export default ScreenForYou;
