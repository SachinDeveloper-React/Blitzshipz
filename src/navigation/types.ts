import {NavigatorScreenParams} from '@react-navigation/native';
import {OrderItem} from '../types';
import {MyProduct} from '../store/profileStore';

type Role = {
  id: string;
  name: 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | string;
};

export type AuthStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Signup: undefined;
};
export type DrawerStackParamList = {
  Home: NavigatorScreenParams<BottomTabParamList>;
  CodScreen: undefined;
  WeightDiscrepancyScreen: undefined;
  RateCalculatorScreen: undefined;
  Setting: undefined;
  BookmyOrderScreen: undefined;
  FaqScreen: undefined;
  SupportScreen: undefined;
};

export type BottomTabParamList = {
  Dashboard: undefined;
  TrackOrderScreen: undefined;
  Profile: undefined;
  CreateOrderScreen: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Drawer: NavigatorScreenParams<DrawerStackParamList>;
  Bottom: NavigatorScreenParams<BottomTabParamList>;
  ShipmentTracking: undefined;
  ProductTracking: {
    id: string;
    wayBill: string;
  };
  SupportScreen: undefined;
  ChatSupportScreen: {
    ticketId: string;
    AWB_NO: string;
    status: string;
    category_SubCategory: string;
    id: string;
  };
  InvoiceScreen: undefined;
  FaqScreen: undefined;
  ProfileOtherDetailsScreen: undefined;
  BankingDetailsScreen: undefined;
  MyDocumentsScreen: undefined;
  RemittanceScreen: {
    list: {
      id: string;
      userId: string;
      userRef: string;
      vendorCode: string;
      orderId: string;
      orderRef: string;
      deliveredDate: string;
      amount: number;
      remittanceDate: string;
      status: string;
      createDate: string;
      modifyDate: string;
    }[];
  };
  BalanceScreen: undefined;
  MyProductScreen: undefined;
  WarehouseScreen: {
    type: 'add' | 'edit';
    defaultData?: {
      name: string;
      email: string;
      address: string;
      pin: string;
      phone: string;
      altPhone: string;
      city: string;
      state: string;
      returnAddress: string;
      returnCity: string;
      returnState: string;
      returnPin: string;
      returnSame: boolean;
      primary: boolean;
    };
  };
  EditProfileScreen: {
    userData: {
      id: string;
      email: string;
      password: string;
      roles: Role[];
      firstName: string;
      lastName: string;
      mobileNumber: string;
      altMobileNumber: string;
      nameAsPerAadhaar: string | null;
      firmName: string | null;
      websiteUrl: string;
      companyName: string;
      createDate: string;
      modifyDate: string;
      verified: boolean;
      standard: 'SILVER' | 'GOLD' | 'PLATINUM' | string;
      popupVisible: boolean;
      userId: string;
      emailVerified: boolean;
    } | null;
  };
  RateScreen: {
    id: string;
  };
  OrderDetailsScreen: {
    orderDetailsData: OrderItem;
  };
  ProductFormScreen: {
    type: 'add' | 'edit';
    defaultData?: MyProduct;
  };
  ChangePasswordScreen: undefined;
  DropingDetailsScreen: undefined;
  ProductDetailsScreen: undefined;
  SellerScreen: undefined;
  EditOrderScreen: undefined;
};
