import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import styled from 'styled-components/native';
import Separator from '../components/layouts/separator';
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

  const calculateTotalBill = () => {
    //   TODO get sum of all prices
    // TODO Use disount to get the final prices
  };

  const updateBillData = () => {
    //  TODO SAVE to asyncstorage
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
        margin={15}
      />
      <LabelledInput
        label="CONTACT"
        onChangeText={(text) => setContact(text)}
        source={require('../assets/pen.png')}
        editable={contactEditable}
        onPress={() => setContactEditable(!contactEditable)}
      />
      <BillContainer>
        <Label>SUBTOTAL</Label>
        <ItemText>Ush 20,000</ItemText>
      </BillContainer>
      <BillContainer>
        <Label>DISCOUNT</Label>
        <ItemText>5 %</ItemText>
      </BillContainer>
      <BillContainer>
        <ItemText>TOTAL</ItemText>
        <ItemText>Ush 19,500</ItemText>
      </BillContainer>
      <ButtonContainer>
        <GenericButton
          margin={5}
          title="BUY"
          bgcolor="#ffff81"
          color="#000000"
          onPress={() => {
            navigation.navigate('SuccessScreen');
          }}
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
`;

const Label = styled.Text`
  font-size: 12px;
  color: #9e9e9e;
  font-family: 'Roboto-Bold';
`;

const BillContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffd54f;
`;

const ItemText = styled.Text`
  font-size: 16px;
  color: #212121;
  text-align: left;
  padding: 0px;
`;
