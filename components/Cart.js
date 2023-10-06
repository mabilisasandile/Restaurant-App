import React, { useState, useEffect } from "react";
import {
    StyleSheet, View, Text, ScrollView, Image,
    SafeAreaView, Modal, FlatList, TouchableOpacity
} from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import HomeHeader from "./HomeHeader";
import image3 from '../images/petsos.jpg';
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector, connect } from "react-redux";
import { removeFromCart } from "../Redux/CartSlice";
import { addToCart } from "../Redux/CartSlice";
import { decrementQuantity } from "../Redux/CartSlice";
import { incrementQuantity } from "../Redux/CartSlice";


function Cart({ cartItems }) {

    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.CartSlice);

    const [itemName, setItemName] = useState('');
    const [itemRecipe, setItemRecipe] = useState('');
    const [itemPrice, setItemPrice] = useState(0);
    const [itemImage, setItemImage] = useState('');


    useEffect(() => {
        console.log("Items on Cart:", storeData);
        setItemName(storeData.name);
        setItemRecipe(storeData.description);
        setItemPrice(storeData.price);
        setItemImage(storeData.imageURL);
    }, []);


    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <Card containerStyle={styles.card}>
            <View>

            </View>
        </Card>
    );

    return (

        <View>
            <Text>Your Cart</Text>
            <FlatList
                data={cartItems}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>${item.price}</Text>
                    </View>
                )}
            />
        </View>
        // <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#d8bfd8', gap: 15 }}>
        //     <Text>My Cart</Text>
        //     {/* //Parent container */}
        //     <View style={{
        //         height: responsiveHeight(20), backgroundColor: 'white',
        //         borderBottomColor: 'black', borderBottomWidth: 2, flexDirection: 'row'
        //     }}>
        //         {/* //Child 1 */}
        //         <View style={{ flex: 0.35 }}>
        //             <Image source={itemImage} style={{ height: 142, width: 142 }} />
        //         </View>

        //         {/* //Child 2 */}
        //         <View style={{
        //             flex: 0.7, paddingHorizontal: 10, paddingVertical: 10,
        //             alignItems: 'center', justifyContent: 'space-evenly'
        //         }}>
        //             <View style={{
        //                 flexDirection: 'row', alignContent: 'center',
        //                 justifyContent: 'space-between', alignItems: 'center'
        //             }}
        //             >
        //                 <Text style={{ fontSize: 20, fontWeight: '600' }}>{itemName}</Text>
        //                 <AntDesign name="close" size={25} color='grey' />
        //             </View>
        //             <Text style={{ fontSize: 17, color: 'grey', marginTop: 5 }}>Medium, {itemRecipe}</Text>
        //             <View style={{
        //                 alignContent: 'center', justifyContent: 'space-between',
        //                 flexDirection: 'row', backgroundColor: '#dcdcdc'
        //             }}>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        //                     <AntDesign name="minuscircleo" size={24} color="black" />
        //                     <Text>1</Text>
        //                     <AntDesign name="pluscircleo" size={24} color="black" />
        //                 </View>
        //                 <Text>R{itemPrice}</Text>
        //             </View>
        //         </View>
        //     </View>
        // </SafeAreaView>

    );
}


const mapStateToProps = (state) => ({
    cartItems: state.cart.items,
});


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
});

export default connect(mapStateToProps)(Cart);
