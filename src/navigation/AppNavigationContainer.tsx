import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import {navigationRef} from './NavigationService';

type Props = {};

const AppNavigationContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
