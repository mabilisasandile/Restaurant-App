import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet, View, Text, Image,
    TouchableOpacity, ScrollView, Animated, Alert
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
// import * as Animatable from 'react-native-animatable';
import Swiper from "react-native-swiper";
import Menu from './Menu';
import Cart from './Cart';
import image1 from '../images/burak-the-weekender.jpg';
import image2 from '../images/ash.jpg';
import image3 from '../images/mehmet-suat-gunerli.jpg';
import image4 from '../images/on-shot.jpg';
import image5 from '../images/davis.jpg';
import image6 from '../images/brett.jpg';
import HomeHeader from "./HomeHeader";
import { Icon } from "react-native-elements";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'; // Import Firebase Auth functions


export default function Home() {

    const starScale = useRef(new Animated.Value(0)).current;
    const [delivery, setDelivery] = useState(true);
    const navigation = useNavigation();
    const [user, setUser] = useState(null); // Store user information


    useEffect(() => {
        animateStars();
    }, []);


    useEffect(() => {
        // const auth = getAuth();

        // Check the user's authentication status
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });
    }, []);


    //Logout or Sign out
    const handleSignOut = () => {
        // const auth = getAuth();

        firebaseSignOut(auth)
            .then(() => {
                // Sign-out successful, redirect to the sign-in page or any other desired location
                navigation.navigate('Home');
            })
            .catch((error) => {
                // An error occurred during sign-out.
                console.error('Sign out error: ', error);
                Alert.alert("Error", "Something went wrong.", [{ text: "OK" }]);
            });
    };

    const animateStars = () => {
        Animated.loop(
            Animated.timing(starScale, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    };

    const handleMenuNav = () => {
        navigation.navigate('Menu');
    }

    const handleCartNav = () => {
        navigation.navigate('Cart');
    }

    const handleSignInNav = () => {
        navigation.navigate('SignIn');
    }

    const handleSignUpNav = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <View style={{ alignContent: "flex-start", alignItems: "flex-start", paddingBottom: 5 }}>
                <HomeHeader />
            </View>

            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}
            >
                <View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#d3d3d3', width: 300, borderRadius: 20, marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 20 }}>
                            <Icon
                                type="material-community"
                                name="map-marker"
                                color={'gray'}
                                size={26}
                            />
                            <Text>44 Marritz Street</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, width: 100, backgroundColor: 'white', borderRadius: 20 }}>
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
                            source={image6}
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
                    <View style={styles.slide2}>
                        <Image
                            source={image4}
                            style={styles.image}
                        />
                    </View>

                </Swiper>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <Animated.Text
                        style={[styles.stars, { transform: [{ scale: starScale }] }]}
                    >
                        ⭐⭐⭐⭐⭐
                    </Animated.Text>
                </View>

                <View style={styles.slide2}>
                    <TouchableOpacity style={styles.button} onPress={handleMenuNav}>
                        <Text style={styles.text1}>CHECK MENUS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleCartNav}>
                        <Text style={styles.text1}>VIEW CART</Text>
                    </TouchableOpacity>

                    {user ? (
                        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                            <Text style={styles.text1}>LOG OUT</Text>
                        </TouchableOpacity>
                    ) : (
                        <View>
                            <TouchableOpacity style={styles.button} onPress={handleSignInNav}>
                                <Text style={styles.text1}>LOGIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleSignUpNav}>
                                <Text style={styles.text1}>REGISTER</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            </ScrollView>
            {delivery &&
                <View style={styles.floatButton}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Map') }}>
                        <Icon
                            name="place"
                            type="material"
                            size={32}
                            color='blueviolet'
                        />
                        <Text style={{ color: 'grey' }}>Map</Text>
                    </TouchableOpacity>
                </View>
            }

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: c,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text1: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    image: {
        width: 340,
        height: 300,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    button: {
        width: 250,
        height: 40,
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
    stars: {
        fontSize: 20,
    },
    floatButton: {
        position: 'absolute',
        bottom: 10, right: 15,
        backgroundColor: 'white',
        elevation: 10,
        width: 60, height: 60,
        borderRadius: 30,
        alignItems: 'center'
    }
});

