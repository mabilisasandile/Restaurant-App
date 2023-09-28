import React from "react";

import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function Header(){

    return(
        <View style={styles.header}>

        </View>
    );
}

const styles = StyleSheet.create({
    header :{
        flexDirection: "row",
        backgroundColor: '#9370db',
        height: 50,
    }
})