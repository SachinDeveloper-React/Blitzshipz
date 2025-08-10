export interface CreateOrderState {
  id?: string;
  warehouseName: string;
  pickupName: string;
  pickupEmail: string;
  pickupMobile: string;
  pickupAlternative_mobile: string;
  pickupPincode: string;
  pickupCity: string;
  pickupState: string;
  pickupAddress: string;
  pickupLandmark: string;
  sameReturnOrder: boolean;
  returnName: string | null;
  returnEmail: string | null;
  returnMobile: string | null;
  returnAlternative_mobile: string | null;
  returnPincode: string | null;
  returnCity: string;
  returnState: string;
  returnAddress: string;
  returnLandmark: string;
  sellerName: string;
  sellerAddress: string;
  dropName: string;
  dropAddress: string;
  dropCity: string;
  dropState: string;
  dropEmail: string;
  dropMobile: string;
  dropAlternative_mobile: string;
  dropPincode: string;
  dropLandmark: string;
  referenceNumber: string | number;
  totalTaxes: string | number;
  totalAmount: string | number;
  fragile: boolean;
  l: string | number;
  b: string | number;
  h: string | number;
  paymentMode: 'COD' | 'Prepaid';
  productCategory: string;
  productName: string;
  productPrice: string | number;
  productQuantity: number | string;
  volumentricWeight: string | number;
  actualWeight: string | number;
  invoiceDate: string;
  productIds?: string[];
  orderLive: boolean;
  weightCategory: string;
  orderId: string;
  createDate: string;
  modifyDate: string;
  userId: string;
  zone: string;
  amount: string | number;
  waybill: null;
  uploadWbn: null;
  orderResponseId: null;
  vendorCode: null;
  orderLiveDate: null;
  nslCode: null;
  status: null;
  statusDateTime: null;
  statusType: null;
  statusLocation: null;
  instructions: null;
  rtoMarked: boolean;
  deliveryCount: number | string;
  reverseMarked: boolean;
  channel: string | null;
  channelId: string | null;
}

// types/warehouse.ts
export interface AddressEntry {
  id: string;
  userId: string;
  name: string;
  address: string;
  pin: string;
  phone: string;
  altPhone: string;
  city: string;
  state: string;
  email: string;
  primary: boolean;
  returnName: string;
  returnEmail: string;
  returnPhone: string;
  returnAltPhone: string;
  returnAddress: string;
  returnCity: string;
  returnState: string;
  returnPin: string;
  returnSame: boolean;
}

export interface Seller {
  id: string;
  name: string;
  address: string;
  userId: string;
}

export interface WarehouseStore {
  warehouses: AddressEntry[];
  setWarehouses: (data: AddressEntry[]) => void;
  getPrimaryWarehouse: () => AddressEntry | undefined;
  getWarehouseById: (id: string) => AddressEntry | undefined;
}

export interface CreateOrderStore {
  state: CreateOrderState;
  type: 'edit' | 'create';
  setType: (type: 'edit' | 'create') => void;
  setOrderField: <K extends keyof CreateOrderState>(
    key: K,
    value: CreateOrderState[K],
  ) => void;
  resetOrder: () => void;
  fillFromState: (data: CreateOrderState) => void;
  errors: Record<string, string>;
  setError: (field: string, message: string) => void;
  clearErrors: () => void;
}

export interface SellerStore {
  sellers: Seller[];
  sellerLoading: boolean;
  sellerError: string;
  setSellers: (data: Seller[]) => void;
  getSellerById: (id: string) => Seller | undefined;
  setSellerLoading: (loading: boolean) => void;
  setSellerError: (error: string) => void;
}

type PaginationState = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
};

export interface PrintLabelStore {
  orders: CreateOrderState[] | [];
  loading: {
    refreshLoading: boolean;
    loadMoreLoading: boolean;
    loading: boolean;
  };
  error: string | null;
  pagination: PaginationState;
  setOrder: (order: CreateOrderState[]) => void;
  appendOrder: (order: CreateOrderState[]) => void;
  removeOrder: (orderId: string) => void;
  clearOrders: () => void;
  setLoading: (
    key: 'refreshLoading' | 'loadMoreLoading' | 'loading',
    value: boolean,
  ) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
}
