import React, { useState, useEffect } from "react";
import {
    StyleSheet, View, Text, ScrollView, Image,
    SafeAreaView, Modal, FlatList, TouchableOpacity, Alert
} from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import CartHeader from "./CartHeader";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector, connect } from "react-redux";
import CartSlice, { removeFromCart } from "../Redux/CartSlice";
import { addToCart } from "../Redux/CartSlice";
import { decrementQuantity } from "../Redux/CartSlice";
import { incrementQuantity } from "../Redux/CartSlice";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";
import { useCreateOrderMutation, useCreatePaymentIntentMutation } from "../store/apiSlice";
import { useStripe, PaymentIntent } from "@stripe/stripe-react-native";




function Cart({ cartItems }) {

    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.CartSlice);
    const nav = useNavigation();
    let amount = 0;

    const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    useEffect(() => {

        console.log("Items on Cart:", storeData);

    }, []);



    const subTotal = () => {
        storeData.forEach(element => {
            amount += element.price;
        });
        return amount;
    }



    const handleGoToCheckOut = async () => {

        // 1. Create a payment intent
        const response = await createPaymentIntent({
            amount: Math.floor(subTotal * 100),
        });
        if (response.error) {
            Alert.alert('Error', 'Something went wrong');
            return;
        }
        console.log(response);

        // 2. Initialize the payment sheet
        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'notJust.dev',
            paymentIntentClientSecret: response.data.paymentIntent,
            defaultBillingDetails: {
                name: 'Name',
                address: "Default address",
            }
        });
        if (initResponse.error) {
            console.log(initResponse.error);
            Alert.alert('Something went wrong');
            return;
        }

        // 3. Present the Payment Sheet from Stripe
        await presentPaymentSheet();

        // 4. If payment ok -> Create the order
        onCreateOrder();

        const user = auth.currentUser;
        console.log("User logged in:", user);

        if (user) {
            // nav.navigate('Checkout');
            nav.navigate('Checkout', { totalAmount: amount });  // Pass the 'amount' as a parameter
        } else {
            nav.navigate('SignIn');
        }
    }


    const onCreateOrder = async () => {
        const result = await createOrder({
            items: storeData,
            subTotal,
            deliveryFee,
            total,
            customer: {
                name: 'James',
                address: 'My home',
                email: 'sam@gmail.com',
            },
        });

        if (result.data?.status == 'OK') {
            Alert.alert(
                'Order has been submitted',
                `Your order reference is: ${result.data.ref}`
            );
            dispatch(CartSlice.actions.clear());
        }
    };



    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#d8bfd8', gap: 15 }}>
            < CartHeader />
            <FlatList data={storeData} renderItem={({ item, index }) => (
                < View style={{
                    height: responsiveHeight(20), backgroundColor: 'white',
                    borderBottomColor: '#8a2be2', borderBottomWidth: 4, flexDirection: 'row'
                }}>
                    <View style={{ flex: 0.35 }}>
                        <Image source={{ uri: item.imageURL }}
                            style={{ height: 140, width: 142, borderRadius: 20 }} />
                    </View>

                    <View style={{
                        flex: 0.7, paddingHorizontal: 10, paddingVertical: 10,
                        alignItems: 'center', justifyContent: 'space-evenly'
                    }}>
                        <View style={{
                            flexDirection: 'row', alignContent: 'center',
                            justifyContent: 'space-between', alignItems: 'center'
                        }}
                        >
                            <View style={{ paddingLeft: 50 }}>
                                <Text style={{ fontSize: 20, fontWeight: '600' }}>{item.name}</Text>
                            </View>

                            <View style={{ alignItems: 'flex-end', paddingLeft: 80 }}>
                                <AntDesign name="close"
                                    size={25}
                                    color='grey'
                                    onPress={() => {
                                        dispatch(removeFromCart(item));
                                    }}
                                />
                            </View>

                        </View>
                        <Text style={{ fontSize: 17, color: 'grey', marginTop: 5 }}>Medium | {item.description}</Text>
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
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'white' }}>
                                <Text style={{ fontWeight: 'bold', color: '#8a2be2' }}>R{item.quantity * item.price}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            )} />

            <View style={{ height: 60 }}>
                <TouchableOpacity onPress={() => handleGoToCheckOut()} style={styles.button}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', textAlign: 'center' }}>CHECKOUT</Text>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', textAlign: 'center' }}>ZAR {subTotal()}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d8bfd8',
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
