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
  Pressable,
} from 'react-native';

import {useChatSupportService} from '../../../../services';
import {MessageBubble, ChatInputBar, ImagePreview} from './components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {goBack, RootStackParamList} from '../../../../navigation';
import {StatusBarHeight} from '../../../../utils';
import {StatusBar} from 'react-native';
import {CustomIcons} from '../../../../components';
import {useHeaderHeight} from '@react-navigation/elements';
type Props = NativeStackScreenProps<RootStackParamList, 'ChatSupportScreen'>;

const ChatSupportScreen = ({navigation, route}: Props) => {
  const headerHeight = useHeaderHeight();
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);
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

  useEffect(() => {
    navigation.setOptions({
      // headerShown: true,
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
    });
  }, [navigation]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates?.height);
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', e => {
      setKeyboardHeight(e.endCoordinates?.height);
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar translucent={false} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: StatusBarHeight + 15,
            backgroundColor: '#fff',
            padding: 15,
            elevation: 2,
            shadowColor: '#ccc',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Pressable onPress={goBack} style={{width: 20}}>
              <CustomIcons
                name="arrowleft"
                type="AntDesign"
                size={20}
                color="#000"
              />
            </Pressable>
            <View>
              <Text style={styles.ticketId} numberOfLines={1}>
                {ticketId}
              </Text>
              {AWB_NO && (
                <Text style={styles.awb} numberOfLines={1}>
                  {AWB_NO}
                </Text>
              )}
            </View>
          </View>
          <View>
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
        </View> */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            keyExtractor={(item, i) => i.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <MessageBubble item={item} />}
            contentContainerStyle={{padding: 16, flexGrow: 1}}
            inverted
            keyboardShouldPersistTaps="handled"
          />
        </TouchableWithoutFeedback>

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
          keyboardHeight={Platform.OS === 'ios' ? 0 : keyboardHeight + 16 + 12}
        />
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
