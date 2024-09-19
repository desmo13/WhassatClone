import { Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";

function RegisterScreen() {
    return (
        <SafeAreaView   style={styles.container}>
            
            <Text >Register Screen</Text>
            <TextInput placeholder="Email" style={styles.InputText} />
            <TextInput secureTextEntry placeholder="Password"  style={styles.InputText} />
            <TextInput secureTextEntry placeholder="Confirm Password" style={styles.InputText} />   
            <Button title="Register"  style={styles.Button} />
        </SafeAreaView>

    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        borderRadius: 5,
        padding: 5,
    },
});