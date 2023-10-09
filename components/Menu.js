import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Card } from "react-native-elements";
import HomeHeader from "./HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";

export default function Menu() {

    const [items, setItems] = useState([]);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.CartSlice);

    useEffect(() => {
        getItems();
        console.log("Cart Items:", cartItems);
    }, []);



    const getItems = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "items"));

            const foodItems = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setItems(foodItems);
            console.log("Items data:", foodItems);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    }


    const handleAddToCart = id => {
        const [item] = items.filter(item => item.id === id);
        dispatch(addToCart(item));
        console.log("Item added to cart:", item);
        // navigation.navigate('Cart');
    }

    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <Card containerStyle={styles.card}>
            <View style={styles.cardContent}>
                <View >
                    <Image
                        source={{ uri: item.imageURL }}
                        style={styles.image}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{item.name}: </Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.price}>R{item.price}.00</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={styles.btnAdd}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>ADD TO CART</Text>
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View>
                <HomeHeader />
            </View>
            {/* Render the FlatList */}
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
    card: {
        borderBlockColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        margin: 20,
        width: 320,
        height: 200,
        flexDirection: 'row', // Row layout for card content
        alignItems: 'center', // Center elements vertically
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        resizeMode: 'cover',
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
        marginLeft: 10,
    },
    description: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 10,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5, // Add spacing between description and price
        marginLeft: 10,
        color: '#8a2be2',
    },
    btnAdd: {
        backgroundColor: '#8a2be2',
        padding: 10,
        marginLeft: 100,
        marginTop: 15,
        borderRadius: 10,
    }
});
