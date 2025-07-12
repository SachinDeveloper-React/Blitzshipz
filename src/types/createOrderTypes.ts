export interface CreateOrderState {
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
  sameReturnOrder: string;
  returnName: string;
  returnEmail: string;
  returnMobile: string;
  returnAlternative_mobile: string;
  returnPincode: string;
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
  referenceNumber: string;
  totalTaxes: string;
  totalAmount: string;
  fragile: boolean;
  l: string;
  b: string;
  h: string;
  paymentMode: 'COD' | 'Prepaid';
  productCategory: string;
  productName: string;
  productPrice: string;
  productQuantity: number | string;
  volumentricWeight: string;
  actualWeight: string;
  invoiceDate: string;
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
  setOrderField: <K extends keyof CreateOrderState>(
    key: K,
    value: CreateOrderState[K],
  ) => void;
  resetOrder: () => void;
  fillFromState: (data: Partial<CreateOrderState>) => void;
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
