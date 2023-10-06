
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from './components/Menu';
import Home from './components/Home';
import ViewItem from './components/ViewItem';
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MapScreen from './components/MapScreen';
import MyAccountScreen from './components/MyAccountScreen';
import MyOrderScreen from './components/MyOrderScreen';
import TabScreens from './navigation/TabScreens';
import ResetPassword from './components/ResetPassword';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (

    <View style={styles.container}>
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabScreens}
              options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="View_Item" component={ViewItem} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="My_Orders" component={MyOrderScreen} />
            <Stack.Screen name="My_Account" component={MyAccountScreen} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Register" component={SignUp} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
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

