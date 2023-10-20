import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs, where, query, db } from "firebase/firestore";
import { auth } from '../config/firebase';
import SignIn from './SignIn';

export default function MyAccountScreen() {

    const [userData, setUserData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [editAddress, setEditAddress] = useState('');
    const [editCardType, setEditCardType] = useState('');
    const [editCardNo, setEditCardNo] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const fetchedData = {};
    const user = auth.currentUser;
    const userID = user ? user.uid : null; // Ensure the user object is not null



    useEffect(() => {
        if (userID) {
            getUserData();
        }
    }, [userID]);



    const getUserData = async () => {
        try {
            const querySnapshot = query(collection(db, "users"), where("user_id", "==", userID));
            const data = await getDocs(querySnapshot);

            data.forEach((doc) => {
                console.log("Doc data: ", doc.data());
                fetchedData[doc.id] = doc.data();
            });

            setUserData(Object.values(fetchedData));
            console.log("User data from Firestore", fetchedData);
        } catch (error) {
            console.log("Failed to fetch user data", error);
        }
    }



    const handleSignIn = () => {
        nav.navigate('SignIn');
    }



    return (
        <View style={styles.container}>
            {userData ? (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: '700' }}>My Account</Text>
                    <Text>{user.email}</Text>

                    {userData.map((user, index) => (
                        <View key={index}>
                            <Text style={styles.text}>Hello {user.name},</Text>
                            <Text style={styles.text}>Place your order here!</Text>
                            <Text>Phone: {user.phone}</Text>
                            <Text>Email: {user.email}</Text>
                            <Text>Address: {user.address}</Text>
                        </View>
                    ))}

                </View>
            ) : (
                <View>
                    <Text style={{ fontSize: 24, fontWeight: '700' }}>Loading...</Text>
                    <View style={{ paddingTop: 100, marginTop: 100 }}>
                        <TouchableOpacity
                            style={styles.nav_link}
                            onPress={handleSignIn}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>Have you signed in? No. Then click here to Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
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
    nav_link: {
        backgroundColor: '#87ceeb',
        paddingHorizontal: 5,
        width: 200,
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'underline',
        textDecorationColor: '#000000',
    },
});
