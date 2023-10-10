
import React from "react";
import { useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { Icon, withBadge } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";

export default function CartHeader() {
    const [showCard, setShowCard] = useState(false);
    const cartItems = useSelector((state) => state.CartSlice);
    const quantity = cartItems.length;
    const CartIconWithBadge = withBadge(quantity)(Icon);

    const navigation = useNavigation();

    const handleCartNav = () => {
        navigation.navigate('Cart');
    }

    const handleShowCard = () => {
        setShowCard(true);
    }

    //Handle button events
    const handleClose = () => {
        setShowCard(false);
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
                        onPress={handleShowCard}
                    />
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                    <Text style={styles.text}>My Cart</Text>
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
                        <TouchableOpacity>
                            <Text style={styles.text}>Account Information</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>Checkout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>Place An Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>Support</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>Contact Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.text}>About Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClose}>
                            <Text style={styles.text}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
                            <Text style={styles.text}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#8a2be2',
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