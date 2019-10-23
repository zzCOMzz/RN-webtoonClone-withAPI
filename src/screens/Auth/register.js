import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Image,
  Keyboard,
  AsyncStorage,
} from 'react-native';

import {
  Input,
  Card,
  CardItem,
  Item,
  Form,
  Label,
  Icon,
  Spinner,
} from 'native-base';
import LogoWebtoon from 'Assets/webtoon-logo.png';
import Host from 'functions/host';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      isVisible: true,
      isEmailValid: false,
      isPasswordValid: false,
      textPassValid: 'Password',
      isLoading: false,
    };
  }

  handleEmail = email => {
    const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const onValidation = validate.test(String(email).toLowerCase());

    this.setState({email});
    if (onValidation) {
      this.setState({isEmailValid: true});
    } else {
      this.setState({isEmailValid: false});
    }
  };

  handlePassword = password => {
    const weak = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    const strong = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    this.setState({password});
    if (weak.test(String(password).toLowerCase())) {
      this.setState({textPassValid: 'Weak', isPasswordValid: false});
    } else if (strong.test(String(password).toLowerCase()) && password !== '') {
      this.setState({textPassValid: 'Strong', isPasswordValid: true});
    } else {
      this.setState({textPassValid: 'Password', isPasswordValid: false});
    }
  };
  handleSubmit = () => {
    const {
      isEmailValid,
      isPasswordValid,
      email,
      username,
      password,
    } = this.state;
    Keyboard.dismiss();
    if (isEmailValid && isPasswordValid && username !== '') {
      this.setState({isLoading: true});
      axios({
        method: 'POST',
        url: `${Host}/auth/register`,
        data: {
          username,
          email,
          password,
        },
      })
        .then(res => {
          const {data} = res;
          if (data.success) {
            return this.handleLogin();
          } else {
            Alert.alert(`${data.message}`, 'Create Account Failed', [
              {
                text: 'Try Again',
                onPress: () => {
                  this.props.navigation.navigate('Register');
                },
              },
            ]);
            this.setState({isEmailValid: false, isLoading: false});
          }
        })
        .catch(err => console.log('Error :', err));
    } else {
      Alert.alert('Data Not Valid', 'Please, Complete the Form Correctly', [
        {
          text: 'Try Again',
          onPress: () => {
            console.log('ok');
          },
        },
      ]);
      console.log(Host);
    }
  };

  handleLogin = () => {
    const {email, password} = this.state;
    axios({
      method: 'POST',
      url: `${Host}/auth/login`,
      data: {
        email,
        password,
      },
    })
      .then(res => {
        const {data} = res;
        if (data.success) {
          AsyncStorage.setItem('token', data.token);
          AsyncStorage.setItem('username', data.username);
          AsyncStorage.setItem('userId', data.idUser);
          AsyncStorage.setItem('imageProfile', data.image_profile);
          return this.props.navigation.navigate('AuthLoading');
        } else {
          Alert.alert(`${data.message}`, 'Back to Login', [
            {
              text: 'Try Again',
              onPress: () => this.props.navigation.navigate('Login'),
            },
          ]);
          this.setState({isLoading: false, isEmailValid: false});
        }
      })
      .catch(err => {
        Alert.alert(`${err}`, 'Can not get data from Server', [
          {text: 'Try Again', onPress: () => console.log('Ok')},
        ]);
        this.setState({isLoading: false, isEmailValid: false});
        console.log('Error :', err);
      });
  };
  render() {
    const {
      isVisible,
      isEmailValid,
      textPassValid,
      email,
      password,
      username,
      isLoading,
    } = this.state;
    return (
      <View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10%',
          }}>
          <Image source={LogoWebtoon} style={{width: 160, height: 160}} />
          <Text style={{fontSize: 33}}>Welcome</Text>
          <View>
            <Text>Sign Up with new account</Text>
          </View>
        </View>
        <KeyboardAvoidingView behavior="position">
          <View style={{marginTop: '8%'}}>
            {isLoading ? (
              <Spinner size="large" color="green" />
            ) : (
              <View>
                <Form>
                  <Card>
                    <CardItem>
                      <Item floatingLabel>
                        <Label>Username</Label>
                        <Input
                          value={username}
                          autoCapitalize="none"
                          onChangeText={text => this.setState({username: text})}
                          returnKeyType="next"
                        />
                      </Item>
                    </CardItem>
                    <CardItem>
                      <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                          value={email}
                          autoCapitalize="none"
                          style={
                            isEmailValid ? {color: 'black'} : {color: 'red'}
                          }
                          onChangeText={text => this.handleEmail(text)}
                          textContentType="emailAddress"
                          returnKeyType="next"
                        />
                      </Item>
                    </CardItem>
                    <CardItem>
                      <Item floatingLabel>
                        <Label
                          style={
                            textPassValid === 'Weak'
                              ? {color: 'red'}
                              : textPassValid === 'Strong'
                              ? {color: 'green'}
                              : {color: 'grey'}
                          }>
                          {textPassValid}
                        </Label>
                        <Input
                          value={password}
                          autoCapitalize="none"
                          onChangeText={text => this.handlePassword(text)}
                          returnKeyType="done"
                          secureTextEntry={isVisible}
                        />
                        {isVisible ? (
                          <Icon
                            name="ios-eye-off"
                            onPress={() =>
                              this.setState({isVisible: !isVisible})
                            }
                          />
                        ) : (
                          <Icon
                            name="ios-eye"
                            onPress={() =>
                              this.setState({isVisible: !isVisible})
                            }
                          />
                        )}
                      </Item>
                    </CardItem>
                    <TouchableOpacity onPress={() => this.handleSubmit()}>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginBottom: '5%',
                          marginTop: '2%',
                        }}>
                        <Text style={{fontSize: 23, fontStyle: 'italic'}}>
                          Register
                        </Text>
                      </View>
                    </TouchableOpacity>
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
                    <Text style={{fontWeight: 'bold', fontSize: 17}}>
                      {' '}
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Register;
