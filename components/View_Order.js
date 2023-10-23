import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';



export default function ViewOrder() {

    return (
        <View style={styles.container}>
            <Text style={{fontSize:22, fontWeight:'500'}}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d8bfd8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
});

