import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import ItemScreen from '../screens/itemScreen';
import IconButton from '../components/buttons/iconButton';
import styled from 'styled-components';

const Stack = createStackNavigator();

export default function ProductStack(props) {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode="screen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle title="Home" {...props} />,
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
        options={{
          headerTitle: (props) => <LogoTitle title="Item" {...props} />,
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
    </Stack.Navigator>
  );
}

function LogoTitle(props) {
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

const ImageContainer = styled.Image`
  width: 20px;
  height: 20px;
  margin: 15px;
`;
