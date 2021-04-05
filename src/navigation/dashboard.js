import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  createDrawerNavigator,
  DrawerContent,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';
import BodyTab from './bodyTab';
import AuthStack from './authStack';
import ImageContainer from '../components/layouts/imageContainer';
import IconButton from '../components/buttons/iconButton';
import Storage from '../storage/storage';

const Drawer = createDrawerNavigator();

const StackNavigator = createStackNavigator();

// function HomeStack() {
//   return (
//     <StackNavigator.Navigator headerMode="screen">
//       <StackNavigator.Screen name="Home" component={BodyTab} />
//     </StackNavigator.Navigator>
//   );
// }

export default function Dashboard({route, navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: '#000000',
        activeBackgroundColor: '#e0e0e0',
        inactiveTintColor: '#000000',
        inactiveBackgroundColor: '#ffffff',
        labelStyle: {...label},
      }}>
      <Drawer.Screen name="Home" component={BodyTab} />
      <Drawer.Screen name="Account" title="My Account" component={BodyTab} />
      <Drawer.Screen name="Settings" component={BodyTab} />
      <Drawer.Screen name="Auth" component={AuthStack} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const customItems = [
    {
      label: 'Home',
      source: require('../assets/home_dashboard.png'),
    },
    {
      label: 'Account',
      source: require('../assets/account_dashboard.png'),
    },
    {
      label: 'Settings',
      source: require('../assets/settings.png'),
    },
  ];
  const removeData = () => {
    Storage.removeAuthToken();
    Storage.removeOrderData();
    Storage.removeRememberMe();
  };

  const confirmLogout = () =>
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            removeData();
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Auth',
                  state: {
                    routes: [
                      {
                        name: 'Login',
                      },
                    ],
                  },
                },
              ],
            });
          },
        },
      ],
      {cancelable: false},
    );

  return (
    <DrawerContentScrollView>
      <DrawerHeaderContainer>
        <IconButton
          onPress={props.navigation.closeDrawer}
          underlayColor="#eeeeee">
          <ImageContainer source={require('../assets/close.png')} />
        </IconButton>
        <DrawerLabel>Dashboard</DrawerLabel>
      </DrawerHeaderContainer>
      <DrawerContentContainer>
        {customItems.map((_, i) => {
          return (
            <DrawerItem
              label={({focused, color}) => (
                <DrawerLabel font="Roboto" size={18}>
                  {_.label}
                </DrawerLabel>
              )}
              icon={({focused, color, size}) => (
                <ImageContainer
                  margin={1}
                  source={_.source}
                  resizeMode="contain"
                />
              )}
              inactiveBackgroundColor={
                props.state.routeNames[props.state.index] === _.label
                  ? '#eeeeee'
                  : '#ffffff'
              }
              onPress={() => props.navigation.navigate(_.label)}
            />
          );
        })}
        <DrawerItem
          label={({focused, color}) => (
            <DrawerLabel font="Roboto" size={18}>
              Logout
            </DrawerLabel>
          )}
          icon={({focused, color, size}) => (
            <ImageContainer
              margin={1}
              source={require('../assets/exit.png')}
              resizeMode="contain"
            />
          )}
          onPress={confirmLogout}
        />
      </DrawerContentContainer>
    </DrawerContentScrollView>
  );
}

const label = {
  fontFamily: 'Roboto-Medium',
  fontSize: 18,
  textAlign: 'left',
  color: '#000000',
  padding: 5,
};

const DrawerLabel = styled.Text`
  font-family: ${(props) => props.font || 'Roboto-Medium'};
  font-size: ${(props) => props.size || 20}px;
  text-align: left;
  color: #000000;
  padding: 5px;
`;

const DrawerHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const DrawerContentContainer = styled.View`
  background-color: #ffffff;
`;
