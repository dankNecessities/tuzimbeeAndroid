import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
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
    </Stack.Navigator>
  );
}

function LogoTitle(props) {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Container>
        <Button>
          <ImageContainer source={require('../assets/bell.png')} />
        </Button>
        <Button>
          <ImageContainer source={require('../assets/share.png')} />
        </Button>
      </Container>
    </Container>
  );
}

function DashIcon(props) {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => {
        navigation.toggleDrawer();
      }}>
      <ImageContainer source={require('../assets/dash.png')} />
    </Button>
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

const Button = styled.TouchableOpacity``;
