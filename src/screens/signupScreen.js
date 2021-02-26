import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import GenericButton from '../components/buttons/genericButton';

export default function SignInScreen({navigation}) {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <StatusBar backgroundColor="#ffd54f" />
      <Header>Sign Up</Header>
      <Input placeholder="Username" width={300} />
      <Input placeholder="Phone Number" width={300} keyboardType="numeric" />
      <Input placeholder="Email Address" width={300} />
      <Input placeholder="Password" width={300} secure={true} />
      <Input placeholder="Confirm Password" width={300} secure={true} />
      <GenericButton title="SIGN UP" />
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
  justify-content: center;
  height: 100%;
  width: 100%;
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
