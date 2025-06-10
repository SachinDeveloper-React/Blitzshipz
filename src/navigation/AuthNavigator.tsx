import {StyleSheet} from 'react-native';
import React from 'react';
import {AuthStackParamList} from './types';
import LazyComponent from './LazyComponent';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignupScreen} from '../routes';

type Props = {};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthNavigator = (props: Props) => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <AuthStack.Screen
        name="OnBoarding"
        component={LazyComponent(
          () => import('../routes/Auth/Onboarding/OnboardingScreen'),
        )}
      />
      <AuthStack.Screen
        name="Login"
        // component={LazyComponent(
        //   () => import('../routes/Auth/Login/LoginScreen'),
        // )}
        component={LoginScreen}
      />
      <AuthStack.Screen
        name="Signup"
        // component={LazyComponent(
        //   () => import('../routes/Auth/Signup/SignupScreen'),
        // )}
        component={SignupScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
