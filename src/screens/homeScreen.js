import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import MenuButton from '../components/buttons/menuButton';
import Product from '../components/items/product';
import GenericHeading from '../components/headings/genericHeading';
import Utils from '../utils/utils';
import API from '../api/api';
import FloatingLoader from '../components/loaders/floatingLoader';

export default function HomeScreen({navigation}) {
  const [searchString, setSearchString] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  let x = [
    {
      id: 2,
      name: 'Building Material',
      displayOrder: 0,
      includeInMenu: true,
      isPublished: true,
      parentId: null,
    },
    {
      id: 8,
      name: 'Building Material >> Cement',
      displayOrder: 0,
      includeInMenu: true,
      isPublished: true,
      parentId: 2,
    },
    {
      id: 3,
      name: 'Electrical',
      displayOrder: 0,
      includeInMenu: true,
      isPublished: true,
      parentId: null,
    },
    {
      id: 5,
      name: 'Networking',
      displayOrder: 0,
      includeInMenu: true,
      isPublished: true,
      parentId: null,
    },
    {
      id: 7,
      name: 'Paint',
      displayOrder: 0,
      includeInMenu: true,
      isPublished: true,
      parentId: null,
    },
    {
      id: 1,
      name: 'Plumbing',
      displayOrder: 0,
      includeInMenu: true,
      isPublished: true,
      parentId: null,
    },
    {
      id: 4,
      name: 'Safety Gear',
      displayOrder: 0,
      includeInMenu: false,
      isPublished: true,
      parentId: null,
    },
    {
      id: 6,
      name: 'Tools',
      displayOrder: 0,
      includeInMenu: true,
      isPublished: true,
      parentId: null,
    },
  ];

  const images = {
    Plumbing: require('../assets/menu/drop.png'),
    'Building Material': require('../assets/menu/layers.png'),
    Electrical: require('../assets/menu/lightning.png'),
    Networking: require('../assets/menu/broadcast.png'),
    Tools: require('../assets/menu/spanner.png'),
    Paint: require('../assets/menu/brush.png'),
    'Safety Gear': require('../assets/menu/alert-triangle.png'),
  };

  const trendingRows = [
    {
      id: 1,
      title: 'Tough Bond',
      price: '10000',
      manufacturer: 'Kenya Adhesive Products',
      description:
        'A unique blend of adhesive formed with high quality synthetic rubber' +
        ' ideally designed for bonding Formica, laminates, PVC floor' +
        ' coverings, fabrics, foam sheets and other domestic and industrial' +
        ' items.',
      source: require('../assets/products/bond.jpg'),
      units: 'Ltr(s)',
    },
    {
      id: 2,
      title: 'Fridge Guard',
      price: '20000',
      manufacturer: 'Sollatek',
      description:
        'Low power (under-voltage) will certainly damage any refrigeration appliance’s' +
        ' compressor. The FridgeGuard protects your appliance by disconnecting the power ' +
        'when it goes below unacceptable level. Additionally, there is a delay when power' +
        ' returns to normal. This will ensure that the appliance is not switched on-off ' +
        'repeatedly during fluctuations nor is it subjected to a massive surge normally ' +
        'experienced when power returns after power cuts.',
      source: require('../assets/products/fg.jpg'),
      units: 'Pc(s)',
    },
    {
      id: 3,
      title: 'Electric Drill',
      price: '45000',
      manufacturer: 'Vishal Power Tools',
      description:
        'With an objective to fulfill the ever-evolving demands of our' +
        ' clients, we are engaged in offering a wide assortment of Hitachi DV13VSS Hammer Drill.',
      source: require('../assets/products/drill.jpg'),
      units: 'Pc(s)',
    },
  ];

  const onPressItem = (item) => {
    navigation.navigate('ItemScreen', item);
  };

  const onPressCategory = (category) => {
    navigation.navigate('CategoryScreen', category);
    // console.log(category.text);
  };

  useEffect(() => {
    API.getCategories().then((result) => {
      console.log(result);
      // Utils.cutArray(result, )
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
          onChangeText={(text) => setSearchString(text)}
          placeholder="Search"
          image={require('../assets/search_home.png')}
          borderColor="#e0e0e0"
          color="#333333"
          placeholderTextColor="#e0e0e0"
        />
        <GenericHeading>Categories</GenericHeading>
        <CategoryContainer>
          <RowContainer>
            {x.map((_, i) => {
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
        <GenericHeading>Trending</GenericHeading>
        <CategoryContainer>
          <ItemScroll
            horizontal={true}
            data={trendingRows}
            renderItem={({item, index}) => {
              return (
                <Product
                  title={item.title}
                  key={`${item.title}`}
                  price={item.price}
                  source={item.source}
                  onPress={() => onPressItem(item)}
                />
              );
            }}
          />
        </CategoryContainer>
        <GenericHeading>Latest</GenericHeading>
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
                  onPress={() => onPressItem(item)}
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

const ItemScroll = styled.FlatList`
  flex-direction: row;
  width: 100%;
`;
