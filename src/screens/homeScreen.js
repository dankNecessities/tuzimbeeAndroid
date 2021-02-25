import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import MenuButton from '../components/buttons/menuButton';
import Product from '../components/items/product';

export default function HomeScreen({navigation}) {
  const [searchString, setSearchString] = useState('');

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const categoryRows = [
    [
      {
        text: 'Plumbing',
        source: require('../assets/menu/drop.png'),
      },
      {
        text: 'Building Material',
        source: require('../assets/menu/layers.png'),
      },
    ],
    [
      {
        text: 'Electrical',
        source: require('../assets/menu/lightning.png'),
      },
      {
        text: 'Networking',
        source: require('../assets/menu/broadcast.png'),
      },
    ],
    [
      {
        text: 'Tools',
        source: require('../assets/menu/spanner.png'),
      },
      {
        text: 'Paint',
        source: require('../assets/menu/brush.png'),
      },
      {
        text: 'Safety Gear',
        source: require('../assets/menu/alert-triangle.png'),
      },
    ],
  ];

  const trendingRows = [
    {
      title: 'Tough Bond',
      price: '10000',
      source: require('../assets/products/bond.png'),
    },
    {
      title: 'Tough Bond',
      price: '10000',
      source: require('../assets/products/bond.png'),
    },
    {
      title: 'Tough Bond',
      price: '10000',
      source: require('../assets/products/bond.png'),
    },
  ];

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
        <Header>Categories</Header>
        <CategoryContainer>
          {categoryRows.map((_, i) => {
            return (
              <RowContainer>
                {_.map((item, index) => {
                  return <MenuButton text={item.text} source={item.source} />;
                })}
              </RowContainer>
            );
          })}
        </CategoryContainer>
        <Header>Trending</Header>
        <CategoryContainer>
          <ItemScroll
            horizontal={true}
            data={trendingRows}
            renderItem={({item, index}) => {
              return (
                <Product
                  title={item.title}
                  price={item.price}
                  source={item.source}
                />
              );
            }}
          />
        </CategoryContainer>
        <Header>Latest</Header>
        <CategoryContainer>
          <ItemScroll
            horizontal={true}
            data={trendingRows}
            renderItem={({item, index}) => {
              return (
                <Product
                  title={item.title}
                  price={item.price}
                  source={item.source}
                />
              );
            }}
          />
        </CategoryContainer>
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const Container = styled.ScrollView`
  background-color: #ffffff;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const CategoryContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
`;

const ItemScroll = styled.FlatList`
  flex-direction: row;
  width: 100%;
`;

const Header = styled.Text`
  font-size: 30px;
  color: #000000;
  font-family: 'Roboto-Light';
  margin: 10px;
  width: 100%;
`;
