import {create} from 'zustand';
import {
  CreateOrderState,
  CreateOrderStore,
  SellerStore,
  WarehouseStore,
} from '../types';

export const initialOrderState: CreateOrderState = {
  warehouseName: '',
  pickupName: '',
  pickupEmail: '',
  pickupMobile: '',
  pickupAlternative_mobile: '',
  pickupPincode: '',
  pickupCity: '',
  pickupState: '',
  pickupAddress: '',
  pickupLandmark: '',
  sameReturnOrder: '',
  returnName: '',
  returnEmail: '',
  returnMobile: '',
  returnAlternative_mobile: '',
  returnPincode: '',
  returnCity: '',
  returnState: '',
  returnAddress: '',
  returnLandmark: '',
  sellerName: '',
  sellerAddress: '',
  dropName: '',
  dropAddress: '',
  dropCity: '',
  dropState: '',
  dropEmail: '',
  dropMobile: '',
  dropAlternative_mobile: '',
  dropPincode: '',
  dropLandmark: '',
  referenceNumber: '',
  totalTaxes: '',
  totalAmount: '',
  fragile: false,
  l: '',
  b: '',
  h: '',
  paymentMode: 'COD',
  productCategory: '',
  productName: '',
  productPrice: '',
  productQuantity: 1,
  volumentricWeight: '',
  actualWeight: '',
  invoiceDate: '',
};

export const useCreateOrderStore = create<CreateOrderStore>(set => ({
  state: {...initialOrderState},
  errors: {},
  setOrderField: (key, value) =>
    set(store => ({
      state: {
        ...store.state,
        [key]: value,
      },
    })),
  setError: (field, message) =>
    set(state => ({
      ...state,
      errors: {
        ...state.errors,
        [field]: message,
      },
    })),

  clearErrors: () =>
    set(state => ({
      ...state,
      errors: {},
    })),

  resetOrder: () => set(() => ({state: initialOrderState})),

  fillFromState: data =>
    set(state => ({
      ...state,
      ...data,
    })),
}));

export const useWarehouseStore = create<WarehouseStore>((set, get) => ({
  warehouses: [],

  setWarehouses: data => set({warehouses: data}),

  getPrimaryWarehouse: () => {
    const {warehouses} = get();
    return warehouses.find(w => w.primary);
  },

  getWarehouseById: id => {
    const {warehouses} = get();
    return warehouses.find(w => w.id === id);
  },
}));

export const useSellerStore = create<SellerStore>((set, get) => ({
  sellers: [],
  sellerLoading: false,
  sellerError: '',
  setSellers: data => set({sellers: data}),
  setSellerLoading: loading => set({sellerLoading: loading}),
  setSellerError: error => set({sellerError: error}),
  getSellerById: id => {
    const {sellers} = get();
    return sellers.find(seller => seller.id === id);
  },
}));
