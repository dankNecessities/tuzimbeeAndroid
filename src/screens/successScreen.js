import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';
import styled from 'styled-components/native';
import Separator from '../components/layouts/separator';
import CartItem from '../components/items/cartItem';
import GenericButton from '../components/buttons/genericButton';
import Storage from '../storage/storage';
import LabelledInput from '../components/inputs/labelledInput';
import ImageContainer from '../components/layouts/imageContainer';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

export default function SuccessScreen({route, navigation}) {
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
      <StatusBar backgroundColor="#333333" />
      <ImageContainer source={require('../assets/success.png')} size={160} />
      <ItemText color="#9e9e9e" size={20} margin={20}>
        Your order has been created
      </ItemText>
      <ItemText color="#9e9e9e" margin={10}>
        ORDER ID
      </ItemText>
      <ItemText color="#000000" size={28}>
        TUZ001212IB4E
      </ItemText>
      <ItemText margin={20}>
        You will receive a phonecall from Tuzimbee within 12 Hrs to verify your
        order and begin delivery
      </ItemText>
      <GenericButton
        margin={5}
        width={250}
        title="CONTINUE SHOPPING"
        bgcolor="#ffd54f"
        color="#000000"
        onPress={() => {
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        }}
      />
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
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffd54f;
`;

const ItemText = styled.Text`
  font-size: ${(props) => props.size || 16}px;
  color: ${(props) => props.color || '#212121'};
  text-align: center;
  padding: 0px;
  margin: ${(props) => props.margin || 1}px;
`;
