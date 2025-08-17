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
} from 'react-native';

import {useChatSupportService} from '../../../../services';
import {MessageBubble, ChatInputBar, ImagePreview} from './components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {goBack, RootStackParamList} from '../../../../navigation';
import {StatusBar} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useGradualAnimation} from '../../../../utils';
type Props = NativeStackScreenProps<RootStackParamList, 'ChatSupportScreen'>;

const ChatSupportScreen = ({navigation, route}: Props) => {
  const {height} = useGradualAnimation();

  const fakeView = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
    };
  }, []);

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

  // useEffect(() => {
  //   navigation.setOptions({
  //     // headerShown: true,
  //     headerTitle: '',
  //     // headerLeft: () => (
  //     //   <View>
  //     //     <Text style={styles.ticketId} numberOfLines={1}>
  //     //       {ticketId}
  //     //     </Text>
  //     //     <Text style={styles.awb} numberOfLines={1}>
  //     //       {AWB_NO}
  //     //     </Text>
  //     //   </View>
  //     // ),
  //     headerRight: () => (
  //       <View style={{marginRight: 10}}>
  //         <Text numberOfLines={1} style={styles.category}>
  //           {category_SubCategory}
  //         </Text>
  //         <Text
  //           numberOfLines={1}
  //           style={[
  //             styles.status,
  //             {
  //               color: getStatusColor(status),
  //             },
  //           ]}>
  //           {status}
  //         </Text>
  //       </View>
  //     ),
  //   });
  // }, [navigation]);

  return (
    <View style={styles.container}>
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
      />
      <Animated.View style={fakeView} />
    </View>
  );
};

export default ChatSupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
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
