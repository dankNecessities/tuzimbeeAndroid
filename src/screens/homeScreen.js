import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import MenuButton from '../components/buttons/menuButton';
import GenericHeading from '../components/headings/genericHeading';
import FloatingLoader from '../components/loaders/floatingLoader';
import ProductList from '../components/lists/productList';
import API from '../api/api';
import Utils from '../utils/utils';

export default function HomeScreen({navigation}) {
  const [searchString, setSearchString] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const images = {
    Plumbing: require('../assets/menu/drop.png'),
    'Building Material': require('../assets/menu/layers.png'),
    Electrical: require('../assets/menu/lightning.png'),
    Networking: require('../assets/menu/broadcast.png'),
    Tools: require('../assets/menu/spanner.png'),
    Paint: require('../assets/menu/brush.png'),
    'Safety Gear': require('../assets/menu/alert-triangle.png'),
  };

  const onPressCategory = (category) => {
    navigation.navigate('CategoryScreen', category);
  };

  useEffect(() => {
    API.getCategories()
      .then((result) => {
        if (result === 401) {
          Utils.redirectToAuth(navigation);
        } else {
          setCategories(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MainContainer>
      {loading ? <FloatingLoader /> : null}
      <Container
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <StatusBar backgroundColor="#333333" />
        <Input
          onChangeText={(text) => {
            setSearchString(text);
          }}
          placeholder="Search"
          image={
            searchString.length > 0
              ? require('../assets/close.png')
              : require('../assets/search_home.png')
          }
          onPress={() => {
            setSearchString('');
          }}
          value={searchString}
          borderColor="#e0e0e0"
          color="#333333"
          placeholderTextColor="#e0e0e0"
        />
        {searchString.length > 0 ? (
          <ProductList />
        ) : (
          <>
            <GenericHeading>Categories</GenericHeading>
            <CategoryContainer>
              <RowContainer>
                {categories.map((_, i) => {
                  return (
                    <MenuButton
                      text={_.name}
                      source={images[_.name]}
                      onPress={() => onPressCategory(_)}
                    />
                  );
                })}
              </RowContainer>
            </CategoryContainer>
          </>
        )}
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
  padding: 5px;
`;

const Container = styled.ScrollView`
  background-color: #ffffff;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const CategoryContainer = styled.ScrollView`
  flex-direction: column;
  width: 100%;
`;
