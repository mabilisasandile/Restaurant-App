import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "./HomeHeader";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import image3 from '../images/petsos.jpg';

const ViewItem = ({ route }) => {

    const dispatch = useDispatch();
    // const productData = route.params.main;
    // const {name, price, recipe, img} = productData;

    const nav = useNavigation();

    const [itemName, setItemName] = useState('');
    const [itemRecipe, setItemRecipe] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemImage, setItemImage] = useState('');

    useEffect(()=>{
        setItemName("Pizza");
        setItemRecipe("mmkd jjjs iiis");
        setItemPrice(159.99);
        setItemImage(image3);
    }, []);

    const itemData = {
        itemName,
        itemRecipe,
        itemPrice,
        itemImage
    }

    const handleAddToCart =()=>{
        dispatch(addToCart(itemData));
        nav.navigate('Cart');
    }

    return (
        <View>
            <View style={{ alignContent: "flex-start", alignItems: "flex-start", paddingBottom: 5 }}>
                <HomeHeader />
            </View>
            <View style={styles.container}>
                <Card containerStyle={styles.card}>

                    <Image source={itemImage} style={styles.image} />

                    <View style={{ flex: 0.7, paddingHorizontal: 10, paddingVertical:10,
                    alignItems: 'center', justifyContent:'space-evenly' }}>

                        <Text>Item: {itemName}</Text>
                        <Text>Recipe: {itemRecipe}</Text>
                        <Text>Price: R{itemPrice}</Text>
                        <Text>Delivery Time: 4h30 PM</Text>

                        <TouchableOpacity style={styles.btnAdd}
                            onPress={handleAddToCart}
                        >
                            <Text style={styles.text}>ADD TO CART</Text>
                        </TouchableOpacity>

                    </View>

                </Card>
            </View>
        </View>
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