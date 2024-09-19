import React from 'react';
import { Text, Button, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        console.log('Email: ' + email);
        console.log('Password: ' + password);
        navigation.navigate('ChatTabs');
    }
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center',gap:5 }}>
            <Text>Login Screen</Text>
            <TextInput
                style={styles.InputText}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.InputText}
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} style={styles.Button} />
            <Button title="Register" onPress={() => navigation.navigate('Register')}   style={styles.Button}  />
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({

    InputText: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    Button: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 20,
        marginTop: 100,
        marginBottom: 100,
        borderRadius: 5,
        padding: 0,
    },
});