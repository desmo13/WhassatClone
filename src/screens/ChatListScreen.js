import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";
function ChatListScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>ChatListScreen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ChatListScreen;