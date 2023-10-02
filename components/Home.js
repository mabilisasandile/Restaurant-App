import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
// import * as Animatable from 'react-native-animatable';
// import Swiper from "react-native-swiper";
import Menu from './Menu';
import Cart from './Cart';

import image1 from '../images/stickel.jpg';
import image2 from '../images/ash.jpg';
import image3 from '../images/petsos.jpg';
import image4 from '../images/esrageziyor.jpg';
import image5 from '../images/davis.jpg';
import HomeHeader from "./HomeHeader";


export default function Home() {

    const navigation = useNavigation();


    const handleMenuNav =()=>{
        navigation.navigate('Menu');
    }

    const handleCartNav =()=>{
        navigation.navigate('Cart');
    }

    return (
        <View style={styles.container}>
            <HomeHeader />
            <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20 }}>
                <Text style={styles.text}>RESTAURANT APP</Text>

            </View>

            <View style={styles.slide1}>
                <Image
                    source={image1}
                    style={styles.image}
                />
            </View>

            <View style={styles.slide2}>

                <TouchableOpacity style={styles.button} onPress={handleMenuNav}>
                    <Text>Check Menus</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleCartNav}>
                    <Text>View Cart</Text>
                </TouchableOpacity>

            </View>
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
    image: {
        width: 300,
        height: 400,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    button: {
        width: 200,
        height: 30,
        backgroundColor: '#8a2be2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9OO6CB',
    },
    slide2: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9200O9',
        width: 200,
        height: 20,
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9200O9',
    },
    wrapper: {},
});

{/* <View style={{ flex: 4, justifyContent: 'center' }}>
                <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>

                    <View style={styles.slide1}>
                        <Image
                            source={image3}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image
                            source={image4}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slide3}>
                        <Image
                            source={image5}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slide1}>
                        <Image
                            source={image6}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image
                            source={image7}
                            style={styles.image}
                        />
                    </View>

                </Swiper>
            </View> */}