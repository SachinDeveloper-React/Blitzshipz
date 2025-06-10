import {Alert, Platform, ToastAndroid} from 'react-native';

export const showToast = (message: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.BOTTOM);
  } else {
    Alert.alert(message);
  }
};
