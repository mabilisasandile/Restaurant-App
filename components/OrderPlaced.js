
import React, { useEffect } from "react";
import { View, Text } from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const OrderPlaced = () => {

    const nav = useNavigation();

    useEffect(()=>{
        setTimeout(()=>{
            nav.navigate('Home');
        }, 3000);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="verified" size={90} color='green' />
            <Text>Congrats, Your Order Placed Successfully!! </Text>
        </View>
    );
}


export default OrderPlaced;