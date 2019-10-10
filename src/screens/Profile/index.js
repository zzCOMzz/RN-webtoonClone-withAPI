import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Header, Left, Right, Body, Icon, Thumbnail} from 'native-base';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View style={Styles.headerContainer}>
          <View style={Styles.header}>
            <View style={{marginTop: 15, marginLeft: 35}}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>Profile</Text>
            </View>
            <View style={{marginTop: 17, marginRight: 35}}>
              <TouchableOpacity>
                <Icon name="create" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: '10%'}}>
          <View style={{justifyContent: 'center'}}>
            <Thumbnail
              style={{height: 150, width: 150}}
              source={{
                uri:
                  'data:image/jpeg;base64,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',
              }}
            />
            <Text style={{fontSize: 30}}>Your Name</Text>
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <View
            style={{
              borderBottomWidth: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: 25}}>My Webtoon Creation</Text>
            <Icon name="ios-arrow-forward" style={{margin: 4}} />
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              paddingHorizontal: 10,
              marginTop: 5,
              paddingBottom: 5,
            }}>
            <Text style={{fontSize: 25}}>Log Out</Text>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  headerContainer: {
    marginTop: 0,
    padding: 0,
    borderBottomWidth: 2,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default ProfileScreen;
