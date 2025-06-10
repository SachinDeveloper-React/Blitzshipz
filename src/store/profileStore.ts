import {create} from 'zustand';

type Role = {
  id: string;
  name: 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN' | string;
};

type User = {
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
};

type useProfileDataState = {
  userProfileData: User | null;
  setUserProfileData: (data: User) => void;
  updateUserProfileData: (data: User) => void;
};

export const useProfileDataStore = create<useProfileDataState>(set => ({
  userProfileData: null,
  setUserProfileData: data => set({userProfileData: data}),
  updateUserProfileData: data => set({userProfileData: data}),
}));

type Address = {
  id: string;
  userId: string;
  name: string;
  address: string;
  pin: string;
  phone: string;
  altPhone: string;
  returnSame: boolean;
  city: string;
  state: string;
  email: string;
  primary: boolean;
  returnName: string | null;
  returnEmail: string | null;
  returnPhone: string | null;
  returnAltPhone: string | null;
  returnAddress: string;
  returnCity: string;
  returnState: string;
  returnPin: string;
};

type useProfileAddressState = {
  addressData: Address[] | [];
  setAddressData: (address: Address[]) => void;
};

export const useProfileAddressDataStore = create<useProfileAddressState>(
  set => ({
    addressData: [],
    setAddressData: address => set({addressData: address}),
  }),
);

type BankAccount = {
  id: string;
  userId: string;
  accountNumber: string;
  ifscCode: string;
  beneficiaryName: string;
  bankName: string;
  branch: string;
  accountType: 'Savings' | 'Current'; // assuming only these two for now
  createDate: string;
  modifyDate: string;
  image: {
    fileName: string;
    data: {
      type: number;
      data: string; // base64-encoded image string
    };
  }[];
  verify: boolean;
};

type useProfileBankDetailState = {
  bankDetailData: BankAccount | null;
  setBankDetailData: (bankDetail: BankAccount) => void;
  setSingleValue: <K extends keyof BankAccount>(
    key: K,
    value: BankAccount[K],
  ) => void;
};

export const useProfileBankDetailDataStore = create<useProfileBankDetailState>(
  set => ({
    bankDetailData: null,
    setBankDetailData: bankDetail => set({bankDetailData: bankDetail}),
    setSingleValue: (key, value) =>
      set(state =>
        state.bankDetailData
          ? {
              bankDetailData: {
                ...state.bankDetailData,
                [key]: value,
              },
            }
          : {},
      ),
  }),
);

export type MyProduct = {
  id: string;
  categoryId: string;
  userId: string;
  categoryName: string;
  productName: string;
  productCode: string;
  productPrice: number;
  tax: number;
  totalPrice: number;
  weight: number;
  l: number;
  b: number;
  h: number;
  volume: number;
};

type userProfileMyProductDetailState = {
  myProduct: MyProduct[] | [];
  loading: boolean;
  refreshLoading: boolean;
  error: string;
  setMyProductDetailData: (myProduct: MyProduct[]) => void;
  setLoading: (loading: boolean) => void;
  setRefreshLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

export const useProfileMyProductDataStore =
  create<userProfileMyProductDetailState>(set => ({
    myProduct: [],
    loading: false,
    refreshLoading: false,
    error: '',
    setMyProductDetailData: myProduct => set({myProduct: myProduct}),
    setLoading: loading => set({loading: loading}),
    setRefreshLoading: loading => set({refreshLoading: loading}),
    setError: error => set({error}),
  }));
