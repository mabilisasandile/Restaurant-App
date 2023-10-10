
import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs, getDoc, where, query } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';


export default function Checkout() {

    const [totalAmount, setTotalAmount] = useState(0);
    const [address, setAddress] = useState('');
    const [cardInfo, setCardInfo] = useState('');
    const [isChangeAddress, setIsChangeAddress] = useState(false);
    const [isChangeCard, setIsChangeCard] = useState(false);
    const [userData, setUserData] = useState(null);
    const nav = useNavigation();
    const user = auth.currentUser;
    const userID = user.uid;


    useEffect(() => {
        getUserData();
        console.log("User logged in:", user);
    }, []);

    const getUserData = async () => {
        try {
            const querySnapshot = await getDocs(query(collection(db, "users"),
                where("user_id", "==", userID)));

            const fetchedData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setUserData(fetchedData);
            console.log("User Firestore data:", fetchedData);
            console.log("userData data", userData);
        } catch (error) {
            console.log("Failed to fetch user data", error);
        }
    }



    const handlePlaceOrder = () => {
        nav.navigate('Order_Placed');
    }



    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Place order here</Text>
            </View>

            <Text>Hello </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handlePlaceOrder}
            >
                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', textAlign: 'center' }}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d8bfd8',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
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
    },
});
