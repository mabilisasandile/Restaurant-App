import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView,SafeAreaView, Modal, FlatList, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import HomeHeader from "./HomeHeader";
import image3 from '../images/petsos.jpg';


export default function Cart() {

    const [showModal, setShowModal] = useState(true);

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
        <SafeAreaView style={{flex:1, paddingHorizontal:10, backgroundColor:'#d8bfd8', gap:15}}>
            <Text>My Cart</Text>

            <View style={{height:responsiveHeight(20), backgroundColor:'white', 
            borderBottomColor:'black', borderBottomWidth:2, flexDirection:'row'}}>

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
