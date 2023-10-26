import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, getDoc, where, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Card } from "react-native-elements";
import MenuHeader from "./MenuHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { removeFromCart } from "../Redux/CartSlice";
import { FontAwesome } from "@expo/vector-icons";
import { Alert } from "react-native";


export default function BreakfastMenu() {

    const [items, setItems] = useState([]);
    const [breakfastData, setBreakfastData] = useState([]);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    let fetchedData = [];

    const cartItems = useSelector((state) => state.CartSlice);

    useEffect(() => {
        handleBreakfastMenu();
        console.log("Cart Items:", cartItems);
    }, []);



    const handleBreakfastMenu = async () => {
        try {
            const querySnapshot = query(collection(db, "items")
                , where("category", "==", "Breakfast"));

            const data = await getDocs(querySnapshot);

            data.forEach((doc) => {
                console.log("Doc data: ", doc.data());
                fetchedData[doc.id] = doc.data();

            });

            setBreakfastData(Object.values(fetchedData));

            console.log("Breakfast Menu:", breakfastData);

        } catch (error) {
            console.log("Failed to fetch breakfast data", error);
            Alert.alert("Something went wrong. Please try again!");
        }

    }




    const handleViewItem = async (itemId) => {

        console.log("Selected item ID", itemId);

        try {
            //CREATING REFERENCE TO SPECIFIC DOCUMENT IN MENU COLLECTION
            const menuItemRef = doc(collection(db, "items"), itemId);
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
            const [item] = breakfastData.filter(item => item.id === id);
            dispatch(addToCart(item));
            console.log("Item added to cart:", item);
        } catch (error) {
            console.log("Failed to add item into cart:", error);
            Alert.alert("Something went wrong. Please try again!");
        }


    }

    const handleRemoveFromCart = id => {
        try {
            const [item] = breakfastData.filter(item => item.id === id);
            dispatch(removeFromCart(item));
            console.log("Item removed from cart:", item);
        } catch (error) {
            console.log("Failed to remove item from cart:", error);
            Alert.alert("Something went wrong. Please try again!");
        }
    }

    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <Card containerStyle={styles.card}>
            <View style={styles.cardContent}>
                <View >
                    <TouchableOpacity onPress={() => handleViewItem(item.id)}>
                        <Image
                            source={{ uri: item.imageURL }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.cardContent}>
                <View>
                    <Text style={styles.title}>{item.name}: </Text>

                </View>

                <View style={{ marginLeft: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => handleAddToCart(item.id)} style={{ marginHorizontal: 10 }}>
                        <FontAwesome
                            name="cart-plus"
                            size={37}
                            color='#8a2be2'
                        />
                    </TouchableOpacity>
                    <Text style={styles.price}>R{item.price}</Text>
                </View>
            </View>

        </Card>
    );

    return (
        <View style={styles.container}>
            <View>
                <MenuHeader />
            </View>
            {/* Render the FlatList */}
            <View>
                <Text style={{ fontSize: 24, fontWeight: '700' }}>Breakfast Menu</Text>
            </View>
            <FlatList
                data={breakfastData}
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    image: {
        width: 300,
        height: 120,
        borderRadius: 20,
        resizeMode: 'cover',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
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
