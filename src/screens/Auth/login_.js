import React, {useReducer, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Text, Input, Label, Button, Item, Form, Icon} from 'native-base';
import {appReducer, initLoginState} from 'reducers';
import LogoWebtoon from 'Assets/webtoon-logo.png';
import Host from 'functions/host';
import axios from 'axios';

const Login = props => {
  const [state, dispatch] = useReducer(appReducer, initLoginState);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [visible, setVisible] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [btnActive, setBtnActive] = useState(true);

  const handleLook = () => {
    setVisible(!visible);
  };

  const validationText = textEmail => {
    if (textEmail === '') {
      setIsValid(false);
      setIsError(false);
      return;
    }
    const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const onValidation = validate.test(String(textEmail).toLowerCase());

    if (onValidation) {
      setIsError(false);
      setIsValid(true);
    } else {
      setIsValid(false);
      setBtnActive(true);
      setIsError(true);
    }
  };

  const handleValidAll = text => {
    if (text !== '' && isValid) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  };

  const handleLogin = () => {
    axios({
      method: 'POST',
      url: `${Host}/auth/login`,
      data: {
        email,
        password: pass,
      },
    })
      .then(result => {
        console.log(result.data);
        const {data} = result;

        if (data.success) {
          Alert.alert(`${data.message}`, '', [
            {
              text: 'Login',
              onPress: () => props.navigation.navigate('AuthLoading'),
            },
          ]);
        } else {
          Alert.alert(`${data.message}`, '', [
            {
              text: 'Try Again',
              onPress: () => {
                props.navigation.navigate('Login');
              },
            },
          ]);
        }
      })
      .catch(err => console.log(err));
  };
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
            <Item stackedLabel error={isError} success={isValid}>
              {isValid ? (
                <Label style={{color: 'green'}}>Format Email Valid</Label>
              ) : (
                <Label>Email</Label>
              )}
              <Item>
                <Input
                  onChangeText={text => setEmail(text)}
                  value={email}
                  onChange={e => validationText(e.nativeEvent.text)}
                  style={isError ? {color: 'red'} : {color: 'black'}}
                  textContentType="emailAddress"
                  placeholder="Input Your Email"
                  returnKeyType="next"
                />
                {isError ? (
                  <Icon name="ios-close-circle" style={{color: 'red'}} />
                ) : isValid ? (
                  <Icon name="ios-checkmark-circle" style={{color: 'green'}} />
                ) : (
                  <Icon />
                )}
              </Item>
            </Item>

            <Item stackedLabel>
              <Label>Password</Label>
              <Item>
                <Input
                  secureTextEntry={visible}
                  onChangeText={text => setPass(text)}
                  value={pass}
                  placeholder="Input Your Password"
                  onChange={e => handleValidAll(e.nativeEvent.text)}
                  returnKeyType="send"
                />
                {visible ? (
                  <Icon name="ios-eye-off" onPress={() => handleLook()} />
                ) : (
                  <Icon name="ios-eye" onPress={() => handleLook()} />
                )}
              </Item>
            </Item>

            <View style={Styles.btnSubmitView}>
              <Button
                rounded
                onPress={() => {
                  // dispatch({
                  //   type: 'LOGIN',
                  //   userData: JSON.stringify({email, pass}),
                  // });

                  handleLogin();
                }}
                disabled={btnActive}
                style={[
                  {justifyContent: 'center'},
                  btnActive
                    ? {backgroundColor: 'gray'}
                    : {backgroundColor: 'orange'},
                ]}>
                <Text
                  style={{
                    color: 'black',
                  }}>
                  Log In
                </Text>
              </Button>
            </View>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: '5%',
              }}>
              <Text style={{color: 'grey'}}>Don't Have an Account? </Text>
              <TouchableOpacity
                style={{borderRadius: 6}}
                onPress={() => props.navigation.navigate('Register')}>
                <Text style={{fontWeight: 'bold'}}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </Form>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const Styles = StyleSheet.create({
  headerTop: {alignItems: 'center', marginTop: 40},
  containerTextHeader: {alignItems: 'center', marginTop: 25},
  imageContainer: {width: 150, height: 150},
  formContainer: {marginTop: 50, paddingRight: 15},
  btnSubmitView: {marginTop: 40, paddingHorizontal: 40},
});

export default Login;
