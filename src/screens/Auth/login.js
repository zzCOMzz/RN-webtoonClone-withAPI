import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
} from 'react-native';

import {
  Text,
  Input,
  Label,
  Button,
  Item,
  Form,
  Icon,
  Spinner,
} from 'native-base';
import {appReducer, initLoginState} from 'reducers';
import LogoWebtoon from 'Assets/webtoon-logo.png';
import Host from 'functions/host';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isVisible: true,
      isEmailValid: false,
      btnActive: true,
      isError: false,
      isLoading: false,
    };
  }

  handleVisibel = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  handleEmail = email => {
    this.setState({email});
    const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const onValidation = validate.test(String(email).toLowerCase());
    if (onValidation) {
      this.setState({isEmailValid: true});
    } else {
      this.setState({isEmailValid: false});
    }
  };

  handlePassword = password => {
    this.setState({password});
  };

  handleSubmit = () => {
    const {isEmailValid, email, password} = this.state;
    Keyboard.dismiss();
    if (isEmailValid && password !== '') {
      this.setState({isLoading: true});
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
          console.log(data);
          if (data.success) {
            AsyncStorage.setItem('token', data.token);
            this.setState({isLoading: false});
            return this.props.navigation.navigate('AuthLoading');
          } else {
            Alert.alert(`${data.message}`, '', [
              {text: 'Try Again', onPress: () => console.log('ok')},
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

  render() {
    const {
      isVisible,
      isEmailValid,
      email,
      password,
      btnActive,
      isError,
      isLoading,
    } = this.state;
    return (
      <View>
        <KeyboardAvoidingView behavior="position">
          <View style={{justifyContent: 'center'}}>
            <View style={Styles.headerTop}>
              <Image style={Styles.imageContainer} source={LogoWebtoon} />
              <View style={Styles.containerTextHeader}>
                <Text style={{fontSize: 40}}>LOG IN</Text>
                <Text>Login with your WEBTOON account</Text>
              </View>
            </View>

            <Form style={Styles.formContainer}>
              {isLoading ? (
                <Spinner />
              ) : (
                <View>
                  <Item floatingLabel>
                    <Label
                      style={isEmailValid ? {color: 'blue'} : {color: 'grey'}}>
                      Email
                    </Label>
                    <Input
                      onChangeText={text => this.handleEmail(text)}
                      returnKeyType="next"
                      autoCapitalize="none"
                    />
                  </Item>
                  <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                      secureTextEntry={isVisible}
                      autoCapitalize="none"
                      onChangeText={text => this.handlePassword(text)}
                      returnKeyType="done"
                    />
                    {isVisible ? (
                      <Icon
                        name="ios-eye-off"
                        onPress={() => this.handleVisibel()}
                      />
                    ) : (
                      <Icon
                        name="ios-eye"
                        onPress={() => this.handleVisibel()}
                      />
                    )}
                  </Item>
                  <TouchableOpacity onPress={() => this.handleSubmit()}>
                    <View
                      style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginBottom: '5%',
                        marginTop: '5%',
                      }}>
                      <Text style={{fontSize: 23, fontStyle: 'italic'}}>
                        Login
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      marginTop: '5%',
                    }}>
                    <Text style={{color: 'grey'}}>Don't Have an Account </Text>
                    <TouchableOpacity
                      style={{borderRadius: 6}}
                      onPress={() =>
                        this.props.navigation.navigate('Register')
                      }>
                      <Text style={{fontWeight: 'bold'}}> Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Form>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  headerTop: {alignItems: 'center', marginTop: 40},
  containerTextHeader: {alignItems: 'center', marginTop: 25},
  imageContainer: {width: 150, height: 150},
  formContainer: {marginTop: '12%', paddingRight: 15},
  btnSubmitView: {marginTop: 40, paddingHorizontal: 40},
});

export default Login;
