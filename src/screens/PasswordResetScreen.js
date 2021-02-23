import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import GenericButton from '../components/buttons/genericButton';

export default function PasswordResetScreen({navigation}) {
  const [remember, setRemember] = useState(false);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <StatusBar backgroundColor="#ffd54f" />
      <Header>Forgot Password</Header>
      <Input placeholder="Email Address" width={300} />
      <GenericButton title="SUBMIT" />
      <Button onPress={goToLogin}>
        <Text>Have an account? Sign in</Text>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  background-color: #ffd54f;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
`;

const Header = styled.Text`
  font-size: 40px;
  color: #000000;
  font-family: 'Roboto-Light';
  margin: 20px;
`;

const Button = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: 14px;
  color: #000000;
  font-family: 'Roboto-Regular';
  margin: 5px;
`;
