import {StyleSheet} from 'react-native';
import React from 'react';
import {RootStackParamList} from './types';
import AuthNavigator from './AuthNavigator';
import {
  BalanceScreen,
  BankingDetailsScreen,
  ChangePasswordScreen,
  ChatSupportScreen,
  CreateOrderScreen,
  DropingDetailsScreen,
  EditOrderScreen,
  EditProfileScreen,
  FaqScreen,
  GetRatesScreen,
  InvoiceScreen,
  MyDocumentsScreen,
  MyProductScreen,
  OrderDetailsScreen,
  ProductDetailsScreen,
  ProductFormScreen,
  ProductTrackingScreen,
  ProfileOtherDetailsScreen,
  RateScreen,
  RemittanceScreen,
  SellerScreen,
  ShipmentTrackingScreen,
  SplashScreen,
  SupportScreen,
  WarehouseScreen,
} from '../routes';
import {useAuthStore} from '../store';
import DrawerNavigator from './DrawerNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {KeyboardProvider} from 'react-native-keyboard-controller';

type Props = {};
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AppNavigator = (props: Props) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
      {!isAuthenticated ? (
        <>
          <RootStack.Screen name="Auth" component={AuthNavigator} />
          <RootStack.Screen
            name="ShipmentTracking"
            component={ShipmentTrackingScreen}
          />
        </>
      ) : (
        <RootStack.Group>
          <RootStack.Screen name="Drawer" component={DrawerNavigator} />
          <RootStack.Screen
            name="EditOrderScreen"
            component={EditOrderScreen}
          />

          <RootStack.Screen
            name="ProductTracking"
            component={ProductTrackingScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Order Details',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="InvoiceScreen"
            component={InvoiceScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Invoice',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="FaqScreen"
            component={FaqScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Faq',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="SupportScreen"
            component={SupportScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Support',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="ChatSupportScreen"
            options={{
              headerShown: true,
              headerTitle: 'Chat Support',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
              headerTitleAlign: 'left',
            }}>
            {({navigation, route}) => (
              <KeyboardProvider
                navigationBarTranslucent={false}
                statusBarTranslucent={true}>
                <ChatSupportScreen navigation={navigation} route={route} />
              </KeyboardProvider>
            )}
          </RootStack.Screen>
          <RootStack.Screen
            name="ProfileOtherDetailsScreen"
            component={ProfileOtherDetailsScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Other Details',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="BankingDetailsScreen"
            component={BankingDetailsScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Bank Details',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="MyDocumentsScreen"
            component={MyDocumentsScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'My Document',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="RemittanceScreen"
            component={RemittanceScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Remittance',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="BalanceScreen"
            component={BalanceScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Balance',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="MyProductScreen"
            component={MyProductScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'My Product',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="WarehouseScreen"
            component={WarehouseScreen}
            initialParams={{
              type: 'add',
            }}
            options={() => ({
              headerShown: true,
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Edit Profile',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="RateScreen"
            component={RateScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Order Rates',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="OrderDetailsScreen"
            component={OrderDetailsScreen}
            options={() => ({
              headerShown: true,
              headerTitle: 'Order Details',
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="ProductFormScreen"
            component={ProductFormScreen}
            options={() => ({
              headerShown: true,
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={() => ({
              headerTitle: 'Change Password',
              headerShown: true,
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="DropingDetailsScreen"
            component={DropingDetailsScreen}
            options={() => ({
              headerTitle: 'Droping Details',
              headerShown: true,
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="ProductDetailsScreen"
            component={ProductDetailsScreen}
            options={() => ({
              headerTitle: 'Product Details',
              headerShown: true,
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="SellerScreen"
            component={SellerScreen}
            options={() => ({
              headerTitle: 'Create Seller',
              headerShown: true,
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
          <RootStack.Screen
            name="GetRatesScreen"
            component={GetRatesScreen}
            options={() => ({
              headerTitle: 'Rates',
              headerShown: true,
              headerBackButtonDisplayMode: 'minimal',
              headerBackButtonMenuEnabled: true,
            })}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
