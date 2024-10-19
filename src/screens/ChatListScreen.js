import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import findUserEmail from '../components/findUserEmail';
import sendFriendRequest from '../components/sendFriendRequest';
import { auth } from '../components/firebaseConfig';
import listenForFriendRequests from '../components/listenFriendsRequest';

export default function ChatListScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const [chatData, setChatData] = useState([
    { id: '1', name: 'Juan Pérez', lastMessage: 'Hola, ¿cómo estás?' },
    { id: '2', name: 'María García', lastMessage: '¿Nos vemos mañana?' },
    { id: '3', name: 'Carlos López', lastMessage: 'Gracias por la información' },
  ]);

  const renderChatItem = ({ item }) => (
    
    <TouchableOpacity 
    onPress={() => navigation.navigate('ChatRoom', { item })}
    
    style={styles.chatItem}>
      
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleAddFriend = () => {
    if (friendEmail.trim() === '') {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return;
    }
    // Lógica para enviar la solicitud de amistad
    findUserEmail(friendEmail, (user) => {
      if (user) {
        const currentUser = auth.currentUser;
        sendFriendRequest(currentUser.uid, user, currentUser.email);
        Alert.alert('Éxito', 'Solicitud de amistad enviada');
      } else {
        Alert.alert('Error', 'Correo electrónico no válido');
      }
    });
    setModalVisible(false);
    setFriendEmail('');
  };

  // useEffect con lista de dependencias para evitar renders infinitos
  useEffect(() => {
    const unsubscribe = listenForFriendRequests(auth.currentUser.uid, (friendRequests) => {
      if (friendRequests) {

        // Actualiza el estado sin sobrescribir el anterior
        setChatData((prevChatData) => [...prevChatData, ...friendRequests]);
      }
    });
    return () => unsubscribe && unsubscribe(); // Cleanup de listener
  }, []); // Lista de dependencias vacía para ejecutar el efecto solo una vez

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Añadir amigo</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFriendEmail}
              value={friendEmail}
              placeholder="Correo electrónico del amigo"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonSend]} onPress={handleAddFriend}>
                <Text style={styles.buttonText}>Enviar solicitud</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#444',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#25D366',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: '#999',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#444',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: '#FF3B30',
  },
  buttonSend: {
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
