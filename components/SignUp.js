
import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    Text, View, TextInput, Alert,
    ScrollView, StyleSheet, TouchableOpacity
} from "react-native";
import { addDoc, collection, doc } from "firebase/firestore";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import SignIn from "./SignIn";


const SignUp = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const handleSignup = (({ navigation }) => {
        createUserWithEmailAndPassword(auth, email, password).then(async () => {

            const user = auth.currentUser;
            const userId = user.uid;

            // const docRef = await addDoc(collection(db, 'users', userId), {
            const docRef = await addDoc(collection(db, 'users'), {
                user_id: user.uid,
                name: name,
                surname: surname,
                phone: phone,
                address: address,
                email: email,
            });

            console.log("New user:", docRef);

            // Handle successful signup
            Alert.alert("Success", "Signed Up Successfully.", [{ text: "OK" }]);
            console.log("Signed Up Successfully.");
            setMessage("Successfully registered");
            navigation.navigate('SignIn');

        }).catch((error) => {

            // Handle signup error
            console.log("Failed to register!", error);
            setErrorMessage("An error occurred while registering!")

        })
    })


    const handleLinkClick = () => {
        navigation.navigate('SignIn');
    }


    return (

        <View style={styles.container}>

            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={true}
            >
                <View style={{ height: 30, backgroundColor: '#8a2be2', alignItems: 'center', justifyContent: 'center', paddingTop: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>SIGN UP OR REGISTER HERE</Text>
                </View>
                <Card style={styles.card}>
                    <Card.Title title="Welcome!" subtitle="Fill the form to open an account!" />
                    <Card.Content>
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.inputs}
                        />
                        <TextInput
                            placeholder="Surname"
                            value={surname}
                            onChangeText={setSurname}
                            style={styles.inputs}
                        />
                        <TextInput
                            placeholder="Contact number"
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.inputs}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            placeholder="Address"
                            style={styles.inputs}
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                        />
                        <TextInput
                            placeholder="Email"
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
                        <TouchableOpacity onPress={handleSignup} style={styles.button}>
                            <Text>Register</Text>
                        </TouchableOpacity>
                    </Card.Actions>
                    <Card.Actions>
                        <TouchableOpacity style={styles.nav_link} onPress={handleLinkClick}>
                            <Text>Already have an account? Sign in </Text>
                        </TouchableOpacity>
                    </Card.Actions>
                </Card>
            </ScrollView>

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
    card: {
        marginTop: 15,
        marginBottom: 15,
        height: 800,
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
        color: 'black',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        color: "#FFFFFF",
    },
    button: {
        backgroundColor: '#9370db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 150,
        shadowColor: 'black',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
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
        marginTop: 10,
        marginBottom: 10,
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
        marginTop: 20,
        marginBottom: 20,
    },
    labels: {
        color: "#FFFFFF",
    },
});

export default SignUp;