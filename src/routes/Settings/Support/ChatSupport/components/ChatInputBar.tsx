import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomWaveform from '../../../../../components/CustomWaveform';

const ChatInputBar = ({
  input,
  setInput,
  handleSend,
  handleAttachment,
  recording,
  onStopRecord,
  amplitudeArray,
  scrollViewRef,
  keyboardHeight,
}: any) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: keyboardHeight,
        },
      ]}>
      {recording ? (
        <>
          <TouchableOpacity onPress={onStopRecord}>
            <Icon name="trash-can-outline" size={24} color="#555" />
          </TouchableOpacity>
          <ScrollView
            horizontal
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollViewRef?.current?.scrollToEnd({animated: true})
            }>
            <CustomWaveform amplitudes={amplitudeArray} />
          </ScrollView>
          <TouchableOpacity onPress={handleSend}>
            <Icon name="send" size={24} color="#007bff" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleAttachment}>
            <Icon name="attachment" size={24} color="#555" />
          </TouchableOpacity>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            style={styles.textInput}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity onPress={handleSend}>
            <Icon name="send" size={24} color="#007bff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ChatInputBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 14,
  },
});
