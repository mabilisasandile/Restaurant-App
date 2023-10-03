import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, withBadge } from "react-native-elements";


export default function MenuHeader() {

    const CartIconWithBadge = withBadge(0)(Icon);

    // const handleOptions = () => {
    //     return (
    //         <View >
    //             <Text>Account Information</Text>
    //             <Text>Food Menus</Text>
    //             <Text>View Cart</Text>
    //             <Text>Checkout</Text>
    //             <Text>Place An Order</Text>
    //             <Text>Support</Text>
    //         </View>
    //     )
    // }


    return (
        <View style={styles.header}>
            <View style={{alignItems:"center", justifyContent:"center", marginLeft:15}}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={'white'}
                    size={32}
                    // onPress={handleOptions}
                />
            </View>

            <View style={{ flex:1, justifyContent:'center', alignItems:'center', paddingTop:10}}>
                <Text style={styles.text}>EXPLORE OUR MENU</Text>
            </View>

            <View style={{ justifyContent:'flex-start', alignItems:'center', paddingTop:10, paddingRight:10 }}>
                <CartIconWithBadge 
                    type="material-community"
                    name="cart"
                    size={35}
                    color={'white'}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginLeft: 5,
        backgroundColor: '#8a2be2',
        paddingLeft: 5,
        width: '100%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color:'#FFFFFF',
    },
});