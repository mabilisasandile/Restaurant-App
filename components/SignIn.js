
import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Text, View, TextInput, Alert, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import image1 from '../images/ash.jpg';



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                navigation.navigate('Home')
            } else {
                console.log('User is signed out')
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
            setMessage("Successfully signed in");
            navigation.navigate("Home"); // Navigate to the AudioRecorder screen

        }).catch((error) => {

            // Handle signin error
            Alert.alert("Error", "Failed to sign in. Invalid Username/Password!", [{ text: "OK" }]);
            console.log(error);
            setErrorMessage("Error. Wrong username/password entered!")
        })

    })

    const handleLinkClick = () => {
        navigation.navigate('Register');
    };


    return (

        <View style={styles.container}>

            <Card style={styles.card}>
                <Card.Title title="Sign In Here" />
                <Card.Content>
                    <Image
                        source={image1}
                        style={styles.image}
                    />
                    <TextInput
                        placeholder="Username/Email"
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
                </Card.Content>

                <Card.Actions>
                    <Text style={{ color: 'green' }}>{message}</Text>
                    <Text style={{ color: 'red' }}>{errorMessage}</Text>
                    <TouchableOpacity onPress={handleSignin} style={styles.button}>
                        <Text>Sign In</Text>
                    </TouchableOpacity>
                </Card.Actions>

                <Card.Actions>
                    <TouchableOpacity style={styles.nav_link} onPress={handleLinkClick}>
                        <Text>No account? Sign Up Now </Text>
                    </TouchableOpacity>
                </Card.Actions>


                <Card.Actions>
                    <TouchableOpacity style={styles.nav_link} onPress={handleLinkClick}>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </Card.Actions>
            </Card>

        </View>

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
    card: {
        marginTop: 15,
        marginBottom: 15,
        height: 600,
        width: 300,
        backgroundColor: '#d8bfd8',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: '#9370db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 150,
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
        textDecorationColor: '#000000',
    },
    inputs: {
        width: 250,
        height: 30,
        backgroundColor: '#fffafa',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    labels: {
        color: "#FFFFFF",
    },
});

export default SignIn;