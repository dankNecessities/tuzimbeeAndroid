import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './authStack';
import Dashboard from './dashboard';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff1389',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          textAlign: 'center',
          fontSize: 40,
        },
      }}>
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="PasswordReset"
        component={PasswordResetStack}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
