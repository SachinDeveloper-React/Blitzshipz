import {useState} from 'react';
import {useAuthStore} from '../../store';
import {AuthApi} from '../../networking';
import * as Keychain from 'react-native-keychain';

type AuthState = {
  email: string;
  isValidEmail: boolean;
  password: string;
  isValidPassword: boolean;
};
export type SignupState = {
  firstName: string;
  isValidfirstName: boolean;
  lastName: string;
  isValidlastName: boolean;
  phoneNumber: string;
  isValidphoneNumber: boolean;
  email: string;
  isValidEmail: boolean;
  password: string;
  isValidPassword: boolean;
  confirmPassword: string;
  isValidconfirmPassword: boolean;
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
    isValidfirstName: false,
    lastName: '',
    isValidlastName: false,
    phoneNumber: '',
    isValidphoneNumber: false,
    email: '',
    isValidEmail: false,
    password: '',
    isValidPassword: true,
    confirmPassword: '',
    isValidconfirmPassword: true,
  });

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
  });

  const title: string = 'Welcome to\nBlitzships!';
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
    logout,
    signupTitle,
    signupState,
    setSignupState,
    loginErrorState,
    loading,
  };
};

export default useAuthService;
