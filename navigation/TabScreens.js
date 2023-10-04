import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu from '../components/Menu';
import Home from '../components/Home';
import Cart from '../components/Cart';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';


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
                component={SignUp}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="login" color={color} size={size} />
                    ),
                }}
            /> */}
        </Tab.Navigator>

    );
}
