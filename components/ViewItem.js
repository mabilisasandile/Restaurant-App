import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import HomeHeader from "./HomeHeader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartSlice";


const ViewItem = ({ route }) => {

    const dispatch = useDispatch();
    const {menuItemData} = route.params;
    const {name, price, description, imageURL} = menuItemData;
    const storeData = useSelector((state) => state.CartSlice);
    const nav = useNavigation();

    const [itemName, setItemName] = useState('');
    const [itemRecipe, setItemRecipe] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemImage, setItemImage] = useState('');

    useEffect(() => {
        setItemName(menuItemData.name);
        setItemRecipe(menuItemData.description);
        setItemPrice(menuItemData.price);
        setItemImage(menuItemData.imageURL);
        console.log("Viewed item data:", menuItemData);
    }, []);



    const handleAddToCart = () => {
        const item = menuItemData;
        dispatch(addToCart(item));
        console.log("Item added to cart:", item);
        nav.navigate('Cart');
    }

    return (
        <SafeAreaView style={{flex:1, gap:20, backgroundColor:"white"}}>
            <StatusBar backgroundColor="white" />
            <View style={{ alignContent: "flex-start", alignItems: "flex-start", paddingBottom: 5 }}>
                <HomeHeader />
            </View>
            <View style={styles.container}>
                <Card containerStyle={styles.card}>

                    <Image source={{ uri: imageURL }} style={styles.image} />

                    <View style={{
                        flex: 0.7, paddingHorizontal: 10, paddingVertical: 10,
                        alignItems: 'center', justifyContent: 'space-evenly'
                    }}>

                        <Text>Item: {itemName}</Text>
                        <Text>Recipe: {description}</Text>
                        <Text>Price: R{price}</Text>
                        <Text>Delivery Time: 4h30 PM</Text>

                        <TouchableOpacity
                            style={styles.btnAdd}
                            onPress={handleAddToCart}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.text}>ADD TO CART</Text>
                        </TouchableOpacity>

                    </View>

                </Card>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
    },
    card: {
        borderBlockColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        margin: 20,
        width: 320,
        height: 500,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: 290,
        borderRadius: 20,
    },
    btnAdd: {
        backgroundColor: '#8a2be2',
        padding: 15,
        marginLeft: 10,
        marginTop: 20,
        borderRadius: 10,
    },
});

export default ViewItem;