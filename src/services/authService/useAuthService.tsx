import {useState} from 'react';
import {useAuthStore} from '../../store';
import {AuthApi} from '../../networking';
import * as Keychain from 'react-native-keychain';
import {signupSchema} from '../../validations';
import {goBack} from '../../navigation';
import {showToast} from '../../utils';

type AuthState = {
  email: string;
  isValidEmail: boolean;
  password: string;
  isValidPassword: boolean;
};
export type SignupState = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const useAuthService = () => {
  const {login, logout} = useAuthStore();
  const [state, setState] = useState<AuthState>({
    email: '',
    isValidEmail: false,
    password: '',
    isValidPassword: false,
  });
  const [loginErrorState, setLoginErrorState] = useState<AuthState>({
    email: '',
    isValidEmail: false,
    password: '',
    isValidPassword: false,
  });
  const [signupState, setSignupState] = useState<SignupState>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupState, string>>
  >({});
  const [signUpServerError, setSignUpServerError] = useState('');

  const [isSecure, setIsSecure] = useState<{
    login: boolean;
    signup: boolean;
    confirmSignup: boolean;
  }>({
    login: false,
    confirmSignup: false,
    signup: false,
  });

  const [loading, setLoading] = useState({
    login: false,
    signup: false,
  });

  const title: string = 'Welcome to Blitzshipz!';
  const signupTitle: string = 'Signup with Blitzships!!';
  const emailPattern: RegExp =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const alphabetPattern = /^[A-Za-z]+$/;
  const numberPattern = /^[0-9]+$/;

  const userLogin = async () => {
    try {
      setLoading(prev => ({...prev, login: true}));
      const response = await AuthApi.login({
        email: state.email.toLowerCase(),
        password: state.password,
      });

      if (response.code !== 200 && response.error) {
        setLoginErrorState(prev => ({
          ...prev,
          email: 'Invalid Email',
          isValidEmail: true,
          password: 'Invalid Password',
          isValidPassword: true,
        }));
        return;
      }
      if (response.data.status !== 200) {
        setLoginErrorState(prev => ({
          ...prev,
          email: 'Invalid Email',
          isValidEmail: true,
          password: 'Invalid Password',
          isValidPassword: true,
        }));
        return;
      }

      const credentials = {
        accessToken: response?.data?.data?.token,
        refreshToken: response?.data?.data?.refreshToken,
      };

      await Keychain.setGenericPassword(
        `password`,
        JSON.stringify(credentials),
      );
      login(response.data.data);
    } catch (error) {
      setLoginErrorState(prev => ({
        ...prev,
        email: 'Invalid Email',
        isValidEmail: true,
        password: 'Invalid Password',
        isValidPassword: true,
      }));
    } finally {
      setLoading(prev => ({...prev, login: false}));
    }
  };

  const userSignUp = async () => {
    try {
      const {error} = signupSchema.validate(signupState, {abortEarly: false});

      console.log('error', error);
      if (error) {
        const formattedErrors: {[key: string]: string} = {};
        error.details.forEach(err => {
          const key = err.path[0] as string;
          formattedErrors[key] = err.message;
        });
        setErrors(formattedErrors);
        return;
      }

      setLoading(prev => ({...prev, signup: true}));
      const response = await AuthApi.register({
        email: signupState.email,
        mobileNumber: signupState.phoneNumber,
        password: signupState?.password,
        firstName: signupState.firstName,
        lastName: signupState.lastName,
        roles: ['admin'],
      });

      console.log('response', response);
      if (response.code === 200) {
        if (response.data.statusCode === 200) {
          goBack();
          showToast(response.data.message);
        } else {
          setSignUpServerError(
            response?.data?.message || response.data || 'Unexpected Error',
          );
        }
      } else {
        setSignUpServerError(
          response?.data?.message || response.data || 'Unexpected Error',
        );
      }
    } catch (error: any) {
      setSignUpServerError(error?.message || 'Unexpected Error');
    } finally {
      setLoading(prev => ({...prev, signup: false}));
    }
  };

  return {
    state,
    setState,
    isSecure,
    setIsSecure,
    title,
    emailPattern,
    alphabetPattern,
    numberPattern,
    userLogin,
    userSignUp,
    logout,
    signupTitle,
    signupState,
    setSignupState,
    loginErrorState,
    loading,
    errors,
    signUpServerError,
  };
};

export default useAuthService;
