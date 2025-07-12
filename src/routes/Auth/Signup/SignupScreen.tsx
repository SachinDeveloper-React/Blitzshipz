import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {
  CustomButton,
  CustomIcons,
  CustomText,
  CustomTextInput,
} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthService} from '../../../services';
import {styles} from './styles';
import {goBack} from '../../../navigation';

const SignupScreen = () => {
  const {
    emailPattern,
    alphabetPattern,
    numberPattern,
    signupTitle,
    setSignupState,
    signupState,
    setIsSecure,
    isSecure,
    errors,
    userSignUp,
    signUpServerError,
    loading,
  } = useAuthService();
  const {width, height} = useWindowDimensions();
  const lastNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={styles.container}>
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

                <View style={styles.formContainer}>
                  <CustomText variant="title">{signupTitle}</CustomText>

                  <CustomTextInput
                    label="First Name"
                    value={signupState.firstName}
                    leftIcon={
                      <CustomIcons
                        type="Feather"
                        name="user"
                        size={20}
                        color="gray"
                      />
                    }
                    onChangeText={text =>
                      setSignupState(prev => ({
                        ...prev,
                        firstName: text,
                      }))
                    }
                    keyboardType="default"
                    inputMode="text"
                    autoCapitalize="words"
                    textContentType="givenName"
                    placeholder="Enter your First Name"
                    placeholderTextColor="#ccc"
                    rightIcon={
                      signupState.firstName ? (
                        <CustomIcons
                          type="Ionicons"
                          name="close-circle"
                          size={20}
                          color="gray"
                        />
                      ) : null
                    }
                    onRightIconPress={() =>
                      setSignupState(prev => ({
                        ...prev,
                        firstName: '',
                      }))
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      if (lastNameRef?.current) {
                        lastNameRef.current?.focus();
                      }
                    }}
                    errorMessage={errors.firstName}
                  />

                  <CustomTextInput
                    ref={lastNameRef}
                    label="Last Name"
                    value={signupState.lastName}
                    leftIcon={
                      <CustomIcons
                        type="Feather"
                        name="user"
                        size={20}
                        color="gray"
                      />
                    }
                    onChangeText={text =>
                      setSignupState(prev => ({
                        ...prev,
                        lastName: text,
                      }))
                    }
                    keyboardType="default"
                    inputMode="text"
                    autoCapitalize="words"
                    textContentType="familyName"
                    placeholder="Enter your Last Name"
                    placeholderTextColor="#ccc"
                    rightIcon={
                      signupState.lastName ? (
                        <CustomIcons
                          type="Ionicons"
                          name="close-circle"
                          size={20}
                          color="gray"
                        />
                      ) : null
                    }
                    onRightIconPress={() =>
                      setSignupState(prev => ({
                        ...prev,
                        lastName: '',
                      }))
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => phoneRef.current?.focus()}
                    errorMessage={errors.lastName}
                  />

                  <CustomTextInput
                    ref={phoneRef}
                    label="Phone Number"
                    value={signupState.phoneNumber}
                    onChangeText={text =>
                      setSignupState(prev => ({
                        ...prev,
                        phoneNumber: text,
                      }))
                    }
                    keyboardType="phone-pad"
                    inputMode="tel"
                    textContentType="telephoneNumber"
                    autoCapitalize="none"
                    maxLength={15}
                    placeholder="Enter your Phone Number"
                    placeholderTextColor="#ccc"
                    rightIcon={
                      signupState.phoneNumber ? (
                        <CustomIcons
                          type="Ionicons"
                          name="close-circle"
                          size={20}
                          color="gray"
                        />
                      ) : null
                    }
                    onRightIconPress={() =>
                      setSignupState(prev => ({
                        ...prev,
                        phoneNumber: '',
                      }))
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                    errorMessage={errors.phoneNumber}
                  />

                  <CustomTextInput
                    ref={emailRef}
                    label="Email"
                    value={signupState.email}
                    leftIcon={
                      <CustomIcons
                        type="Feather"
                        name="mail"
                        size={20}
                        color="gray"
                      />
                    }
                    onChangeText={text =>
                      setSignupState(prev => ({
                        ...prev,
                        email: text,
                      }))
                    }
                    keyboardType="email-address"
                    inputMode="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                    placeholder="Enter your email"
                    placeholderTextColor="#ccc"
                    rightIcon={
                      signupState.email ? (
                        <CustomIcons
                          type="Ionicons"
                          name="close-circle"
                          size={20}
                          color="gray"
                        />
                      ) : null
                    }
                    onRightIconPress={() =>
                      setSignupState(prev => ({
                        ...prev,
                        email: '',
                      }))
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    errorMessage={errors.email}
                  />

                  <CustomTextInput
                    ref={passwordRef}
                    label="Password"
                    value={signupState.password}
                    leftIcon={
                      <CustomIcons
                        type="Feather"
                        name={!isSecure.signup ? 'lock' : 'unlock'}
                        size={20}
                        color="gray"
                      />
                    }
                    secureTextEntry={!isSecure.signup}
                    onChangeText={text =>
                      setSignupState(prev => ({
                        ...prev,
                        password: text,
                      }))
                    }
                    keyboardType="default"
                    inputMode="text"
                    textContentType="newPassword"
                    autoCapitalize="none"
                    placeholder="Enter your password"
                    placeholderTextColor="#ccc"
                    rightIcon={
                      <CustomIcons
                        type="Ionicons"
                        name={isSecure.signup ? 'eye-off' : 'eye'}
                        size={20}
                        color="gray"
                      />
                    }
                    onRightIconPress={() =>
                      setIsSecure(prev => ({...prev, signup: !prev.signup}))
                    }
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    errorMessage={errors.password}
                  />

                  <CustomTextInput
                    ref={confirmPasswordRef}
                    label="Confirm Password"
                    value={signupState.confirmPassword}
                    leftIcon={
                      <CustomIcons
                        type="Feather"
                        name={!isSecure.confirmSignup ? 'lock' : 'unlock'}
                        size={20}
                        color="gray"
                      />
                    }
                    secureTextEntry={!isSecure.confirmSignup}
                    onChangeText={text =>
                      setSignupState(prev => ({
                        ...prev,
                        confirmPassword: text,
                      }))
                    }
                    keyboardType="default"
                    inputMode="text"
                    textContentType="password"
                    autoCapitalize="none"
                    placeholder="Confirm your password"
                    placeholderTextColor="#ccc"
                    rightIcon={
                      <CustomIcons
                        type="Ionicons"
                        name={isSecure.confirmSignup ? 'eye-off' : 'eye'}
                        size={20}
                        color="gray"
                      />
                    }
                    onRightIconPress={() =>
                      setIsSecure(prev => ({
                        ...prev,
                        confirmSignup: !prev.confirmSignup,
                      }))
                    }
                    returnKeyType="done"
                    errorMessage={errors.confirmPassword}
                    onSubmitEditing={userSignUp}
                  />

                  {signUpServerError && (
                    <CustomText variant="caption" style={{color: 'red'}}>
                      {signUpServerError}
                    </CustomText>
                  )}

                  <CustomButton
                    variant="primary"
                    title={'Continue'}
                    loading={loading.signup}
                    disabled={loading.signup}
                    onPress={userSignUp}
                  />

                  <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <CustomText variant="body" style={{paddingHorizontal: 10}}>
                      OR
                    </CustomText>
                    <View style={styles.line} />
                  </View>

                  <CustomText
                    variant="body"
                    style={{paddingHorizontal: 10, alignSelf: 'center'}}>
                    Already have an account?{' '}
                    <CustomText
                      variant="body"
                      style={{fontWeight: '600', color: 'blue'}}
                      onPress={() => goBack()}>
                      Login
                    </CustomText>
                  </CustomText>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
