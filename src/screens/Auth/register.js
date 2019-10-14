import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Input, Card, CardItem, Item, Form, Label} from 'native-base';

class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10%',
          }}>
          <Text style={{fontSize: 33}}>Welcome</Text>
          <View>
            <Text>Sign Up with new account</Text>
          </View>
        </View>
        <View style={{marginTop: '20%'}}>
          <Form>
            <Card>
              <CardItem>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input />
                </Item>
              </CardItem>
              <CardItem>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input />
                </Item>
              </CardItem>
              <CardItem>
                <Item floatingLabel>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </CardItem>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginBottom: '5%',
                  marginTop: '2%',
                }}>
                <TouchableOpacity>
                  <Text style={{fontSize: 20}}>Register New Account</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </Form>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '5%',
            }}>
            <Text style={{color: 'grey', fontSize: 17}}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{fontWeight: 'bold', fontSize: 17}}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Register;
