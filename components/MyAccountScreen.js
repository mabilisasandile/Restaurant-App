import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, Modal, TextInput, Button
} from 'react-native';
import { collection, getDocs, getDoc, where, query, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

export default function MyAccountScreen() {

  const [userData, setUserData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editCardType, setEditCardType] = useState('');
  const [editCardNo, setEditCardNo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  let fetchedData = {};
  const user = auth.currentUser;
  const userID = user ? user.uid : null; // Ensure the user object is not null
  const email = user.email;
  const nav = useNavigation();

  useEffect(() => {
    if (userID) {
      console.log("UserID:", userID);
      console.log("User Email:", email);
      getUserData();
    }
  }, [userID, getUserData]);

  const getUserData = async () => {
    try {
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = docSnap.data();
        setUserData(user);
        console.log("User data:", docSnap.data());
      } else {
        Alert.alert('Error', 'User data not found.');
      }
      // const user = docSnap.data();
      // setUserData(user);
      // console.log("User data:", docSnap.data());

    } catch (error) {
      console.log('Failed to fetch user data', error);
      Alert.alert('Error', 'Unable to fetch account information!');
    }
  };

  const handleEdit = async () => {
    try {
      if (!editName || !editAddress || !editPhone || !editCardType || !editCardNo) {
        return Alert.alert('Warning', 'All fields are required!');
      }

      const userInfo = {
        name: editName,
        address: editAddress,
        email: editEmail,
        phone: editPhone,
        cardType: editCardType,
        cardNo: editCardNo,
      };

      await setDoc(doc(db, 'users', editId), userInfo);

      // Success message popup
      Alert.alert('Success', 'Information updated.');
      setModalVisible(false);
      setEditMode(false);
      getUserData(); // Refresh user data after update
    } catch (error) {
      console.log('Failed to update: ', error);
      Alert.alert('Error', 'Failed to update information!');
    }
  };

  const handleSignIn = () => {
    nav.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      {user.length < 1 ? (
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ paddingTop: 100, marginTop: 100 }}>
            <Text>Looks like you did not sign in.</Text>
            <TouchableOpacity style={styles.nav_link} onPress={handleSignIn}>
              <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>
                Click here to Sign In!
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      ) : (

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View>
            {userData ? (
              <View>
                <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center' }}>My Account</Text>
                <Text style={styles.text}>Full Details </Text>
                <Text>{userData.name} {userData.surname}</Text>
                <Text>Phone: {userData.phone}</Text>
                <Text>Email: {userData.email}</Text>
                <Text>Address: {userData.address}</Text>
                <Text></Text>
                <Button
                  title="Edit"
                  onPress={() => {
                    setEditId(userData.user_id);
                    setEditName(userData.name);
                    setEditAddress(userData.address);
                    setEditEmail(userData.email);
                    setEditPhone(userData.phone);
                    setEditCardType(userData.cardType);
                    setEditCardNo(userData.cardNo);
                    setEditMode(true);
                    setModalVisible(true);
                  }}
                />
              </View>
            ) : (
              <View>
                <Text style={{ fontSize: 24, fontWeight: '400', textAlign: 'center' }}>Loading...</Text>
              </View>
            )}
          </View>


          {/* Edit Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>Edit Details</Text>
                <TextInput
                  placeholder="Name"
                  value={editName}
                  style={styles.inputs}
                  onChangeText={(text) => setEditName(text)}
                />
                <TextInput
                  placeholder="Phone"
                  value={editPhone}
                  style={styles.inputs}
                  onChangeText={(text) => setEditPhone(text)}
                />
                <TextInput
                  placeholder="Email"
                  value={editEmail}
                  style={styles.inputs}
                  onChangeText={(text) => setEditEmail(text)}
                />
                <TextInput
                  placeholder="Address"
                  value={editAddress}
                  style={styles.inputs}
                  onChangeText={(text) => setEditAddress(text)}
                />
                <TextInput
                  placeholder="Card Type"
                  value={editCardType}
                  style={styles.inputs}
                  onChangeText={(text) => setEditCardType(text)}
                />
                <TextInput
                  placeholder="Card Number"
                  value={editCardNo}
                  style={styles.inputs}
                  onChangeText={(text) => setEditCardNo(text)}
                />
                <View style={{ marginBottom: 20 }}>
                  <Button title="Save" onPress={handleEdit} />
                </View>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
      )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  card: {
    borderBlockColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    margin: 20,
    width: 320,
    height: 350,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8a2be2',
    padding: 10,
    marginLeft: 20,
    marginTop: 5,
    borderRadius: 10,
    width: 300,
    marginBottom: 5,
  },
  nav_link: {
    backgroundColor: '#87ceeb',
    paddingHorizontal: 5,
    width: 200,
    color: 'blue',
    fontSize: 18,
    fontWeight: 'bold',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    textDecorationLine: 'underline',
    textDecorationColor: 'navy',
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
});
