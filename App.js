
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';
import { StripeProvider } from '@stripe/stripe-react-native';
import StackScreens from './navigation/StackScreens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const STRIPE_KEY = 'pk_test_51O0LfwH0Oo7ShsJ8fbNr2YCOfgngvkZikRSHoqiTDVMNySPMI3ZJzLrEeW5WOdG5v8JXWOPxHhoJ86Q0GyTEOBgM000C1qWEB2';


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (

    
      <Provider store={Store}>

        <StripeProvider publishableKey={STRIPE_KEY}>

        <StackScreens />  

        </StripeProvider>

        <StatusBar style='auto' />
      </Provider>

    


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

