import React, { useState, useEffect } from "react";
import {
    StyleSheet, View, Text, ScrollView, Image,
    SafeAreaView, Modal, FlatList, TouchableOpacity, Alert
} from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import CartHeader from "./CartHeader";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import CartSlice, { removeFromCart } from "../Redux/CartSlice";
import { addToCart } from "../Redux/CartSlice";
import { decrementQuantity } from "../Redux/CartSlice";
import { incrementQuantity } from "../Redux/CartSlice";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";




function Cart() {

    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.CartSlice);
    const nav = useNavigation();
    let amount = 0;


    useEffect(() => {

        console.log("Items on Cart:", storeData);

    }, []);



    const subTotal = () => {
        storeData.forEach(element => {
            amount += element.price;
        });
        return amount;
    }



    const handleCheckOut = async () => {

        const user = auth.currentUser;
        console.log("User logged in:", user);

        if (user) {
            nav.navigate('Checkout', { totalAmount: parseFloat(amount.toFixed(2)) });
        } else {
            nav.navigate('SignIn');
        }
    }

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id))
            .then(() => {
                Alert.alert("Item removed from cart");
            })
            .catch((error) => {
                console.log("Failed to remove from cart", error);
                Alert.alert("Error", "Unable to remove item.", [{ text: "OK" }]);
            });
    };



    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#d8bfd8', gap: 15 }}>
            < CartHeader />
            <FlatList data={storeData} renderItem={({ item, index }) => (
                < View style={{
                    height: responsiveHeight(20), borderRadius: 10, marginBottom: 5,
                    borderBottomWidth: 2, flexDirection: 'row', borderWidth: 1, borderColor: 'black'
                }}>
                    <View style={{ flex: 0.35, width: 142 }}>
                        <Image source={{ uri: item.imageURL }}
                            style={{ height: 141, width: 142, borderRadius: 10 }} />
                    </View>

                    <View style={{
                        flex: 0.7, paddingHorizontal: 10, paddingVertical: 10, 
                        alignItems: 'center', justifyContent: 'space-evenly'
                    }}>

                        <View style={{ alignItems: 'flex-end', paddingLeft: 192 }}>
                            <AntDesign
                                name="close"
                                size={25}
                                color='grey'
                                onPress={() => handleRemoveFromCart(item.id)}
                            />
                        </View>

                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Text style={{ fontSize: 20, fontWeight: '600' }}>{item.name}</Text> */}
                            <Text numberOfLines={2} ellipsizeMode="tail"
                                style={{ fontSize: 20, fontWeight: '600', maxWidth: 80, flexWrap: 'wrap', textAlign: 'center' }}>
                                {item.name}
                            </Text>
                        </View>


                        {/* <Text style={{ fontSize: 17, color: 'grey', marginTop: 5 }}>{item.description}</Text> */}
                        <Text numberOfLines={2} ellipsizeMode="tail"
                            style={{ fontSize: 17, color: 'grey', marginTop: 5, maxWidth: 150, flexWrap: 'wrap', textAlign: 'center' }}>
                            {item.description}
                        </Text>
                        <View style={{
                            alignContent: 'center', justifyContent: 'space-between',
                            flexDirection: 'row'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { dispatch(decrementQuantity(item)) }}
                                >
                                    <AntDesign name="minuscircleo"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>

                                <Text>{item.quantity}</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        if (item.quantity == 10) {

                                        } else {
                                            dispatch(incrementQuantity(item));
                                        }
                                    }}
                                >
                                    <AntDesign name="pluscircleo"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>

                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Text style={{ fontWeight: 'bold', color: '#8a2be2' }}>
                                    R{parseFloat((item.quantity * item.price).toFixed(2)).toFixed(2)}
                                </Text>
                            </View>

                        </View>
                    </View>
                </View>
            )} />

            <View style={{ height: 60 }}>
                <TouchableOpacity onPress={() => handleCheckOut()} style={styles.button}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', textAlign: 'center' }}>CHECKOUT</Text>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', textAlign: 'center' }}>
                            ZAR {parseFloat((subTotal()).toFixed(2)).toFixed(2)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#d8bfd8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        borderBlockColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        margin: 20,
        width: 320,
        height: 350,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#8a2be2',
        padding: 10,
        marginLeft: 20,
        marginTop: 5,
        borderRadius: 10,
        width: 300,
        marginBottom: 5,
    }
});

export default Cart;
