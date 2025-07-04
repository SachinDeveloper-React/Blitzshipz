import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {CustomButton, CustomIcons, CustomTextInput} from '../../../components';
import {useAuthStore} from '../../../store';
import {ProfileApi} from '../../../networking';
import {showToast} from '../../../utils';
import {goBack} from '../../../navigation';

type Props = {};

const ChangePasswordScreen = (props: Props) => {
  const {user} = useAuthStore();
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [isSecure, setIsSecure] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const updatePassword = async () => {
    try {
      const response = await ProfileApi.upadtePassword(
        state.oldPassword,
        state.newPassword,
        user?.id ?? '',
      );

      if (response?.code === 200) {
        const message =
          response?.data?.message || 'Something went wrong. Please try again.';
        showToast(message);
        goBack();
      } else {
        const message =
          response?.data?.message || 'Something went wrong. Please try again.';
        showToast(message);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to update password. Please check your connection and try again.';
      showToast(errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <CustomTextInput
            label="Old Password"
            value={state.oldPassword}
            autoCapitalize="none"
            leftIcon={
              <CustomIcons
                type="Feather"
                name={isSecure.oldPassword ? 'unlock' : 'lock'}
                size={20}
                color="gray"
              />
            }
            secureTextEntry={!isSecure.oldPassword}
            onChangeText={text =>
              setState(prev => ({
                ...prev,
                oldPassword: text,
              }))
            }
            inputMode="text"
            placeholder="Enter your old password"
            placeholderTextColor="#ccc"
            rightIcon={
              <CustomIcons
                type="Ionicons"
                name={isSecure.oldPassword ? 'eye-off' : 'eye'}
                size={20}
                color="gray"
              />
            }
            onRightIconPress={() =>
              setIsSecure(prev => ({...prev, oldPassword: !prev.oldPassword}))
            }
          />

          <CustomTextInput
            label="New Password"
            value={state.newPassword}
            autoCapitalize="none"
            leftIcon={
              <CustomIcons
                type="Feather"
                name={isSecure.newPassword ? 'unlock' : 'lock'}
                size={20}
                color="gray"
              />
            }
            secureTextEntry={!isSecure.newPassword}
            onChangeText={text =>
              setState(prev => ({
                ...prev,
                newPassword: text,
              }))
            }
            inputMode="text"
            placeholder="Enter your new password"
            placeholderTextColor="#ccc"
            rightIcon={
              <CustomIcons
                type="Ionicons"
                name={isSecure.newPassword ? 'eye-off' : 'eye'}
                size={20}
                color="gray"
              />
            }
            onRightIconPress={() =>
              setIsSecure(prev => ({
                ...prev,
                newPassword: !prev.newPassword,
              }))
            }
          />

          <CustomButton
            variant="secondary"
            title="Continue"
            disabled={
              !Boolean(state.oldPassword) || !Boolean(state.newPassword)
            }
            onPress={() => updatePassword()}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 20,
  },
});
