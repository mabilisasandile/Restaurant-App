
import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
// import { collection, getDocs, getDoc, where, query, doc, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";



const Payment = () => {

    const [name, setName] = useState('');
    const stripe = useStripe();
    const nav = useNavigation();
    const user = auth.currentUser;
    const userID = user.uid;
    const email = user.email; 


    const pay = async () => {
        try {
            // Sending request
            const response = await fetch('https://restaurant-app-sandile.onrender.com/pay', {
                method: 'POST',
                body: JSON.stringify({ name }),
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
            // nav.navigate('Checkout');
            nav.navigate('Order_Placed');
            // saveOrder();

        } catch (err) {
            console.log("Error: ", err);
            Alert.alert("Something went wrong, try again later!");
        }
    };



    // const saveOrder = async () => {

    //     try {
    //         const docRef = await addDoc(collection(db, 'orders'), {
    //             user_id: userID,
    //             email: email,
    //             address: address,
    //             total_amount: totalAmount,
    //             card_type: card_type,
    //             card_number: card_number,
    //             package: items,
    //         });

    //         nav.navigate('Order_Placed');

    //     } catch (error) {
    //         Alert.alert("Error", "Unable to process order.", [{ text: "OK" }]);
    //     }

    // }



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
                <Text style={{color:'white', textAlign:'center', fontWeight:'bold', fontSize: 24}}>Make Payment - 25 ZAR</Text>
            </TouchableOpacity>
            
        </View >
    );

}

export default Payment;
