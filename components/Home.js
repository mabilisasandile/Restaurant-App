import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { auth } from "../config/firebase";
import * as Animatable from 'react-native-animatable';
import Swiper from "react-native-swiper";

import image1 from '../images/restaurant_img.jpg';
import image2 from '../images/restaurant_img1.jpg';
import image3 from '../images/ash.jpg';
import image4 from '../images/petsos.jpg';
import image5 from '../images/esrageziyor.jpg';
import image6 from '../images/stickel.jpg';
import image7 from '../images/davis.jpg';


export default function Home() {

    return (
        <View>

            <View style={{flex:3, justifyContent:'flex-start', alignItems:'center', paddingTop:20}}>
                <Text style={styles.text}>RESTAURANT APP</Text>
                <Text>Check our today's menu by clicking the Menu icon below!</Text>
            </View>

            <View style={{ flex: 4, justifyContent: 'center' }}>
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
            </View>

            <View style={{flex:4}}>

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
        width: '100%',
        height: '100%',
        borderRadius: 20,
        resizeMode: 'cover',
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAF5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9200O9',
    },
    wrapper: {},
});
