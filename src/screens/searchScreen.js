import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import Product from '../components/items/product';
import Utils from '../utils/utils';

export default function SearchScreen({route, navigation}) {
  const [searchString, setSearchString] = useState('');
  const [resultArray, setResultArray] = useState([[]]);

  const goToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const searchRows = [
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
    {
      id: 4,
      title: 'Saw',
      price: '95000',
      manufacturer: 'BLACK+DECKER',
      description:
        'Let this 3.4 Amp electric handsaw flex its muscles-and preserve yours-for limb, branch, ' +
        "plant and shrubbery cutting chores. Or turn it loose on metal and plastic just as easily. It's " +
        ' lightweight, compact and ergonomically designed for comfortable, sure-handed operation. A safety ' +
        'button keeps the device idle until you are ready to pull the trigger.',
      source: require('../assets/products/saw.jpg'),
      units: 'Pc(s)',
    },
  ];

  const onPressItem = (item) => {
    navigation.navigate('ItemScreen', item);
  };

  const getResults = (text) => {
    // TODO get search results from the API
    let tempArray = [];
    setSearchString(text);
    Utils.cutArray(searchRows, 2, tempArray);
    setResultArray(tempArray);
    console.log(tempArray);
  };

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
          onChangeText={(text) => getResults(text)}
          placeholder="Search"
          image={require('../assets/search_home.png')}
          borderColor="#e0e0e0"
        />
        <ItemContainer>
          {resultArray.map((_, i) => {
            return (
              <RowContainer>
                {_.map((item, index) => {
                  return (
                    <Product
                      key={item.id}
                      title={item.title}
                      price={item.price}
                      source={item.source}
                      onPress={() => onPressItem(item)}
                    />
                  );
                })}
              </RowContainer>
            );
          })}
        </ItemContainer>
      </Container>
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
  padding: 5px;
`;

const ItemContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;
