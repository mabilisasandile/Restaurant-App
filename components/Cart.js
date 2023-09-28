import React, { useState } from "react";
import { StyleSheet, View, Text } from 'react-native';


export default function Cart() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>RESTAURANT APP</Text>
            <Text>No items added on the cart yet!</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ffffff',
    },
});
