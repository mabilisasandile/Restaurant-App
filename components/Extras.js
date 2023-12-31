import React, { useEffect, useState } from "react";
import {
    StyleSheet, View, Text, FlatList,
    TouchableHighlight, TouchableOpacity, Alert
} from 'react-native';
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Card } from "react-native-elements";
import MenuHeader from "./MenuHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { removeFromCart } from "../Redux/CartSlice";
import { FontAwesome } from "@expo/vector-icons";


export default function Extras() {

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
            const querySnapshot = await getDocs(collection(db, "extras"));

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




    const handleViewItem = async (itemId) => {

        console.log("Selected item ID", itemId);

        try {
            //CREATING REFERENCE TO SPECIFIC DOCUMENT IN MENU COLLECTION
            const menuItemRef = doc(collection(db, "extras"), itemId);
            console.log("Menu Item Ref ", menuItemRef)

            //FETCH DOCUMENT DATA
            const docSnapshot = await getDoc(menuItemRef);
            console.log(docSnapshot, "Snapshot")

            if (docSnapshot.exists()) {

                const menuItemData = docSnapshot.data();
                console.log("Category Data:", menuItemData);
                navigation.navigate('View_Item', { menuItemData });

            } else {
                console.log("Document not found");
                Alert.alert("Something went wrong. Please try again!");
            }

        } catch (error) {
            console.error("Error fetching menu item", error);
            Alert.alert("Something went wrong. Please try again!");
        }

    }


    const handleAddToCart = id => {
        try {
            const [item] = items.filter(item => item.id === id);
            dispatch(addToCart(item));
            console.log("Item added to cart:", item);
        } catch (error) {
            console.log("Failed to add to cart:", error);
            Alert.alert("Something went wrong. Please try again!");
        }
    }


    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <View>
            {items.length < 1 ? (
                <Text style={{ fontSize: 21, fontWeight: '500', textAlign: 'center' }}>Loading...</Text>
            ) : (
                <TouchableHighlight
                    underlayColor='white'
                    activeOpacity={0.9}
                    onPress={() => handleViewItem(item.id)}
                    style={{ marginVertical: 0 }}>
                    <View style={styles.card}>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}> {item.name} </Text>
                        </View>

                        <View style={styles.cardContent}>

                            <View style={{ alignItems: 'flex-start', marginLeft: 1 }}>
                                <Text style={styles.price}>R{item.price}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', marginRight: 1 }}>
                                <TouchableOpacity onPress={() => handleAddToCart(item.id)}>
                                    <FontAwesome
                                        name="cart-plus"
                                        size={25}
                                        color='#8a2be2'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </TouchableHighlight >
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <MenuHeader />
            </View>
            {/* Render the FlatList */}
            <View>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>Menu</Text>
            </View>

            <FlatList
                data={items}
                numColumns={2} // Display two cards per row
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
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        width: 170,
        height: 60,
        elevation: 13, // Add elevation for a card-like appearance
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 2,
    },
    image: {
        width: 320,
        height: 140,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
        color: '#8a2be2',
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
    btn2_text: {
        margin: 12,
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});
