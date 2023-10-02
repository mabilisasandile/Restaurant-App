import React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";


export default function HomeHeader (){

    return(
        <View>
            <Icon
                type = "material-community"
                name = "menu"
                color = {'black'}
                size = {32}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
});