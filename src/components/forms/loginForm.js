import React, {useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Input from '../inputs/input';
import CheckBox from '@react-native-community/checkbox';
import GenericButton from '../buttons/genericButton';
import API from '../../api/api';
import Storage from '../../storage/storage';

// TODO Get loading icon for all API Calls
export default function LoginForm(props) {
  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const login = () => {
    // TODO Connect API after sorting the identity server URL issues
    // authorize(API.config)
    //   .then((result) => {
    //     console.log(result);
    //     goToScreen('Dashboard');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    API.authenticate('sam.olwe@gmail.com', 'P@ssw0rd')
      .then((result) => {
        console.log(result);
        if (result.access_token) {
          Storage.setAuthToken(result.access_token);
          goToScreen('Dashboard');
        } else {
          throw new Error(result);
        }
      })
      .catch((error) => {
        // console.log(error);
        ToastAndroid.show(
          'Invalid username or password',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
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
        secure={true}
        onChangeText={(text) => setPassword(text)}
      />
      <RowContainer width={300}>
        <RowContainer>
          <CheckBox
            disabled={false}
            value={remember}
            onValueChange={() =>
              remember ? setRemember(false) : setRemember(true)
            }
            tintColors={{true: '#333333', false: '#333333'}}
          />
          <Text>Remember me</Text>
        </RowContainer>
        <Button onPress={() => goToScreen('Reset')}>
          <Text>Forgot Password?</Text>
        </Button>
      </RowContainer>
      <GenericButton title="SIGN IN" onPress={login} />
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
  color: #000000;
  font-family: 'Roboto-Light';
  margin: 10px;
`;

const Button = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: 14px;
  color: #000000;
  font-family: 'Roboto-Regular';
  margin: 5px;
`;
