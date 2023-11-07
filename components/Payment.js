
import { useStripe } from "@stripe/stripe-react-native";
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { doc, deleteDoc, collection, query, where } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { removeFromCart } from "../Redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";



const Payment = ({ route }) => {

    // const { amount } = route.params;
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.CartSlice);
    var data = JSON.stringify(storeData);
    data = JSON.parse(data);

    const [name, setName] = useState('');
    const stripe = useStripe();
    const nav = useNavigation();
    const user = auth.currentUser;
    const userID = user.uid;
    const email = user.email;


    useEffect(() => {
        console.log("Total Amount:");
    }, []);



    const pay = async () => {
        try {
            // Sending request
            const response = await fetch('https://restaurant-app-sandile.onrender.com/pay', {
                method: 'POST',
                body: JSON.stringify({ name }),
                // body: JSON.stringify({ name, amount }),     // Include the amount in the request body
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (!response.ok) {
                return Alert.alert(data.message);
            }

            const clientSecret = data.clientSecret;

            const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: 'Sandile',
                // amount: amount * 100, // Convert amount to cents (Stripe expects amount in cents)
                currency: 'zar', // Set the currency
            });
            if (initSheet.error) {
                return Alert.alert(initSheet.error.message);
            }

            const presentSheet = await stripe.presentPaymentSheet({
                clientSecret,
            });
            if (presentSheet.error) {
                return Alert.alert(presentSheet.error.message);
            }

            Alert.alert("Payment complete, thank you!");
            dispatch(removeFromCart(data));
            nav.navigate('Order_Placed');

        } catch (err) {
            console.log("Error: ", err);
            Alert.alert("Something went wrong, try again later!");
            cancelOrder();
        }
    };


    const cancelOrder = async () => {
        const querySnapshot = query(collection(db, "orders")
            , where("user_id", "==", userID));
        await deleteDoc(querySnapshot);
        // await deleteDoc(doc(querySnapshot));
    }



    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#d8bfd8', height: 650 }}>
            <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Name"
                style={{
                    width: 300,
                    fontSize: 20,
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: 40,
                    marginBottom: 30,
                    backgroundColor: 'white'
                }}
            />
            <TouchableOpacity
                onPress={pay}
                style={{
                    backgroundColor: '#8a2be2',
                    padding: 10,
                    marginLeft: 20,
                    marginTop: 5,
                    borderRadius: 10,
                    width: 250,
                    marginBottom: 5
                }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>Make Payment - 100 ZAR</Text>
                {/* <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>Make Payment - ZAR {amount}</Text> */}
            </TouchableOpacity>

        </View >
    );
}

export default Payment;
