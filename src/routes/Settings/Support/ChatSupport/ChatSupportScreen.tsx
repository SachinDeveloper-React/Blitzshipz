import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Platform,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useChatSupportService} from '../../../../services';
import {MessageBubble, ChatInputBar, ImagePreview} from './components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../navigation';
type Props = NativeStackScreenProps<RootStackParamList, 'ChatSupportScreen'>;
const ChatSupportScreen = ({navigation, route}: Props) => {
  const {AWB_NO, category_SubCategory, status, ticketId, id} = route.params;
  const {
    messages,
    input,
    setInput,
    handleSend,
    onStartRecord,
    onStopRecord,
    recording,
    amplitudeArray,
    scrollViewRef,
    handleAttachment,
    loading,
    selectedImage,
    setSelectedImage,
  } = useChatSupportService({ticketID: id});
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'RESOLVED':
        return '#27ae60';
      case 'PENDING':
        return '#f39c12';
      case 'OPEN':
        return '#3498db';
      default:
        return '#7f8c8d';
    }
  };

  const headerHeight = useHeaderHeight();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={styles.ticketId} numberOfLines={1}>
            {ticketId}
          </Text>
          <Text style={styles.awb} numberOfLines={1}>
            {AWB_NO}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <Text numberOfLines={1} style={styles.category}>
            {category_SubCategory}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.status,
              {
                color: getStatusColor(status),
              },
            ]}>
            {status}
          </Text>
        </View>
      ),
      headerBackButtonDisplayMode: 'minimal',
      headerBackButtonMenuEnabled: true,
      headerTitleAlign: 'left',
    });
  }, [navigation]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={
          Platform.OS === 'ios'
            ? headerHeight
            : keyboardStatus
            ? headerHeight / 2
            : 0
        }>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            {loading ? (
              <ActivityIndicator size={'small'} style={{flex: 1}} />
            ) : (
              <FlatList
                data={messages}
                keyExtractor={(item, i) => i.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <MessageBubble item={item} />}
                contentContainerStyle={{padding: 16, flexGrow: 1}}
                inverted
                keyboardShouldPersistTaps="handled"
              />
            )}
            {selectedImage?.imageUri && (
              <ImagePreview
                imageUri={selectedImage.imageUri}
                onRemove={() =>
                  setSelectedImage({
                    imageUri: '',
                    imageData: {},
                  })
                }
              />
            )}

            <ChatInputBar
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleAttachment={handleAttachment}
              recording={recording}
              onStopRecord={onStopRecord}
              amplitudeArray={amplitudeArray}
              scrollViewRef={scrollViewRef}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatSupportScreen;

const styles = StyleSheet.create({
  ticketId: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  awb: {
    fontSize: 10,
    color: '#666',
  },
  category: {
    fontSize: 10,
    color: '#007bff',
  },
  status: {
    fontSize: 10,

    textAlign: 'right',
  },
});
