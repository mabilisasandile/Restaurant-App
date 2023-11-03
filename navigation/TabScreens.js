import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements';
import Menu from '../components/Menu';
import Home from '../components/Home';
import Cart from '../components/Cart';
import MyAccountScreen from '../components/MyAccountScreen';
import SignUp from '../components/SignUp';
import SearchScreen from '../components/SearchScreen';


const Tab = createBottomTabNavigator();


export default function TabScreens() {

    return (

        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="food" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={MyAccountScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" color={color} size={size} />
                    ),
                }}
            /> */}
        </Tab.Navigator>

    );
}
