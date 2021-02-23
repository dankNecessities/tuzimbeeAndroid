import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import CheckBox from '@react-native-community/checkbox';
import GenericButton from '../components/buttons/genericButton';

export default function LoginScreen({navigation}) {
  const [remember, setRemember] = useState(false);

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <Container>
      <StatusBar backgroundColor="#ffd54f" />
      <ImageContainer
        source={require('../assets/bee.png')}
        resizeMode="contain"
      />
      <Header>Sign In</Header>
      <Input placeholder="Username" width={300} />
      <Input placeholder="Password" width={300} secure={true} />
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
      <GenericButton title="SIGN IN" onPress={() => goToScreen('Dashboard')} />
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
