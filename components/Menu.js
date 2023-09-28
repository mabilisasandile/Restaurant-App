import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';


export default function Menu() {

    return (
        <View style={styles.container}>
            <Text>Food menu page</Text>
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
});
