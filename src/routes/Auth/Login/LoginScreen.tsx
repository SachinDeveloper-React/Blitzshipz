import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {
  CustomButton,
  CustomIcons,
  CustomText,
  CustomTextInput,
} from '../../../components';
import {navigate} from '../../../navigation';
import {useAuthService} from '../../../services';

type Props = {};

const LoginScreen = (props: Props) => {
  const {
    emailPattern,
    isSecure,
    setIsSecure,
    setState,
    state,
    title,
    userLogin,
    loginErrorState,
    loading,
  } = useAuthService();

  const {width, height} = useWindowDimensions();

  return (
    <ImageBackground
      source={require('../../../assets/loginbg.webp')}
      resizeMode="cover"
      style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, padding: 24}}
            keyboardShouldPersistTaps="handled">
            <View style={{flex: 1, justifyContent: 'space-evenly', gap: 32}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                <Image
                  source={require('../../../assets/onBoarding/4.png')}
                  resizeMode="contain"
                  accessible
                  accessibilityLabel="App branding illustration"
                  style={{
                    width: width,
                    height: height * 0.3,
                    // aspectRatio: 1,
                    borderRadius: 16,
                    opacity: 0.97,
                  }}
                />
              </View>

              <View style={{gap: 30}}>
                <CustomText variant="title">{title}</CustomText>

                <CustomTextInput
                  label="Email"
                  error={loginErrorState.isValidEmail}
                  errorMessage={loginErrorState.email}
                  value={state.email}
                  autoCapitalize="none"
                  leftIcon={
                    <CustomIcons
                      type="Feather"
                      name="mail"
                      size={20}
                      color="gray"
                    />
                  }
                  onChangeText={text =>
                    setState(prev => ({
                      ...prev,
                      email: text,
                      isValidEmail: emailPattern.test(text),
                    }))
                  }
                  keyboardType="email-address"
                  inputMode="email"
                  placeholder="Enter your email"
                  placeholderTextColor="#ccc"
                  rightIcon={
                    state.email ? (
                      <CustomIcons
                        type="Ionicons"
                        name="close-circle"
                        size={20}
                        color="gray"
                      />
                    ) : null
                  }
                  onRightIconPress={() =>
                    setState(prev => ({
                      ...prev,
                      email: '',
                      isValidEmail: false,
                    }))
                  }
                />

                <CustomTextInput
                  label="Password"
                  value={state.password}
                  error={loginErrorState.isValidPassword}
                  errorMessage={loginErrorState.password}
                  autoCapitalize="none"
                  leftIcon={
                    <CustomIcons
                      type="Feather"
                      name={isSecure.login ? 'unlock' : 'lock'}
                      size={20}
                      color="gray"
                    />
                  }
                  secureTextEntry={!isSecure.login}
                  onChangeText={text =>
                    setState(prev => ({
                      ...prev,
                      password: text,
                      isValidPassword: text.length >= 6,
                    }))
                  }
                  inputMode="text"
                  placeholder="Enter your password"
                  placeholderTextColor="#ccc"
                  rightIcon={
                    <CustomIcons
                      type="Ionicons"
                      name={isSecure.login ? 'eye-off' : 'eye'}
                      size={20}
                      color="gray"
                    />
                  }
                  onRightIconPress={() =>
                    setIsSecure(prev => ({...prev, login: !prev.login}))
                  }
                  style={{
                    color: 'red',
                  }}
                />

                <CustomButton
                  variant="secondary"
                  title="Continue"
                  loading={loading.login}
                  disabled={
                    loading.login ||
                    !state.isValidEmail ||
                    !state.isValidPassword
                  }
                  onPress={userLogin}
                />
              </View>

              <View style={{alignItems: 'center'}}>
                <CustomText variant="body">
                  Don't have an account?{' '}
                  <CustomText
                    variant="body"
                    onPress={() =>
                      navigate('Auth', {
                        screen: 'Signup',
                      })
                    }
                    style={{fontWeight: '600', color: 'blue'}}>
                    Sign up
                  </CustomText>
                </CustomText>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
