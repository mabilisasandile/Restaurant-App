import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList  } from 'react-native';
import { collection, getDocs, doc } from "firebase/firestore";

export default function Menu() {

    const [items, setItems] = useState([]);

    useEffect(()=>{
        getItems();
    }, []);

    const getItems = async()=>{
        try {
            const querySnapshot = await getDocs(collection(db, "items"));

            const foodItems = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setItems(foodItems);
            console.log("Items data:", foodItems);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    }

    // Render each item in the FlatList
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: {item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text>Food menu for today</Text>
            {/* Render the FlatList */}
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
