import {create} from 'zustand';
import {OrderDetails} from '../types';

type VendorData = {
  vendorCode: string;
  value: number;
  total: number;
};

type GraphDataItem = {
  date: string;
  vendorData: VendorData[];
};

type OverviewData = {
  title: string;
  count: number;
  icon: string;
  color: string;
}[];

type RevenueData = {
  count: number;
  date: string;
  revenue: number;
}[];
type PickupData = {
  totalOrders: number;
  vendorCode: string;
  vendorOrders: number;
}[];

type StoreState = {
  startDate: Date;
  endDate: Date;
  overviewData: OverviewData | null;
  revenueData: RevenueData[] | null;
  graphData: GraphDataItem[] | null;
  pickupData: PickupData[] | null;
  setOverviewData: (data: OverviewData) => void;
  setGraphData: (data: GraphDataItem[]) => void;
  setRevenueData: (data: RevenueData[]) => void;
  setPickupData: (data: PickupData[]) => void;
  setStartDate: (data: Date) => void;
  setEndDate: (data: Date) => void;
};

// Create Zustand Store
export const useDasboardStore = create<StoreState>(set => ({
  startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
  endDate: new Date(),
  overviewData: null,
  graphData: null,
  revenueData: null,
  pickupData: null,
  setOverviewData: data => set({overviewData: data}),
  setRevenueData: data => set({revenueData: data}),
  setGraphData: data => set({graphData: data}),
  setPickupData: data => set({pickupData: data}),
  setStartDate: date => set({startDate: date}),
  setEndDate: date => set({endDate: date}),
}));

export type Filter = {
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
  orderResponseId: string;
  vendorCode: string;
  referenceNumber: string;
  orderLiveDate: string;
  nslCode: string;
  status: string;
  statusDateTime: string;
  statusType: string;
  statusLocation: string;
  instructions: string;
  rtoMarked: boolean;
};

type FilterState = {
  totalPages: number | string;
  totalElements: number | string;
  currentPage: number | string;
  empty: boolean;
  filterData: Filter[] | [];
  setTotalPages: (pages: number | string) => void;
  setCurrentPages: (pages: number | string) => void;
  setTotalElements: (pages: number | string) => void;
  setEmpty: (empty: boolean) => void;
  setFilterData: (data: Filter[]) => void;
  addFilterData: (data: Filter[], page: number | string) => void;
};

export const useDashboardFilterStore = create<FilterState>(set => ({
  totalPages: 0,
  currentPage: 0,
  totalElements: 0,
  empty: false,
  filterData: [],
  setTotalPages: pages => set({totalPages: pages}),
  setCurrentPages: pages => set({currentPage: pages}),
  setTotalElements: pages => set({totalElements: pages}),
  setEmpty: empty => set({empty: empty}),
  setFilterData: data => set({filterData: data}),
  addFilterData: (data, page) =>
    set(state => ({
      filterData: [...state.filterData, ...data],
      currentPage: page,
    })),
}));

export type NDROrder = {
  id: string;
  warehouseName?: string;
  pickupName?: string;
  pickupEmail?: string;
  pickupMobile?: string;
  pickupAlternative_mobile?: string;
  pickupPincode?: number;
  pickupCity?: string;
  pickupState?: string;
  pickupAddress?: string;
  pickupLandmark?: string;
  sellerName?: string;
  sellerAddress?: string;
  returnName?: string;
  returnEmail?: string;
  returnMobile?: string;
  returnAlternative_mobile?: string;
  returnPincode?: number;
  returnCity?: string;
  returnState?: string;
  returnAddress?: string;
  returnLandmark?: string;
  dropName?: string;
  dropEmail?: string;
  dropMobile?: string;
  dropAlternative_mobile?: string;
  dropPincode?: number;
  dropCity?: string;
  dropState?: string;
  dropAddress?: string;
  dropLandmark?: string;
  productName?: string;
  productCategory?: string;
  productQuantity?: number;
  productPrice?: number;
  l?: number;
  b?: number;
  h?: number;
  fragile?: boolean;
  invoiceDate?: string;
  orderLive?: boolean;
  paymentMode?: string;
  totalAmount?: number;
  totalTaxes?: number;
  actualWeight?: number;
  volumentricWeight?: number;
  weightCategory?: string;
  orderId?: string;
  createDate?: string;
  modifyDate?: string;
  userId?: string;
  sameReturnOrder?: boolean;
  zone?: string;
  amount?: number;
  waybill: string;
  uploadWbn?: string | null;
  orderResponseId?: string;
  vendorCode?: string;
  referenceNumber?: string;
  orderLiveDate?: string;
  nslCode?: string;
  status?: string;
  statusDateTime?: string;
  statusType?: string;
  statusLocation?: string;
  instructions?: string;
  rtoMarked?: boolean;
  deliveryCount?: number;
};

