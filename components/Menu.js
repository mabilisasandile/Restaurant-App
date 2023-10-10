import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
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


    const handleViewItem = async (itemId) => {

        console.log("Selected item ID", itemId);

        try {
            //CREATING REFERENCE TO SPECIFIC DOCUMENT IN MENU COLLECTION
            const menuItemRef = doc(collection(db, "items"), itemId); //,foodItemId
            console.log("Menu Item Ref ", menuItemRef)
            //FETCH DOCUMENT DATA
            const docSnapshot = await getDoc(menuItemRef);
            console.log(docSnapshot, "Snapshot")

            if (docSnapshot.exists()) {
                //IF DOCUMENT IS THERE, use docSnapShot.id TO ACCESS DOCUMENTS FIELD
                const menuItemData = docSnapshot.data();
                console.log("Category Data:", menuItemData);
                navigation.navigate('View_Item', { menuItemData });
                //NOW YOU CAN USE THE foodItemData TO DISPLAY/PROCESS THE DOCUMENT
            } else {
                console.log("Document not found");
            }
        } catch (error) {
            console.error("Error fetching menu item", error);
        }

    }


    const handleAddToCart = id => {
        const [item] = items.filter(item => item.id === id);
        dispatch(addToCart(item));
        console.log("Item added to cart:", item);
        // navigation.navigate('Cart');
    }

    const handleRemoveFromCart = id => {
        const [item] = items.filter(item => item.id === id);
        dispatch(removeFromCart(item));
        console.log("Item removed from cart:", item);
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
            <View style={styles.cardContent}>
                <TouchableOpacity onPress={() => handleViewItem(item.id)} style={styles.btn}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>VIEW MORE DETAILS</Text>
                </TouchableOpacity>

                <View style={{ marginLeft: 60, alignItems: 'center' }}>
                    {cartItems.some((value) => value.id == item.id) ? (
                        <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
                            <FontAwesome
                                name="minus-square"
                                size={43}
                                color='grey'
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => handleAddToCart(item.id)}>
                            <FontAwesome
                                name="plus-square"
                                size={43}
                                color='#8a2be2'
                            />
                        </TouchableOpacity>
                    )}
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
        alignItems: 'center',
        justifyContent: 'space-evenly',
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
    btn: {
        backgroundColor: '#8a2be2',
        padding: 10,
        marginLeft: 20,
        marginTop: 15,
        borderRadius: 10,
    }
});
