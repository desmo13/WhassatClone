import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatRoomScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Room</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 16
  },
  title: {
    fontSize: 24, marginBottom: 24
  }
});

export default ChatRoomScreen;