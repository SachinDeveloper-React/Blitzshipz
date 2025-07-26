import {useEffect} from 'react';
import {navigationRef} from '../navigation';

const allowedScreens = [
  'CreateOrderScreen',
  'DropingDetailsScreen',
  'ProductDetailsScreen',
];

export const NavigationWatcher = () => {
  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', () => {
      const route = navigationRef.getCurrentRoute();
      const currentScreen = route?.name;

      if (!allowedScreens.includes(currentScreen || '')) {
        // useCreateOrderStore.getState().resetOrder();
      }
    });

    return unsubscribe;
  }, []);

  return null;
};
