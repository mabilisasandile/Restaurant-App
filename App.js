
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './components/Menu';
import Home from './components/Home';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {

  return (

    <View style={styles.container}>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="SignIn" component={SignIn} /> */}
          <Stack.Screen name="Home" component={Home} />
          {/* <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Register" component={SignUp} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'blue', // Customize the header background color
    padding: 10,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue', // Customize button styles
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  tabButtonText: {
    color: 'white', // Customize text styles
    marginLeft: 5,
  },
});

// <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen
    //       name="Home"
    //       component={Home}
    //       options={{
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons name="home" color={color} size={size} />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Menu"
    //       component={Menu}
    //       options={{
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons name="food" color={color} size={size} />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Cart"
    //       component={Cart}
    //       options={{
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons name="cart" color={color} size={size} />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Account"
    //       component={SignUp}
    //       options={{
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons name="account" color={color} size={size} />
    //         ),
    //       }}
    //     />
    //     <Tab.Screen
    //       name="Login"
    //       component={SignIn}
    //       options={{
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons name="login" color={color} size={size} />
    //         ),
    //       }}
    //     />
    //   </Tab.Navigator>
    // </NavigationContainer>