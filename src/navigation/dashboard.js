import React, {useState, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';
import BodyTab from './bodyTab';

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
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={BodyTab} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  //   const confirmLogout = () =>
  //     Alert.alert(
  //       "Logout",
  //       "Are you sure?",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel",
  //         },
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             console.log("OK Pressed");
  //             props.navigation.reset({
  //               index: 0,
  //               routes: [
  //                 {
  //                   name: "Auth",
  //                   state: {
  //                     routes: [
  //                       {
  //                         name: "Login",
  //                       },
  //                     ],
  //                   },
  //                 },
  //               ],
  //             });
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
      <DrawerHeaderContainer></DrawerHeaderContainer>
      <DrawerContentContainer>
        {/* <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={() => (
            <DrawerIcon source={require("../assets/drawer_logout_icon.png")} />
          )}
          onPress={confirmLogout}
        /> */}
      </DrawerContentContainer>
    </DrawerContentScrollView>
  );
}

const DrawerIcon = styled.Image`
  width: 12.5%;
  height: 100%;
`;

const DrawerLabel = styled.Text`
  font-size: 15px;
  text-align: center;
  color: #707070;
`;

const DrawerHeaderContainer = styled.View`
  flex: 1;
  padding: 15px;
`;

const DrawerContentContainer = styled.ScrollView`
  flex-grow: 1;
  background-color: #ffebee;
`;
