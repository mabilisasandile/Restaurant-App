
import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {
    Text, View, TextInput, Alert,
    ScrollView, Image, StyleSheet, TouchableOpacity
} from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import image1 from '../images/restaurant.jpg';



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('Home')
                setEmail('');
                setPassword('');
                setErrorMessage('');
            } else {
                console.log('User is signed out')
                setEmail('');
                setPassword('');
                setErrorMessage('');
            }
        })
        return unsubscribe
    }, [])


    useEffect(() => {
        const user = auth.currentUser;
        console.log("User logged in:", user);

    }, [])



    const handleSignin = (() => {
        signInWithEmailAndPassword(auth, email, password).then(() => {

            // Handle successful signin
            Alert.alert("Success", "Signed In Successfully.", [{ text: "OK" }]);
            console.log("Successfully signed in");
            navigation.navigate("Home");

        }).catch((error) => {

            // Handle signin error
            console.log(error);
            Alert.alert("Error", "Invalid Username or Password!", [{ text: "OK" }]);
            setErrorMessage("Error. Wrong username/password entered!")
        })

    })

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    const handleForgotPassword = () => {
        navigation.navigate('ResetPassword');
    }


    return (

        <View style={styles.container}>

            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#d8bfd8', width: 380, height: 600 }}>
                <View style={{ height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 25, marginBottom: 25 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#8a2be2' }}>Welcome Back</Text>
                    <Text style={{ color: '#8a2be2' }}>Login to your account</Text>
                </View>
                <TextInput
                    placeholder="Username"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputs}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.inputs}
                />

                <View style={{
                    flexDirection: 'row', alignContent: 'center', marginLeft: 150,
                    justifyContent: 'space-between', alignItems: 'center', height: 70
                }}>
                    <TouchableOpacity style={styles.nav_link} onPress={handleForgotPassword}>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Text style={{ color: 'red' }}>{errorMessage}</Text>
                    <TouchableOpacity onPress={handleSignin} style={styles.button}>
                        <Text style={{fontSize:18, fontWeight:'700', color:'white'}}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.nav_link} onPress={handleRegister}>
                        <Text>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 200,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ffffff',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        color: "#FFFFFF",
    },
    button: {
        backgroundColor: '#8a2be2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 250,
        height: 40,
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    nav_link: {
        paddingHorizontal: 5,
        width: 200,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        textDecorationLine: 'underline',
        // textDecorationColor: '#000000',
        textDecorationColor: 'black',
    },
    inputs: {
        width: 250,
        height: 45,
        backgroundColor: '#fffafa',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    labels: {
        color: "#FFFFFF",
    },
});

export default SignIn;