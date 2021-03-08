import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/inputs/input';
import Separator from '../components/layouts/separator';
import ItemButton from '../components/buttons/itemButton';
import CartItem from '../components/items/cartItem';
import GenericButton from '../components/buttons/genericButton';
import Storage from '../storage/storage';
import LabelledInput from '../components/inputs/labelledInput';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function ItemScreen({route, navigation}) {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState('');
  const [addressEditable, setAddressEditable] = useState(false);
  const [contact, setContact] = useState('');
  const [contactEditable, setContactEditable] = useState(false);

  const getCartData = () => {
    Storage.getOrderData().then((response) => {
      let result = JSON.parse(response);
      setTimeout(() => {
        setItems(result);
      }, 10);
    });
  };

  const updateCartData = (item, sum) => {
    let newItem = {...item, sum: sum};
    Storage.setOrderData(newItem);
    getCartData();
  };

  const removeCartItem = (item) => {
    console.log('Remove');
    Storage.deleteOrderItem(item).then(() => {
      setTimeout(() => {
        getCartData();
        eventEmitter.emit('event.cartEvent', {});
      }, 4);
    });
  };

  useEffect(() => {
    //    Get items from cart
    getCartData();
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
          placeholder="Search"
          image={require('../assets/search_home.png')}
          borderColor="#e0e0e0"
        />
        <Container>
          {items.map((_, i) => {
            return (
              <CartItem
                id={_.id}
                title={_.title}
                source={_.source}
                sum={_.sum}
                manufacturer={_.manufacturer}
                price={_.price}
                remove={() => removeCartItem(_.id)}
                update={(sum) => {
                  updateCartData(_, sum);
                }}
              />
            );
          })}
        </Container>
      </Container>
      <Separator />
      <LabelledInput
        label="ADDRESS"
        onChangeText={(text) => setAddress(text)}
        source={require('../assets/pen.png')}
        editable={addressEditable}
        onPress={() => setAddressEditable(!addressEditable)}
      />
      <LabelledInput
        label="CONTACT"
        onChangeText={(text) => setContact(text)}
        source={require('../assets/pen.png')}
        editable={contactEditable}
        onPress={() => setContactEditable(!contactEditable)}
      />
      <ButtonContainer>
        <GenericButton
          margin={5}
          title="BUY"
          bgcolor="#ffff81"
          color="#000000"
          onPress={() => {}}
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
  /* padding: 10px 10px 0px 10px; */
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
