import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useProfileDocumentsService} from '../../../../services';
import {PANCardForm, GSTCardForm} from './components';
import {useHeaderHeight} from '@react-navigation/elements';
import {RefreshControl} from 'react-native';

type Props = {};

const MyDocumentsScreen = (props: Props) => {
  const headerHeight = useHeaderHeight();
  const {
    documents,
    getDocumentDetails,
    handleGstCardImage,
    handlePanCardImage,
    documentDetails,
    onChangehandle,
    uploadDocument,
    imageData,
    loading,
    onRefresh,
  } = useProfileDocumentsService();

  const [keyboardStatus, setKeyboardStatus] = useState(false);

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

  useEffect(() => {
    getDocumentDetails();
  }, []);

  if (loading.initial) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={
          Platform.OS === 'ios'
            ? headerHeight
            : keyboardStatus
            ? headerHeight
            : 0
        }>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                refreshing={loading.refreshLoading}
                onRefresh={onRefresh}
              />
            }>
            <View style={{flexDirection: 'column', gap: 10}}>
              <PANCardForm
                data={documents[0] ?? []}
                handleDocument={handlePanCardImage}
                documentDetails={documentDetails}
                onChangeHandle={(
                  type: 'name' | 'panNumber' | 'firmName' | 'gstin',
                  text: string,
                ) => onChangehandle(type, text)}
                handleSubmit={() => uploadDocument('pan')}
                loading={loading}
              />

              <GSTCardForm
                data={documents[1] ?? []}
                handleDocument={handleGstCardImage}
                documentDetails={documentDetails}
                onChangeHandle={(type: 'firmName' | 'gstin', text: string) =>
                  onChangehandle(type, text)
                }
                handleSubmit={() => uploadDocument('gst')}
                loading={loading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MyDocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
});
