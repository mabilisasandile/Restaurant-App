import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, Modal, TextInput, Button
} from 'react-native';
import { collection, getDocs, where, query, db, doc, setDoc } from 'firebase/firestore';
import { auth } from '../config/firebase';
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

  const fetchedData = {};
  const user = auth.currentUser;
  const userID = user ? user.uid : null; // Ensure the user object is not null
  const nav = useNavigation();

  useEffect(() => {
    if (userID) {
      getUserData();
    }
  }, [userID, getUserData]);

  const getUserData = async () => {
    try {
      const querySnapshot = query(collection(db, 'users'), where('user_id', '==', userID));
      const data = await getDocs(querySnapshot);

      data.forEach((doc) => {
        fetchedData[doc.id] = doc.data();
      });

      setUserData(Object.values(fetchedData));
    } catch (error) {
      console.log('Failed to fetch user data', error);
      Alert.alert('Error', 'Failed to fetch user data!');
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
      {userData.length < 1 ? (
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '700' }}>Loading...</Text>
          <View style={{ paddingTop: 100, marginTop: 100 }}>
            <Text>Have you signed in? No.</Text>
            <TouchableOpacity style={styles.nav_link} onPress={handleSignIn}>
              <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center' }}>
                Then click here to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      ) : (

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 22, fontWeight: '700' }}>My Account</Text>
          {userData.map((user, index) => (
            <View key={index}>
              <Text style={styles.text}>First Name: {user.name},</Text>
              <Text style={styles.text}>Last Name: </Text>
              <Text>Phone: {user.phone}</Text>
              <Text>Email: {user.email}</Text>
              <Text>Address: {user.address}</Text>
              <Button
                title="Edit"
                onPress={() => {
                  setEditId(user.id);
                  setEditName(user.name);
                  setEditAddress(user.address);
                  setEditEmail(user.email);
                  setEditPhone(user.phone);
                  setEditCardType(user.cardType);
                  setEditCardNo(user.cardNo);
                  setEditMode(true);
                  setModalVisible(true);
                }}
              />
            </View>
          ))}

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
                  onChangeText={(text) => setEditName(text)}
                />
                <TextInput
                  placeholder="Phone"
                  value={editPhone}
                  onChangeText={(text) => setEditPhone(text)}
                />
                <TextInput
                  placeholder="Email"
                  value={editEmail}
                  onChangeText={(text) => setEditEmail(text)}
                />
                <TextInput
                  placeholder="Address"
                  value={editAddress}
                  onChangeText={(text) => setEditAddress(text)}
                />
                <TextInput
                  placeholder="Card Type"
                  value={editCardType}
                  onChangeText={(text) => setEditCardType(text)}
                />
                <TextInput
                  placeholder="Card Number"
                  value={editCardNo}
                  onChangeText={(text) => setEditCardNo(text)}
                />
                <Button title="Save" onPress={handleEdit} />
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
  }
});
