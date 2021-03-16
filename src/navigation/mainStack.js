import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './authStack';
import Dashboard from './dashboard';
import Storage from '../storage/storage';
import FloatingLoader from '../components/loaders/floatingLoader';

const Stack = createStackNavigator();

export default function MainStack() {
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Storage.getRememberMe().then((result) => {
      if (result) {
        setLoggedIn(result);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <FloatingLoader />;
  }
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
      {loggedIn === false ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
      ) : null}
      {loggedIn === true ? (
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
      ) : null}
      {/* <Stack.Screen
        name="PasswordReset"
        component={PasswordResetStack}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
