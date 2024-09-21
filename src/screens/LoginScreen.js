import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../components/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { set } from 'firebase/database'

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  set
    const handle = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
          setError('')
          navigation.navigate('ChatTabs')
        }).catch((error)=>{
          if (error.code === 'auth/wrong-password') {
            setError('Contraseña incorrecta')
            return
          }
          if (error.code === 'auth/user-not-found') {
            setError('Usuario no encontrado')
            return
          }
          if (error.code === 'auth/invalid-credential') {
            setError('Correo o contraseña incorrectos')
            return
          }
          
        })
        
    }
    const handleRegister = () => {
        navigation.navigate('Register')
    }
  return (
    <View style={styles.container}>
       {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={styles.title}>WhatsApp Clone</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
       
      <TouchableOpacity style={styles.button} onPress={handle}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#075E54',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#128C7E',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})