import React, {useEffect, useState, useCallback} from 'react';
import {StatusBar, NativeEventEmitter, NativeModules} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import styled from 'styled-components/native';
import CartItem from '../components/items/cartItem';
import GenericButton from '../components/buttons/genericButton';
import Storage from '../storage/storage';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function CartScreen({route, navigation}) {
  const [cartData, setCartData] = useState([]);

  const getCartData = () => {
    Storage.getOrderData().then((response) => {
      let result = JSON.parse(response);
      setTimeout(() => {
        setCartData(result);
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

  useFocusEffect(
    useCallback(() => {
      getCartData();
    }, []),
  );

  useEffect(() => {
    getCartData();
  }, [navigation]);

  return (
    <MainContainer>
      <StatusBar backgroundColor="#333333" />
      <Container>
        {cartData.map((_, i) => {
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
      {cartData.length > 0 ? (
        <ButtonContainer>
          <GenericButton
            margin={5}
            title="CHECK OUT"
            bgcolor="#ffff81"
            color="#000000"
            onPress={() => navigation.navigate('CheckoutScreen')}
          />
        </ButtonContainer>
      ) : null}
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
