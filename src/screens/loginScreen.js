import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import LoginForm from '../components/forms/loginForm';
import ImageContainer from '../components/layouts/imageContainer';
import styled from 'styled-components/native';

export default function LoginScreen({navigation}) {
  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <Container>
      <StatusBar backgroundColor="#ffd54f" />
      <ImageContainer
        source={require('../assets/bee.png')}
        resizeMode="contain"
        size={180}
        margin={5}
      />
      <LoginForm />
      <Button onPress={() => goToScreen('SignUp')}>
        <Text>Create Account</Text>
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

const Button = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: 14px;
  color: #000000;
  font-family: 'Roboto-Regular';
  margin: 5px;
`;
