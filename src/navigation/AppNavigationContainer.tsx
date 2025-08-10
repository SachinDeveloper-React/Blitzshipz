import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import {navigationRef} from './NavigationService';
import {NavigationWatcher} from '../utils';
import {SplashScreen} from '../routes';

type Props = {};

const AppNavigationContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationWatcher />
      <SplashScreen />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
