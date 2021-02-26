import React, {useCallback, useState} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import ItemScreen from '../screens/itemScreen';
import IconButton from '../components/buttons/iconButton';
import ImageContainer from '../components/layouts/imageContainer';
import styled from 'styled-components';

const Stack = createStackNavigator();

export default function ProductStack(props) {
  const updateTotal = () => {
    console.log('update total');
  };
  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode="screen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <LogoTitle title="Home" {...props} update={updateTotal} />
          ),
          headerStyle: {
            backgroundColor: '#333333',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => <DashIcon />,
        }}
      />
      <Stack.Screen
        name="ItemScreen"
        component={ItemScreen}
        initialParams={{update: updateTotal}}
        options={{
          headerTitle: () => (
            <LogoTitle title="Item" {...props} update={updateTotal} />
          ),
          headerStyle: {
            backgroundColor: '#333333',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function LogoTitle(props) {
  const [cartTotal, setCartTotal] = useState(0);

  // TODO get the total number of items in the cart and update the cart icon
  useFocusEffect(
    useCallback(() => {
      props.update();
    }, [props.title]),
  );

  return (
    <Container>
      <Title>{props.title}</Title>
      <Container>
        <IconButton
          underlayColor="#f2994a"
          onPress={() => {
            console.log('Bell Pressed');
          }}>
          <ImageContainer source={require('../assets/bell.png')} />
        </IconButton>
        <IconButton
          underlayColor="#f2994a"
          onPress={() => {
            console.log('Notification Pressed');
          }}>
          {/* TODO Use updateable cart icon here instead of share */}
          <ImageContainer source={require('../assets/share.png')} />
        </IconButton>
      </Container>
    </Container>
  );
}

function DashIcon(props) {
  const navigation = useNavigation();
  return (
    <IconButton
      onPress={() => {
        navigation.toggleDrawer();
      }}>
      <ImageContainer source={require('../assets/menu.png')} />
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
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #ffffff;
`;
