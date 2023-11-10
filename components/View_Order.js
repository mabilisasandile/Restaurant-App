
import React, { useEffect, useState } from "react";
import {
    StyleSheet, View, Text, FlatList, TouchableHighlight, Alert,
    Image, TouchableOpacity
} from 'react-native';
import { collection, getDocs, doc, getDoc, where, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Card } from "react-native-elements";
import HomeHeader from "./HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";
import { FontAwesome } from "@expo/vector-icons";


export default function ViewOrder() {

    const [orderData, setOrderData] = useState([]);

    const navigation = useNavigation();
    const user = auth.currentUser;
    const userID = user ? user.uid : null; // Ensure the user object is not null
    let fetchedData = [];


    useEffect(() => {
        handleOrderData();
        console.log("userID:", userID);
    }, []);



    const handleOrderData = async () => {
        try {
            const querySnapshot = query(collection(db, "orders")
                , where("user_id", "==", userID));

            const data = await getDocs(querySnapshot);

            data.forEach((doc) => {
                console.log("Doc data: ", doc.data());
                console.log("Doc id:", doc.id);
                fetchedData[doc.id] = doc.data();

            });

            setOrderData(Object.values(fetchedData));

            console.log("fetchedData:", fetchedData);

        } catch (error) {
            console.log("Failed to fetch order data", error);
            Alert.alert("Something went wrong. Please try again!");
        }
    }

    console.log("Order data:", orderData);


    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <View>
            {orderData ? (
                <View style={styles.card}>  
                    <View style={styles.cardContent2}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text style={styles.title}>Order No. {item.order_no} </Text>
                            <Text>Customer: {item.email}</Text>
                            <Text>Date: {item.date}</Text>
                            <Text style={{ fontWeight:'bold' }}>Item(s): </Text>
                            <FlatList
                                data={item.package}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row', marginLeft:30 }}>
                                        <Text>* {item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}</Text>
                                        <Text style={{ fontSize: 22, fontWeight: '600' }}> | </Text>
                                        <Text>R{item.price} </Text>
                                        <Text style={{ fontSize: 22, fontWeight: '600' }}> | </Text>
                                        <Text>QTY-{item.quantity}</Text>
                                    </View>

                                )}
                                keyExtractor={(item) => item.id}
                            />
                            <Text style={{marginLeft:30}}>-------------------------------------------</Text>
                            <Text style={styles.price}>Total Amount: R{item.total_amount}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: '400', color: 'black' }}>Loading...</Text>
                </View>
            )}
        </View>

    );

    return (
        <View style={styles.container}>
            <View>
                <HomeHeader />
            </View>
            {/* Render the FlatList */}
            <View>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>ORDER</Text>
            </View>

            <FlatList
                data={orderData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderBlockColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        margin: 20,
        width: 320,
        height: 'auto',
        flexDirection: 'row', // Row layout for card content
        alignItems: 'center', // Center elements vertically
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 2,
    },
    cardContent2: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 320,
        height: 140,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        resizeMode: 'cover',
        marginTop: -16,
    },
    textContainer: {
        flex: 1, // Take up remaining space
        marginLeft: 10, // Add spacing between image and text
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "gray",
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 110,
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5, 
        marginBottom: 10,
        color: '#8a2be2',
        marginLeft: 30,
    },
    btn: {
        cursor: 'pointer',
        padding: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
        textDecorationLine: 'underline',
        textDecorationColor: 'black',
    },
    btn2: {
        borderWidth: 2,
        borderRadius: 30,
        height: 50,
        width: 120,
        marginLeft: 20,
        marginBottom: 10,
        borderColor: 'white',
        backgroundColor: '#8a2be2',
    },
    btn2_text: {
        margin: 12,
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});
