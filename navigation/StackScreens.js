

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from '../components/Menu';
import BreakfastMenu from '../components/BreakfastMenu';
import LunchMenu from '../components/LunchMenu';
import DinnerMenu from '../components/DinnerMenu';
import Home from '../components/Home';
import ViewItem from '../components/ViewItem';
import Cart from '../components/Cart';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import MapScreen from '../components/MapScreen';
import MyAccountScreen from '../components/MyAccountScreen';
import MyOrderScreen from '../components/MyOrderScreen';
import Checkout from '../components/CheckOut';
import Payment from '../components/Payment';
import OrderPlaced from '../components/OrderPlaced';
import TabScreens from './TabScreens';
import ResetPassword from '../components/ResetPassword';
import ViewOrder from '../components/View_Order';
import Extras from '../components/Extras';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function StackScreens() {

  return (

    <View style={styles.container}>

          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={TabScreens}
                options={{ headerShown: false }} />
              <Stack.Screen name="Menu" component={Menu} />
              <Stack.Screen name="Breakfast_Menu" component={BreakfastMenu} />
              <Stack.Screen name="Lunch_Menu" component={LunchMenu} />
              <Stack.Screen name="Dinner_Menu" component={DinnerMenu} />
              <Stack.Screen name="Extras" component={Extras} />
              <Stack.Screen name="View_Item" component={ViewItem} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="My_Orders" component={MyOrderScreen} />
              <Stack.Screen name="My_Account" component={MyAccountScreen} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="Order_Placed" component={OrderPlaced} />
              <Stack.Screen name="View_Order" component={ViewOrder} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="Register" component={SignUp} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
          </NavigationContainer>

    </View>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

