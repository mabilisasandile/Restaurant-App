
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';


export default function SearchScreen() {

    const [item_name, setItemName] = useState('');
    const [message, setMessage] = useState(null);

    useEffect (()=>{
        setMessage('');
        setItemName('');
    }, []);

    const handleSearch =()=>{
        setMessage("No item matching your search...")
    }

    return (
        <View style={styles.container}>

            <Text>{message}</Text>
            <TextInput
                placeholder="Search item..."
                value={item_name}
                onChangeText={setItemName}
                style={styles.inputs}
            />
            <TouchableOpacity style={styles.btn} onPress={handleSearch}>
                <Text style={{fontSize:18, fontWeight:'600', color:'white'}}>Search</Text>
            </TouchableOpacity>

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
    inputs: {
        width: 250,
        height: 30,
        backgroundColor: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    btn: {
        backgroundColor: '#8a2be2',
        padding: 15,
        marginLeft: 10,
        marginTop: 20,
        borderRadius: 10,
    },
});
