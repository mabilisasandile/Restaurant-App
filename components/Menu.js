import React, { useEffect, useState } from "react";
import {
    StyleSheet, View, Text, FlatList, Alert,
    Image, TouchableOpacity, ScrollView, TouchableHighlight
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
import img_breakfast from "../images/breakfast/gul-isik.jpg";
import img_lunch from "../images/lunch/jonathan-borba.jpg";
import img_dinner from "../images/lunch/cats-coming.jpg";
import img_menu from "../images/petsos.jpg";


export default function Menu() {

    const [items, setItems] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.CartSlice);


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


    const handleBreakfastMenu = () => {
        navigation.navigate("Breakfast_Menu");
    }

    const handleLunchMenu = () => {
        navigation.navigate("Lunch_Menu");
    }

    const handleDinnerMenu = () => {
        navigation.navigate("Dinner_Menu");
    }

    const handleExtraMenu = () => {
        navigation.navigate("Extras");
    }




    const handleViewItem = async (itemId) => {

        console.log("Selected item ID", itemId);

        try {
            //CREATING REFERENCE TO SPECIFIC DOCUMENT IN MENU COLLECTION
            const menuItemRef = doc(collection(db, "items"), itemId);
            console.log("Menu Item Ref ", menuItemRef);

            //FETCH DOCUMENT DATA
            const docSnapshot = await getDoc(menuItemRef);
            console.log(docSnapshot, "Snapshot");

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

    const handleRemoveFromCart = id => {
        try {
            const [item] = items.filter(item => item.id === id);
            dispatch(removeFromCart(item));
            console.log("Item removed from cart:", item);
        } catch (error) {
            console.log("Failed to remove item from cart:", error);
            Alert.alert("Something went wrong. Please try again!");
        }
    }

    // Render each item in the FlatList
    const renderItem = ({ item }) => (
       
        <TouchableHighlight
        underlayColor='white'
        activeOpacity={0.9}
        onPress={() => handleViewItem(item.id)}
        style={{marginVertical:5 }}>
        <View style={styles.card}>
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
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}> {item.name} </Text>
            </View>

            <View style={styles.cardContent}>
                    <View style={{ alignItems:'flex-start', marginLeft:5 }}>
                        <Text style={styles.price}>R{item.price}</Text>
                    </View>
                    <View style={{ alignItems:'flex-end', marginRight:5 }}>
                        <TouchableOpacity onPress={() => handleAddToCart(item.id)}>
                            <FontAwesome
                                name="cart-plus"
                                size={37}
                                color='#8a2be2'
                            />
                        </TouchableOpacity>
                    </View>
            </View>

        </View>
      </TouchableHighlight >
    );

    return (
        <View style={styles.container}>
            <View>
                <MenuHeader />
            </View>

            <View style={{ height: 140 }}>
                <View style={{ mt: -1, alignItems: 'center' }}>
                    <Text style={{ color: '#8a2be2', fontSize: 22, fontWeight: '700' }}>Categories</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={true} >

                    <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', mt: 4 }}>

                        <View style={{
                            flexDirection: 'row', alignContent: 'center',
                            justifyContent: 'space-between', alignItems: 'center', height: 50
                        }}>

                            <TouchableOpacity
                                onPress={handleBreakfastMenu}
                            >
                                <Image source={img_breakfast} style={styles.btn2} />
                                <Text style={styles.btn2_text}>Breakfast</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleLunchMenu}
                            >
                                <Image source={img_lunch} style={styles.btn2} />
                                <Text style={styles.btn2_text}>Lunch</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleDinnerMenu}
                            >
                                <Image source={img_dinner} style={styles.btn2} />
                                <Text style={styles.btn2_text}>Dinner</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleExtraMenu}
                            >
                                <Image source={img_menu} style={styles.btn2} />
                                <Text style={styles.btn2_text}>More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </View>

            {/* Render the FlatList */}
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
        width: '100%',
        backgroundColor: '#d8bfd8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        width: 150,
        height: 150,
        elevation: 13, // Add elevation for a card-like appearance
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: 150,
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
        color: '#8a2be2',
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
        borderWidth: 1,
        borderRadius: 50,
        height: 70,
        width: 120,
        marginLeft: 20,
        marginBottom: 10,
        borderColor: 'black',
        backgroundColor: '#8a2be2',
    },
    btn2_text: {
        margin: 12,
        color: '#8a2be2',
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        marginTop: -10,
    }
});