type NdrStatsResponse = {
  data: {
    totalNdr: number;
    autoNdr: number;
    actionableCount: number;
    addressIssueCount: number;
  };
  message: string;
  time: number;
  status: number;
};

type NdrOrderListResponse = {
  data: {
    actionableOrders: NDROrder[];
    addressIssueOrders: NDROrder[];
  };
  message: string;
  status: number;
  time: number;
};

type NDRState = {
  totalNDR: NDROrder[];
  statusNDR: NdrStatsResponse | null;
  ndrOrderList: NdrOrderListResponse | null;
  setTotalNDR: (orders: NDROrder[]) => void;
  setStatusNDR: (data: NdrStatsResponse) => void;
  setNdrOrderList: (data: NdrOrderListResponse) => void;
};

export const useNdrStore = create<NDRState>(set => ({
  totalNDR: [],
  statusNDR: null,
  ndrOrderList: null,
  setTotalNDR: orders => set({totalNDR: orders}),
  setStatusNDR: data => set({statusNDR: data}),
  setNdrOrderList: data => set({ndrOrderList: data}),
}));

export type LostResponseState = {
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
  uploadWbn: string;
  orderResponseId: string;
  vendorCode: string;
  referenceNumber: string;
  orderLiveDate: string;
  nslCode: string;
  status: string;
  statusDateTime: string;
  statusType: string;
  statusLocation: string;
  instructions: string;
  rtoMarked: boolean;
  deliveryCount: number;
};

type LostState = {
  lostData: LostResponseState[];
  totalPages: number | string;
  currentPage: number | string;
  setLostData: (data: LostResponseState[]) => void;
  addLostData: (data: LostResponseState[]) => void;
  setTotalPages: (pages: number | string) => void;
  setCurrentPage: (page: number | string) => void;
};

export const useLostStore = create<LostState>(set => ({
  lostData: [],
  totalPages: 0,
  currentPage: 1,
  setLostData: data => set({lostData: data}),
  addLostData: data =>
    set(state => ({
      lostData: [...state.lostData, ...data],
    })),
  setTotalPages: pages => set({totalPages: pages}),
  setCurrentPage: page => set({currentPage: page}),
}));

type TROState = {
  rtoData: OrderDetails[];
  totalPages: number | string;
  currentPage: number | string;
  totalElements: number | string;
  setRTOData: (data: OrderDetails[]) => void;
  addRTOData: (data: OrderDetails[]) => void;
  setTotalPages: (pages: number | string) => void;
  setCurrentPage: (page: number | string) => void;
  setTotalElements: (page: number | string) => void;
};

export const useRTOStore = create<TROState>(set => ({
  rtoData: [],
  totalPages: 0,
  currentPage: 1,
  totalElements: 0,
  setRTOData: data => set({rtoData: data}),
  addRTOData: data =>
    set(state => ({
      rtoData: [...state.rtoData, ...data],
    })),
  setTotalPages: pages => set({totalPages: pages}),
  setCurrentPage: page => set({currentPage: page}),
  setTotalElements: page => set({totalElements: page}),
}));
