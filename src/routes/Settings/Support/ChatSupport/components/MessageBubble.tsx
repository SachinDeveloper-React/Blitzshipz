import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ChatMessage} from '../../../../../services/chatService/useChatSupportService';

const MessageBubble = ({item}: {item: ChatMessage}) => {
  const isUser = item.userResponse;
  return (
    <View
      style={[styles.messageContainer, isUser ? styles.user : styles.support]}>
      {item.attachment && (
        <Image
          source={{uri: item.attachment}}
          style={styles.attachment}
          resizeMode="contain"
        />
      )}
      <Text style={styles.message}>{item.response}</Text>
    </View>
  );
};

export default MessageBubble;

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '75%',
  },
  user: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  support: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
  attachment: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
});
