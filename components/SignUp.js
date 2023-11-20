
import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
    Text, View, TextInput, Alert,
    ScrollView, StyleSheet, TouchableOpacity
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
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
    const [cardType, setCardType] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const options = [
        { label: 'Debit', value: 'Debit' },
        { label: 'Credit', value: 'Credit' },
        { label: 'Cheque', value: 'Cheque' },
    ];


    const handleSignup = (({ navigation }) => {
        createUserWithEmailAndPassword(auth, email, password).then(async () => {

            const user = auth.currentUser;
            const userId = user.uid;

            const docRef = await setDoc(doc(db, 'users', userId), {
                user_id: userId,
                name: name,
                surname: surname,
                phone: phone,
                address: address,
                email: email,
                cardType: cardType,
                cardNo: cardNo,
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
            Alert.alert("Error", "Something went wrong.")
            // setErrorMessage("An error occurred while registering!")

        })
    })


    const handleLinkClick = () => {
        navigation.navigate('SignIn');
    }


    return (

        <View style={styles.container}>

            <ScrollView
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ height: 70,display:'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 5, backgroundColor:'#d8bfd8' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#8a2be2', textAlign:'center' }}>Register</Text>
                    <Text style={{ color: '#8a2be2', textAlign:'center' }}>Create your account</Text>
                </View>

                <View>
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
                    <View>
                        <Text>Select Card Type:</Text>
                        <Picker
                            style={{ width: 250, backgroundColor: 'white', borderWidth: 2 }}
                            value={cardType}
                            onValueChange={(itemValue) => setCardType(itemValue)}
                        >
                            {options.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>
                    <TextInput
                        placeholder="Enter Card Number"
                        value={cardNo}
                        onChangeText={setCardNo}
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

                    <Text style={{ color: 'green' }}>{message}</Text>
                    <Text style={{ color: 'red' }}>{errorMessage}</Text>


                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={handleSignup} style={styles.button}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }}>REGISTER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.nav_link} onPress={handleLinkClick}>
                            <Text>Already have an account? Sign in </Text>
                        </TouchableOpacity>
                    </View>

                </View>


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
        backgroundColor: '#d8bfd8'
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
        backgroundColor: '#8a2be2',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        width: 250,
        shadowColor: 'black',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
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
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    labels: {
        color: "#FFFFFF",
    },
});

export default SignUp;