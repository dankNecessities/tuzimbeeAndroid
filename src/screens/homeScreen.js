import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import MenuButton from '../components/buttons/menuButton';

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
        onChangeText={(text) => setSearchString(text)}
        placeholder="Search"
        image={require('../assets/search_home.png')}
        borderColor="#e0e0e0"
      />
      <Header>Categories</Header>
      <CategoryContainer>
        <RowContainer>
          <MenuButton
            text="Plumbing"
            source={require('../assets/menu/drop.png')}
          />
          <MenuButton
            text="Building Material"
            source={require('../assets/menu/layers.png')}
          />
        </RowContainer>
        <RowContainer>
          <MenuButton
            text="Electrical"
            source={require('../assets/menu/lightning.png')}
          />
          <MenuButton
            text="Networking"
            source={require('../assets/menu/broadcast.png')}
          />
        </RowContainer>
        <RowContainer>
          <MenuButton
            text="Tools"
            source={require('../assets/menu/spanner.png')}
          />
          <MenuButton
            text="Paint"
            source={require('../assets/menu/brush.png')}
          />
          <MenuButton
            text="Safety Gear"
            source={require('../assets/menu/alert-triangle.png')}
          />
        </RowContainer>
      </CategoryContainer>

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
  justify-content: flex-start;
`;

const CategoryContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Header = styled.Text`
  font-size: 30px;
  color: #000000;
  font-family: 'Roboto-Light';
  margin: 10px;
  width: 100%;
`;
