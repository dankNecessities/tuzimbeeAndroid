import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import Separator from '../components/layouts/separator';
import ItemButton from '../components/buttons/itemButton';
import GenericButton from '../components/buttons/genericButton';

export default function ItemScreen({route, navigation}) {
  const [searchString, setSearchString] = useState('');
  const [sum, setSum] = useState(0);
  const [price, setPrice] = useState(0);

  console.log(route.params);

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    setPrice(Number(route.params.price));
  }, []);

  return (
    <MainContainer>
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
        <ItemContainer>
          <ImageContainer source={route.params.source} resizeMode="contain" />
          <Header>{route.params.title}</Header>
          <SubHeader>Kenya Adhesive Products</SubHeader>
          <Text>
            A unique blend of adhesive formed with high quality synthetic rubber
            ideally designed for bonding Formica, laminates, PVC floor
            coverings, fabrics, foam sheets and other domestic and industrial
            items.
          </Text>
        </ItemContainer>
      </Container>
      <Separator />
      <SubHeader>
        Ush {(price * sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </SubHeader>
      <ItemButton text="Ltrs" update={setSum} />
      <ButtonContainer>
        <GenericButton
          margin={5}
          title="ADD TO CART"
          bgcolor="#ffff81"
          color="#000000"
        />
      </ButtonContainer>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
`;

const Container = styled.ScrollView`
  background-color: #ffffff;
  width: 100%;
  padding: 10px 10px 0px 10px;
`;

const ImageContainer = styled.Image`
  width: 100%;
  height: 180px;
`;

const ItemContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffd54f;
`;

const Header = styled.Text`
  font-size: 30px;
  color: #000000;
  font-family: 'Roboto';
  margin: 5px;
`;

const SubHeader = styled.Text`
  font-size: 22px;
  color: #000000;
  font-family: 'Roboto-Light';
  margin: 5px;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #000000;
  font-family: 'Roboto-Thin';
  margin: 5px;
`;
