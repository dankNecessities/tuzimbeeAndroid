import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import GenericButton from '../components/buttons/genericButton';

export default function SignInScreen({navigation}) {
  const [searchString, setSearchString] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <StatusBar backgroundColor="#333333" />
      <Input
        placeholder="Search"
        image={require('../assets/search_home.png')}
        borderColor="#e0e0e0"
      />
      <Header>Categories</Header>
      <Header>Trending</Header>
      <Header>Latest</Header>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex-direction: column;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  padding: 30px 20px 20px 20px;
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
  font-size: 30px;
  color: #000000;
  font-family: 'Roboto-Light';
  margin: 10px;
  width: 100%;
`;

const Text = styled.Text`
  font-size: 14px;
  color: #000000;
  font-family: 'Roboto-Regular';
  margin: 5px;
`;
