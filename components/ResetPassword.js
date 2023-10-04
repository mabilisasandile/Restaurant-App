import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../config/firebase'; // Import your Firebase configuration
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setResetSent(true);
    } catch (error) {
      Alert.alert('Password Reset Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reset Password</Text>
      {resetSent ? (
        <Text style={{color:'green'}}>
          Password reset email sent. Please check your email to reset your
          password.
        </Text>
      ) : (
        <>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
        <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={!email}>
            <Text style={{color:'white'}}>Reset Password</Text>
        </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#d8bfd8',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
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
});

export default ResetPassword;
