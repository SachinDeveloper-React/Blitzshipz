import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import {navigationRef} from './NavigationService';
import {NavigationWatcher} from '../utils';

type Props = {};

const AppNavigationContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <NavigationWatcher />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
