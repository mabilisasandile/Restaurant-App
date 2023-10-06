import React, { useState } from "react";
import {
    StyleSheet, View, Text, ScrollView, Image,
    SafeAreaView, Modal, FlatList, TouchableOpacity
} from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import HomeHeader from "./HomeHeader";
import image3 from '../images/petsos.jpg';
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Redux/CartSlice";
import { addToCart } from "../Redux/CartSlice";
import { decrementQuantity } from "../Redux/CartSlice";
import { incrementQuantity } from "../Redux/CartSlice";


export default function Cart() {

    const [showModal, setShowModal] = useState(true);

    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.CartSlice);
    console.log(storeData);

    //Handle button events
    const handleClose = () => {
        setShowModal(false);
    }

    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <Card containerStyle={styles.card}>
            <View>

            </View>
        </Card>
    );

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#d8bfd8', gap: 15 }}>
            <Text>My Cart</Text>

            {/* //Parent container */}
            <View style={{
                height: responsiveHeight(20), backgroundColor: 'white',
                borderBottomColor: 'black', borderBottomWidth: 2, flexDirection: 'row'
            }}>
                {/* //Child 1 */}
                <View style={{ flex: 0.35 }}>
                    <Image source={image3} style={{ height: 142, width: 142 }} />
                </View>

                {/* //Child 2 */}
                <View style={{ flex: 0.7, paddingHorizontal: 10, paddingVertical:10,
                    alignItems: 'center', justifyContent:'space-evenly' }}> 
                    <View style={{
                        flexDirection: 'row', alignContent: 'center',
                        justifyContent: 'space-between', alignItems:'center'
                    }}
                    >
                        <Text style={{fontSize:20, fontWeight:'600'}}>Petsos</Text>
                        <AntDesign name="close" size={25} color='grey' />
                    </View>
                    <Text style={{fontSize:17, color:'grey', marginTop:5}}>Medium, Price</Text>
                    <View style={{alignContent:'center', justifyContent:'space-between',
                         flexDirection:'row', backgroundColor:'#dcdcdc'}}>
                        <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                        <AntDesign name="minuscircleo" size={24} color="black" />
                        <Text>1</Text>
                        <AntDesign name="pluscircleo" size={24} color="black" />
                        </View>
                        <Text>R114.99</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>

    );
}


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
