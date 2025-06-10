import {Platform, StatusBar} from 'react-native';

const fallbackHeaderHeight = 64;
export const StatusBarHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
export const headerHeight =
  Platform.OS === 'android' ? fallbackHeaderHeight + StatusBarHeight : 100;
