
import React from 'react';
import { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Card, TextInput
} from 'react-native';
import { collection, getDocs, getDoc, where, query, doc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';


export default function Checkout() {

    const [totalAmount, setTotalAmount] = useState(0);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [cardInfo, setCardInfo] = useState('');
    const [isChangeAddress, setIsChangeAddress] = useState(false);
    const [isChangeCard, setIsChangeCard] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [docId, setDocId] = useState(null);

    const nav = useNavigation();
    const user = auth.currentUser;
    const userID = user.uid;


    let fetchedData = {};


    useEffect(() => {
        getUserData();
        console.log("User logged in:", user);
        console.log("User id:", userID);
    }, []);

    const getUserData = async () => {
        try {
            const querySnapshot = query(collection(db, "users")
                , where("user_id", "==", userID));

            const data = await getDocs(querySnapshot);

            data.forEach((doc) => {
                console.log("Doc data: ", doc.data());
                fetchedData[doc.id] = doc.data();
                setDocId(doc.id);
            });

            setUserData(Object.values(fetchedData));
            console.log("Doc id: ", docId);
            console.log("User data from Firestore", fetchedData);
            console.log("userData: ", userData);


        } catch (error) {
            console.log("Failed to fetch user data", error);
        }
    }




    const handlePlaceOrder = () => {
        nav.navigate('Order_Placed');
    }



    return (

        <View style={styles.container}>

            <Text style={styles.text}></Text>

            {userData.map((user, index) => (
                <View key={index}>
                    <Text style={styles.text}>Hello {user.name},</Text>
                    <Text style={styles.text}>Place your order here!</Text>
                    <Text>Phone: {user.phone}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Address: {user.address}</Text>
                    <TextInput
                        placeholder="Enter drop-off address"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.inputs}
                    />
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handlePlaceOrder}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '700', color: 'white', textAlign: 'center' }}>Place Order</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            ))}
        </View>

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
        marginTop: 10,
    },
    card: {
        borderBlockColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        margin: 20,
        width: 320,
        height: 350,
        // flexDirection: 'row',
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
    inputs: {
        width: 250,
        height: 30,
        backgroundColor: '#fffafa',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
});


