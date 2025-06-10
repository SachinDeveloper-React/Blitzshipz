import {create} from 'zustand';

type OrderStatus = {
  id: string;
  orderId: string;
  orderRef: string;
  status: string;
  statusDateTime: string;
  statusType: string;
  statusLocation: string;
  instructions: string;
};

type TrackingData = {
  id: string;
  warehouseName: string;
  pickupName: string;
  pickupEmail: string;
  pickupMobile: string;
  pickupAlternative_mobile: string;
  pickupPincode: number;
  pickupCity: string;
  pickupState: string;
  pickupAddress: string;
  pickupLandmark: string;
  sellerName: string;
  sellerAddress: string;
  returnName: string;
  returnEmail: string;
  returnMobile: string;
  returnAlternative_mobile: string;
  returnPincode: number;
  returnCity: string;
  returnState: string;
  returnAddress: string;
  returnLandmark: string;
  dropName: string;
  dropEmail: string;
  dropMobile: string;
  dropAlternative_mobile: string;
  dropPincode: number;
  dropCity: string;
  dropState: string;
  dropAddress: string;
  dropLandmark: string;
  productName: string;
  productCategory: string;
  productQuantity: number;
  productPrice: number;
  l: number;
  b: number;
  h: number;
  fragile: boolean;
  invoiceDate: string;
  orderLive: boolean;
  paymentMode: string;
  totalAmount: number;
  totalTaxes: number;
  actualWeight: number;
  volumentricWeight: number;
  weightCategory: string;
  orderId: string;
  createDate: string;
  modifyDate: string;
  userId: string;
  sameReturnOrder: boolean;
  zone: string;
  amount: number;
  waybill: string;
  uploadWbn: string | null;
  orderResponseId: string | null;
  vendorCode: string;
  referenceNumber: string;
  orderLiveDate: string;
  nslCode: string | null;
  status: 'Cancelled' | 'Delivered' | 'Pending' | string | null;
  statusDateTime: string | null;
  statusType: string | null;
  statusLocation: string | null;
  instructions: string | null;
  rtoMarked: boolean;
  deliveryCount: number;
};

type TrackingState = {
  data: TrackingData | null;
  statusTimeline: OrderStatus[];
  setTrackingData: (data: TrackingData) => void;
  setStatusTimeline: (timeline: OrderStatus[]) => void;
  clearTrackingData: () => void;
};

export type TrackOrderState = {
  data: TrackingData[] | null;
  filter: {
    day: number;
    orderId: string;
    paymentMode: string;
    phoneNumber: string;
    productCategory: string;
    referenceNumber: string;
    toDate: Date | null;
    fromDate: Date | null;
    waybill: string;
    status:
      | 'All'
      | 'Manifested'
      | 'RTO'
      | 'In Transit'
      | 'Pending'
      | 'Dispatched'
      | 'Delivered'
      | null;
    vendorCode: 'DL' | 'DT' | '' | string;
    // Shipment_Type: 'COD' | 'Prepaid' | '';
  };
  filterApply: boolean;
  currentPage: number;
  totalPages: number;
  totalElements: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (page: number) => void;
  setTotalElements: (page: number) => void;
  setFilterApply: (active: boolean) => void;
  addTrackingOrderData: (data: TrackingData[]) => void;
  setTrackingOrderData: (data: TrackingData[]) => void;
  clearTrackingOrderData: () => void;
  setFilter: (filter: Partial<TrackOrderState['filter']>) => void;
  clearFilter: () => void;
};

export const useTrackingStore = create<TrackingState>(set => ({
  data: null,
  statusTimeline: [],
  setTrackingData: data => set({data}),
  setStatusTimeline: timeline => set({statusTimeline: timeline}),
  clearTrackingData: () => set({data: null, statusTimeline: []}),
}));

export const useTrackingOrderStore = create<TrackOrderState>(set => ({
  data: null,
  filter: {
    day: 0,
    orderId: '',
    paymentMode: '',
    phoneNumber: '',
    productCategory: '',
    referenceNumber: '',
    status: null,
    toDate: null,
    fromDate: null,
    vendorCode: '',
    waybill: '',
  },
  filterApply: false,
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  setFilterApply: active => set({filterApply: active}),
  setTrackingOrderData: data => set({data}),
  addTrackingOrderData: data =>
    set(state => ({
      data: state.data ? [...state.data, ...data] : [...data],
    })),
  clearTrackingOrderData: () => set({data: null}),
  setCurrentPage: page => set({currentPage: page}),
  setTotalElements: page => set({totalElements: page}),
  setTotalPages: page => set({totalPages: page}),

  setFilter: filterUpdate =>
    set(state => ({
      filter: {
        ...state.filter,
        ...filterUpdate,
      },
    })),

  clearFilter: () =>
    set({
      filter: {
        day: 0,
        orderId: '',
        paymentMode: '',
        phoneNumber: '',
        productCategory: '',
        referenceNumber: '',
        status: null,
        toDate: null,
        fromDate: null,
        vendorCode: '',
        waybill: '',
      },
    }),
}));
