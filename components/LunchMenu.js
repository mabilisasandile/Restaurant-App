import React, { useEffect, useState } from "react";
import {
    StyleSheet, View, Text, FlatList, Alert,
    Image, TouchableOpacity, Modal
} from 'react-native';
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


export default function LunchMenu() {

    const [items, setItems] = useState([]);
    const [lunchData, setLunchData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [extras, setExtras] = useState([]);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    let fetchedData = [];
    let extrasData = [];

    const cartItems = useSelector((state) => state.CartSlice);

    useEffect(() => {
        handleLunchMenu();
        console.log("Cart Items:", cartItems);
    }, []);



    // Fetch lunch menu from Firestore
    const handleLunchMenu = async () => {
        try {
            const querySnapshot = query(collection(db, "items")
                , where("category", "==", "Lunch"));

            const data = await getDocs(querySnapshot);

            data.forEach((doc) => {
                console.log("Doc data: ", doc.data());
                fetchedData[doc.id] = doc.data();

            });

            setLunchData(Object.values(fetchedData));

            console.log("Lunch Menu:", lunchData);

        } catch (error) {
            console.log("Failed to fetch lunch data", error);
            Alert.alert("Something went wrong while fetching data.");
        }
    }



    //Fetch extras menu from Firestore
    const handleExtrasMenu = async () => {
        try {
            const querySnapshot = query(collection(db, "extras")
                , where("category", "==", "Drink"));

            const data = await getDocs(querySnapshot);

            data.forEach((doc) => {
                console.log("Doc data: ", doc.data());
                extrasData[doc.id] = doc.data();

            });

            setExtras(Object.values(extrasData));

            console.log("Extras menu:", extras);

        } catch (error) {
            console.log("Failed to fetch extras data", error);
            Alert.alert("Something went wrong while fetching data.");
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
            const [item] = items.filter(item => item.id === id);

            handleExtrasMenu();
            setIsModalVisible(true);

            dispatch(addToCart(item));
            console.log("Item added to cart:", item);
            Alert.alert("Item added to cart");
        } catch (error) {
            console.log("Failed to add to cart:", error);
            Alert.alert("Something went wrong. Please try again!");
        }
    }

    const hideModal = () => {
        setIsModalVisible(false);
    };

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

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{item.name} </Text>
            </View>

            <View style={styles.cardContent2}>
                <View style={{ alignItems: 'flex-start' }}>
                    <Text style={styles.price}>R{item.price}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => handleAddToCart(item.id)}>
                        <FontAwesome
                            name="cart-plus"
                            size={37}
                            color='#8a2be2'
                        />
                    </TouchableOpacity>
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
                <Text style={{ fontSize: 24, fontWeight: '700' }}>Lunch Menu</Text>
            </View>

            <FlatList
                data={lunchData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

            {/* Modal */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={hideModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Add your content for the modal here */}
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>Add Extras</Text>
                        <FlatList
                            data={extras}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                                    <TouchableOpacity onPress={() => handleAddToCart(item.id)}>
                                        <Text style={{ fontSize: 18, fontWeight: '500' }}>* {item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name} - R{item.price}</Text>
                                    </TouchableOpacity>
                                </View>

                            )}
                            keyExtractor={(item) => item.id}
                        />
                        {/* Close button */}
                        <TouchableOpacity onPress={hideModal}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#d8bfd8',
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        height: "70%", // Set the height to half of the screen
        width: "80%", // Set the width to 80% of the screen
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#d8bfd8',
    },
    closeButton: {
        marginTop: 20,
        color: "blue",
        fontSize: 20,
        fontWeight:'700'
    },
});
