import React, {useCallback, useState, useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import ItemScreen from '../screens/itemScreen';
import IconButton from '../components/buttons/iconButton';
import ImageContainer from '../components/layouts/imageContainer';
import styled from 'styled-components';

const Stack = createStackNavigator();

export default function ProductStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      headerMode="screen"
      screenOptions={({route, navigation}) => ({
        headerTitle: () => {
          let title = '';
          if (route.name === 'HomeScreen') {
            title = 'Home';
          } else if (route.name === 'ItemScreen') {
            title = 'Item';
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
        headerLeft: () => <DashIcon />,
      })}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ItemScreen" component={ItemScreen} />
    </Stack.Navigator>
  );
}

const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);

function LogoTitle(props) {
  const [updated, setUpdated] = useState(false);
  // TODO get the total number of items in the cart and update the cart icon
  const updateCartTotal = () => {
    console.log('Update cart total from emitter');
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Update cart button');
    }, []),
  );

  useEffect(() => {
    let eventListener = eventEmitter.addListener('event.cartEvent', () => {
      updateCartTotal();
    });
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
