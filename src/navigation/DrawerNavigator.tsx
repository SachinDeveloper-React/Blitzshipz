import {createDrawerNavigator} from '@react-navigation/drawer';
import {TabNavigator} from './tabs';
import {DrawerStackParamList} from './types';
import {CodScreen, FaqScreen, SettingScreen, SupportScreen} from '../routes';
import {
  BookmyOrderScreen,
  RateCalculatorScreen,
  WeightDiscrepancyScreen,
} from '../routes';
import {Image} from 'react-native';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
      }}>
      <Drawer.Screen
        name="Home"
        options={({route}) => ({
          headerShown: false,
          swipeEnabled: true,
          drawerLabel: 'Dashboard',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/icons/layout.png')}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          ),
        })}
        component={TabNavigator}
      />
      <Drawer.Screen
        name="BookmyOrderScreen"
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'Book My Order',
          drawerLabel: 'Book My Order',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/icons/createOrder.png')}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          ),
        })}
        component={BookmyOrderScreen}
      />
      <Drawer.Screen
        name="CodScreen"
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'COD',
          drawerLabel: 'COD',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/icons/cod.webp')}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          ),
        })}
        component={CodScreen}
      />
      <Drawer.Screen
        name="WeightDiscrepancyScreen"
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'Weight Discrepancy',
          drawerLabel: 'Weight Discrepancy',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/icons/weight.png')}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          ),
        })}
        component={WeightDiscrepancyScreen}
      />
      <Drawer.Screen
        name="RateCalculatorScreen"
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'Rate Calculator',
          drawerLabel: 'Rate Calculator',

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/icons/calculator.png')}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          ),
        })}
        component={RateCalculatorScreen}
      />

      <Drawer.Screen
        name="FaqScreen"
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'FAQ',
          drawerLabel: 'FAQ',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/icons/faq.png')}
              // source={{
              //   uri: 'https://img.icons8.com/ios-glyphs/30/settings--v1.png',
              // }}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          ),
        })}
        component={FaqScreen}
      />
      <Drawer.Screen
        name="SupportScreen"
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'Support',
          drawerLabel: 'Support',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/icons/support.png')}
              // source={{
              //   uri: 'https://img.icons8.com/ios-glyphs/30/settings--v1.png',
              // }}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          ),
        })}
        component={SupportScreen}
      />

      <Drawer.Screen
        name="Setting"
        options={({route}) => ({
          headerShown: true,
          headerTitle: 'Settings',
          drawerLabel: 'Settings',
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../assets/icons/settings.png')}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
              }}
            />
          ),
        })}
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
