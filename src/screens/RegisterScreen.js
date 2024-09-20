import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../components/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [toastOpacity] = useState(new Animated.Value(0));

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setIsRegistered(true);
        setError('');
        showToast();
      } catch (error) {
        console.log(error);
        setError('Error al crear el usuario');
      }
    }
  };

  const showToast = () => {
    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setIsRegistered(false));
  };

  useEffect(() => {
    if (isRegistered) {
      showToast();
    }
  }, [isRegistered]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
        <Text style={styles.toastText}>¡Usuario creado con éxito!</Text>
      </Animated.View>

      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />
      <TextInput
        secureTextEntry
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />
      <TextInput
        secureTextEntry
        placeholder="Confirmar Contraseña"
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  toast: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    backgroundColor: '#128C7E',
    padding: 10,
    borderRadius: 5,
    zIndex: 1000,
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});