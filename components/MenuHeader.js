
import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { Icon, withBadge } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'; // Import Firebase Auth functions

export default function MenuHeader() {
    const [showCard, setShowCard] = useState(false);
    const [user, setUser] = useState(null); // Store user information
    const cartItems = useSelector((state) => state.CartSlice);
    const quantity = cartItems.length;
    const CartIconWithBadge = withBadge(quantity)(Icon);
    const navigation = useNavigation();


    useEffect(() => {
        // const auth = getAuth();

        // Check the user's authentication status
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
    }, []);

    const handleToggleCard = () => {
        setShowCard(!showCard);     // Toggle the showCard state
    }

    const handleClose = () => {
        setShowCard(false);
    }


    //Handle navigation to screens
    const handleCartNav = () => {
        navigation.navigate('Cart');
    }

    const handleAccountInfo = () => {
        navigation.navigate('My_Account');
    }

    const handleViewOrder = () => {
        navigation.navigate('View_Order');
    }

    const handleSignIn = () => {
        navigation.navigate('SignIn');
    }

    const handleSignOut = async () => {
        try {
            await auth.signOut(); // Sign the user out
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
        }
        navigation.navigate('SignIn');
    }


    return (
        <>
            <View style={styles.header}>
                <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 15 }}>
                    <Icon
                        type="material-community"
                        name="menu"
                        color={'white'}
                        size={32}
                        onPress={handleToggleCard}
                    />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                    <Text style={styles.text}>FOOD MENU</Text>
                </View>

                <View style={{ justifyContent: 'flex-start', alignItems: 'center', paddingTop: 10, paddingRight: 10 }}>
                    <CartIconWithBadge
                        type="material-community"
                        name="cart"
                        size={30}
                        color={'white'}
                        onPress={handleCartNav}
                    />
                </View>
            </View>

            <View style={styles.container}>
                <Modal visible={showCard} onRequestClose={handleClose}>
                    <View style={styles.card}>
                        <TouchableOpacity onPress={handleAccountInfo}>
                            <Text style={styles.text}>Account Information</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>Checkout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleViewOrder}>
                            <Text style={styles.text}>View Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClose}>
                            <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>

                        {user ? (
                            <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
                                <Text style={styles.text}>Sign Out</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleSignIn} style={styles.signOutBtn}>
                                <Text style={styles.text}>Sign In</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </Modal>
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginLeft: 5,
        backgroundColor: '#8a2be2',
        paddingLeft: 5,
        marginRight: 7,
        paddingRight: 10,
        width: '100%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#FFFFFF',
    },
    card: {
        flex: 1,
        width: 250,
        height: 300,
        backgroundColor: '#4b0082',
        borderRadius: 10,
    },
    signOutBtn: {
        marginTop: 60,
    },
});