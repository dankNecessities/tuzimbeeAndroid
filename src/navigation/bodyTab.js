import React, {useState, useEffect, useCallback} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconButton from '../components/buttons/iconButton';
import styled from 'styled-components/native';
import ProductStack from './productStack';
import SearchStack from './searchStack';
import CartStack from './cartStack';
import Storage from '../storage/storage';
import FavoritesStack from './favoritesStack';

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

const Tab = createBottomTabNavigator();

export default function BodyTab({route, navigation}) {
  return (
    <Tab.Navigator
      initialRoute="Home"
      screenOptions={({route}) => ({
        tabBarButton: (props) => (
          <IconButton {...props} underlayColor="#f2994a" />
        ),
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Product') {
            return focused ? (
              <TabBarIcon
                source={require('../assets/home_focused.png')}
                name={route.name}
                size={24}
              />
            ) : (
              <TabBarIcon
                source={require('../assets/home.png')}
                name={route.name}
              />
            );
          } else if (route.name === 'Search') {
            return focused ? (
              <TabBarIcon
                source={require('../assets/search_focused.png')}
                name={route.name}
                size={24}
              />
            ) : (
              <TabBarIcon
                source={require('../assets/search.png')}
                name={route.name}
              />
            );
          } else if (route.name === 'Cart') {
            return focused ? (
              <TabBarIcon
                source={require('../assets/cart_focused.png')}
                name={route.name}
                size={24}
              />
            ) : (
              <TabBarIcon
                source={require('../assets/cart.png')}
                name={route.name}
                size={20}
              />
            );
          } else if (route.name === 'Favorites') {
            return focused ? (
              <TabBarIcon
                source={require('../assets/favorites_focused.png')}
                name={route.name}
                size={24}
              />
            ) : (
              <TabBarIcon
                source={require('../assets/favorites.png')}
                name={route.name}
              />
            );
          } else if (route.name === 'Orders') {
            return focused ? (
              <TabBarIcon
                source={require('../assets/orders_focused.png')}
                name={route.name}
                size={24}
              />
            ) : (
              <TabBarIcon
                source={require('../assets/orders.png')}
                name={route.name}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#f2994a',
        inactiveTintColor: '#bdbdbd',
        style: {
          backgroundColor: '#333333',
          height: 50,
        },
      }}>
      <Tab.Screen
        name="Product"
        component={ProductStack}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          title: 'Search',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          title: 'Cart',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          title: 'Favorites',
        }}
      />
      <Tab.Screen
        name="Orders"
        component={CartStack}
        options={{
          title: 'Orders',
        }}
      />
    </Tab.Navigator>
  );
}

function TabBarIcon(props) {
  const [total, setTotal] = useState(false);

  const updateCartTotal = () => {
    Storage.getOrderData().then((response) => {
      let result = JSON.parse(response);
      console.log(result);
      setTotal(result.length === 'null' ? 0 : result.length);
    });
  };

  // Update on first render
  useEffect(() => {
    updateCartTotal();
  }, []);

  useEffect(() => {
    // Listener for add to cart events
    if (props.name === 'Cart') {
      const eventListener = eventEmitter.addListener('event.cartEvent', () => {
        updateCartTotal();
      });
      return () => {
        eventListener.remove();
      };
    }
  }, []);

  return (
    <Container>
      {props.name === 'Cart' ? (
        <CartImage source={props.source} size={props.size}>
          {total > 0 ? (
            <Text size={10} color="#000000">
              {total === 0 ? '' : total}
            </Text>
          ) : null}
        </CartImage>
      ) : (
        <IconImage source={props.source} size={props.size} />
      )}
    </Container>
  );
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const IconImage = styled.Image`
  width: ${(props) => props.size || 20}px;
  height: ${(props) => props.size || 20}px;
`;

const CartImage = styled.ImageBackground`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: ${(props) => props.size || 24}px;
  height: ${(props) => props.size || 24}px;
  margin: 10px;
`;

const Text = styled.Text`
  font-family: 'Roboto-Bold';
  font-size: ${(props) => props.size || 18}px;
  color: ${(props) => props.color || '#ffffff'};
  background-color: #ffff81;
  border-radius: 10px;
  padding: 0px;
  width: 12px;
  height: 12px;
  text-align: center;
  line-height: 12px;
`;
