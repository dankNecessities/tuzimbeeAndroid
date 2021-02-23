import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import GenericButton from '../components/buttons/genericButton';

export default function SignInScreen({navigation}) {
  const [remember, setRemember] = useState(false);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <StatusBar backgroundColor="#333333" />
      <Header>Sign Up</Header>
      <Input placeholder="Username" width={300} />
      <Input placeholder="Phone Number" width={300} keyboardType="numeric" />
      <Input placeholder="Email Address" width={300} />
      <Input placeholder="Password" width={300} hidden={true} />
      <Input placeholder="Confirm Password" width={300} hidden={true} />
      <GenericButton title="SIGN UP" />
      <Button onPress={goToLogin}>
        <Text>Have an account? Sign in</Text>
      </Button>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: column;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.width || 'auto'};
`;

const ImageContainer = styled.Image`
  width: 180px;
  height: 180px;
  margin: 5px;
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
