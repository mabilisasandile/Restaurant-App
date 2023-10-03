import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
// import * as Animatable from 'react-native-animatable';
import Swiper from "react-native-swiper";
import Menu from './Menu';
import Cart from './Cart';

import image1 from '../images/stickel.jpg';
import image2 from '../images/ash.jpg';
import image3 from '../images/petsos.jpg';
import image4 from '../images/esrageziyor.jpg';
import image5 from '../images/davis.jpg';
import HomeHeader from "./HomeHeader";
import { Icon } from "react-native-elements";


export default function Home() {

    const [delivery, setDelivery] = useState(true);
    const navigation = useNavigation();


    const handleMenuNav = () => {
        navigation.navigate('Menu');
    }

    const handleCartNav = () => {
        navigation.navigate('Cart');
    }

    return (
        <View style={styles.container}>
            <View style={{ alignContent:"flex-start", alignItems:"flex-start", paddingBottom:5 }}>
                <HomeHeader />
            </View>

            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}
            >
                <View>
                <View style={{ marginTop:10, flexDirection:'row', height:50, width:'100%', margin:20 }}>
                    <TouchableOpacity
                        onPress={() => { setDelivery(true) }}
                        style={{ ...styles.deliveryBtn, backgroundColor: delivery ? '#8a2be2' : '#808080' }}
                    >
                        <Text style={styles.deliveryText}>Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setDelivery(false) }}
                        style={{ ...styles.deliveryBtn, backgroundColor: delivery ? '#808080' : '#8a2be2' }}
                    >
                        <Text style={styles.deliveryText}>Pick Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#d3d3d3', width:300, borderRadius:20, marginBottom:20}}>
                    <View style={{flexDirection:'row', alignItems:'center', paddingLeft:20, paddingRight:20}}>
                        <Icon
                            type="material-community"
                            name="map-marker"
                            color={'gray'}
                            size={26}
                        />
                        <Text>44 Marritz Street</Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingLeft:20, width:100, backgroundColor:'white', borderRadius:20}}>
                        <Icon
                            type="material-community"
                            name="clock-time-four"
                            color={'gray'}
                            size={26}
                        />
                        <Text>Now</Text>
                    </View>
                </View>


                </View>
                
                
                <Swiper containerStyle={styles.wrapper}
                    showsButtons={true}
                    autoplay={true}
                    height={300}>

                    <View style={styles.slide1}>
                        <Image
                            source={image4}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image
                            source={image5}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slide1}>
                        <Image
                            source={image1}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image
                            source={image2}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.slide1}>
                        <Image
                            source={image3}
                            style={styles.image}
                        />
                    </View>

                </Swiper>

                <View style={styles.slide2}>
                    <TouchableOpacity style={styles.button} onPress={handleMenuNav}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Check Menus</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleCartNav}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>View Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


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
        width: 340,
        height: 300,
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
    deliveryBtn: {
        paddingHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 5,
        marginBottom: 15,
        width: 100,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
    },
    deliveryText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#FFFFFF',
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
        height: 300,
    },
    slide2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9200O9',
        height: 300,
    },
    wrapper: {
        height: 300,
    },
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