import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Header, Left, Item, Input, Icon} from 'native-base';

class HeaderProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.headerContainer}>
        <View style={Styles.header}>
          <View style={Styles.textHeader}>
            <Text style={Styles.textProf}>{this.props.title}</Text>
          </View>
          <View style={Styles.icon}>
            <TouchableOpacity onPress={() => this.props.handleFunc()}>
              <Icon name={this.props.icon} style={{color: 'yellow'}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  icon: {marginTop: 17, marginRight: 30},
  textProf: {fontSize: 25, fontWeight: 'bold'},
  textHeader: {marginTop: 15, marginLeft: 35},
  img: {height: 150, width: 150},
  imageProf: {justifyContent: 'center', alignItems: 'center'},
  creation: {
    borderBottomWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logoutBtn: {
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginTop: 5,
    paddingBottom: 5,
  },
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
export default HeaderProfile;
