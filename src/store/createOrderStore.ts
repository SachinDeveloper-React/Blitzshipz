import {create} from 'zustand';
import {
  CreateOrderState,
  CreateOrderStore,
  SellerStore,
  WarehouseStore,
} from '../types';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandMMKVStorage} from './storage';

export const initialOrderState: CreateOrderState = {
  id: '',
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
  sellerName: '',
  sellerAddress: '',
  returnName: null,
  returnEmail: null,
  returnMobile: null,
  returnAlternative_mobile: null,
  returnPincode: '',
  returnCity: '',
  returnState: '',
  returnAddress: '',
  returnLandmark: '',
  dropName: '',
  dropEmail: '',
  dropMobile: '',
  dropAlternative_mobile: '',
  dropPincode: '',
  dropCity: '',
  dropState: '',
  dropAddress: '',
  dropLandmark: '',
  productName: '',
  productIds: [''],
  productCategory: '',
  productQuantity: 0,
  productPrice: 0,
  l: 0.0,
  b: 0.0,
  h: 0.0,
  fragile: true,
  invoiceDate: '',
  orderLive: false,
  paymentMode: 'COD',
  totalAmount: 0,
  totalTaxes: 0,
  actualWeight: 0.0,
  volumentricWeight: 0.0,
  weightCategory: '',
  orderId: '',
  createDate: '',
  modifyDate: '',
  userId: '',
  sameReturnOrder: false,
  zone: '',
  amount: 0.0,
  waybill: null,
  uploadWbn: null,
  orderResponseId: null,
  vendorCode: null,
  referenceNumber: '',
  orderLiveDate: null,
  nslCode: null,
  status: null,
  statusDateTime: null,
  statusType: null,
  statusLocation: null,
  instructions: null,
  rtoMarked: false,
  deliveryCount: 0,
  reverseMarked: false,
  channel: '',
  channelId: '',
};
// export const initialOrderState: CreateOrderState = {
//   warehouseName: '',
//   pickupName: '',
//   pickupEmail: '',
//   pickupMobile: '',
//   pickupAlternative_mobile: '',
//   pickupPincode: '',
//   pickupCity: '',
//   pickupState: '',
//   pickupAddress: '',
//   pickupLandmark: '',
//   sameReturnOrder: '',
//   returnName: '',
//   returnEmail: '',
//   returnMobile: '',
//   returnAlternative_mobile: '',
//   returnPincode: '',
//   returnCity: '',
//   returnState: '',
//   returnAddress: '',
//   returnLandmark: '',
//   sellerName: '',
//   sellerAddress: '',
//   dropName: '',
//   dropAddress: '',
//   dropCity: '',
//   dropState: '',
//   dropEmail: '',
//   dropMobile: '',
//   dropAlternative_mobile: '',
//   dropPincode: '',
//   dropLandmark: '',
//   referenceNumber: '',
//   totalTaxes: '',
//   totalAmount: '',
//   fragile: false,
//   l: '',
//   b: '',
//   h: '',
//   paymentMode: 'COD',
//   productCategory: '',
//   productName: '',
//   productPrice: '',
//   productQuantity: 1,
//   volumentricWeight: '',
//   actualWeight: '',
//   invoiceDate: '',
// };

export const useCreateOrderStore = create<CreateOrderStore>()(set => ({
  state: {...initialOrderState},
  errors: {},
  type: 'create',
  setType: type => set({type}),
  setOrderField: (key, value) =>
    set(store => ({
      state: {
        ...store.state,
        [key]: value,
      },
    })),

  setError: (field, message) =>
    set(state => ({
      errors: {
        ...state.errors,
        [field]: message,
      },
    })),

  clearErrors: () => set(() => ({errors: {}})),

  resetOrder: () => set(() => ({state: {...initialOrderState}})),

  fillFromState: data =>
    set(() => ({
      state: {
        ...initialOrderState,
        ...data,
      },
    })),
}));
// export const useCreateOrderStore = create<CreateOrderStore>()(
//   persist(
//     set => ({
//       state: {...initialOrderState},
//       errors: {},
//       type: 'create',
//       setType: type => set({type}),
//       setOrderField: (key, value) =>
//         set(store => ({
//           state: {
//             ...store.state,
//             [key]: value,
//           },
//         })),

//       setError: (field, message) =>
//         set(state => ({
//           errors: {
//             ...state.errors,
//             [field]: message,
//           },
//         })),

//       clearErrors: () => set(() => ({errors: {}})),

//       resetOrder: () => set(() => ({state: {...initialOrderState}})),

//       fillFromState: data =>
//         set(() => ({
//           state: {
//             ...initialOrderState,
//             ...data,
//           },
//         })),
//     }),
//     {
//       name: 'create-order-storage',
//       storage: createJSONStorage(() => zustandMMKVStorage),
//     },
//   ),
// );

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
