import React, {useCallback, useState, useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import ItemScreen from '../screens/itemScreen';
import CartScreen from '../screens/cartScreen';
import CategoryScreen from '../screens/categoryScreen';
import IconButton from '../components/buttons/iconButton';
import ImageContainer from '../components/layouts/imageContainer';
import styled from 'styled-components';
import Storage from '../storage/storage';

const Stack = createStackNavigator();

export default function CartStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
      headerMode="screen"
      screenOptions={({route, navigation}) => ({
        headerTitle: () => {
          let title = '';
          if (route.name === 'CartScreen') {
            title = 'Cart';
          } else if (route.name === 'ItemScreen') {
            title = 'Item';
          } else if (route.name === 'CategoryScreen') {
            title = 'Category';
          }
          return <LogoTitle title={title} {...props} />;
        },
        headerStyle: {
          backgroundColor: '#333333',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => {
          if (route.name === 'CartScreen') {
            return (
              <DashIcon
                source={require('../assets/menu.png')}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              />
            );
          } else {
            return (
              <DashIcon
                source={require('../assets/left.png')}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            );
          }
        },
      })}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
}

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

function LogoTitle(props) {
  const [total, setTotal] = useState(false);
  // TODO get the total number of items in the cart and update the cart icon
  const updateCartTotal = () => {
    console.log('Notification Event');
    Storage.getOrderData().then((response) => {
      let result = JSON.parse(response);
      console.log(result);
      setTotal(result.length);
    });
  };

  useEffect(() => {
    let eventListener = eventEmitter.addListener(
      'event.notificationEvent',
      () => {
        // updateCartTotal();
      },
    );
    return function cleanup() {
      // FIXME event listener triggered twice
      eventListener.remove();
    };
  }, []);

  return (
    <Container>
      <Title>{props.title}</Title>
      <Container>
        <IconButton
          underlayColor="#f2994a"
          onPress={() => {
            console.log('Bell Pressed');
          }}>
          {/* TODO Use updateable notifications icon here instead of share */}
          <CartImage
            source={require('../assets/bell.png')}
            resizeMode="contain">
            <Title size={14} color="yellow">
              {total === 0 ? '' : total}
            </Title>
          </CartImage>
        </IconButton>
      </Container>
    </Container>
  );
}

function DashIcon(props) {
  return (
    <IconButton onPress={props.onPress}>
      <ImageContainer source={props.source} />
    </IconButton>
  );
}

const Container = styled.View`
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#ffffff'};
`;

const CartImage = styled.ImageBackground`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  height: 24px;
  width: 24px;
  margin: 10px;
`;
