import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Input from '../inputs/input';
import CheckBox from '@react-native-community/checkbox';
import GenericButton from '../buttons/genericButton';
import API from '../../api/api';
import Storage from '../../storage/storage';
import FloatingLoader from '../loaders/floatingLoader';

// TODO Get loading icon for all API Calls
export default function LoginForm(props) {
  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const validateInputs = () => {
    if (username.length <= 0) {
      ToastAndroid.show(
        'Please enter a username',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (password.length <= 0) {
      ToastAndroid.show(
        'Please enter a password',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    API.authenticate(username, password)
      .then((result) => {
        console.log(result);
        if (result.access_token) {
          Storage.setAuthToken(result.access_token);
          Storage.setRememberMe(remember);
          navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
        } else {
          ToastAndroid.show(
            'Invalid username or password',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        ToastAndroid.show(
          'Netowrk request failed',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setLoading(false);
      });
  };

  return (
    <Container>
      <Header>Sign In</Header>
      <Input
        placeholder="Username"
        width={300}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Password"
        width={300}
        secure={!showPassword}
        onChangeText={(text) => setPassword(text)}
        image={
          showPassword
            ? require('../../assets/visibility.png')
            : require('../../assets/visibility_off.png')
        }
        onPress={() => setShowPassword(!showPassword)}
      />
      <RowContainer width={300}>
        <RowContainer>
          <CheckBox
            disabled={false}
            value={remember}
            onValueChange={() =>
              remember ? setRemember(false) : setRemember(true)
            }
            tintColors={{true: '#ffd54f', false: '#ffd54f'}}
          />
          <Text>Remember me</Text>
        </RowContainer>
        <Button>
          <Text>Forgot Password?</Text>
        </Button>
      </RowContainer>
      <GenericButton title="SIGN IN" onPress={validateInputs} />
      {loading ? <FloatingLoader /> : null}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.width || 'auto'};
`;

const Header = styled.Text`
  font-size: 40px;
  color: #ffd54f;
  font-family: 'Roboto-Light';
  margin: 10px;
`;

const Button = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: 14px;
  color: #ffd54f;
  font-family: 'Roboto-Regular';
  margin: 5px;
`;
