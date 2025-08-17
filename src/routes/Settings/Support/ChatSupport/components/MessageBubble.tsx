import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ChatMessage} from '../../../../../services/chatService/useChatSupportService';
import Video from 'react-native-video';
import {theme} from '../../../../../utils';
const MessageBubble = ({item}: {item: ChatMessage}) => {
  const isUser = item.userResponse;
  return (
    <View
      style={[styles.messageContainer, isUser ? styles.user : styles.support]}>
      {item.attachment && (
        <>
          {item.objectType === 'A' ? (
            <>
              <Video
                source={{uri: item.attachment}}
                style={{width: '100%', aspectRatio: 16 / 9}}
                controls
              />
            </>
          ) : (
            <>
              <Image
                source={{uri: item.attachment}}
                style={styles.attachment}
                resizeMode="contain"
              />
            </>
          )}
        </>
      )}
      <Text
        style={[
          styles.message,
          {
            color: !isUser ? '#fff' : '#000',
          },
        ]}>
        {item.response}
      </Text>
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
    backgroundColor: theme.color.primary,
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
