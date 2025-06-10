export type TrackingItem = {
  id: string;
  orderId: string;
  orderRef: string;
  status: string;
  statusDateTime: string;
  statusType: string;
  statusLocation: string;
  instructions: string;
};

export type OrderDetails = {
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
  paymentMode: 'Prepaid' | 'COD' | string;
  totalAmount: number;
  totalTaxes: number;
  actualWeight: number;
  volumentricWeight: number;
  weightCategory: 'FEATHER' | 'LIGHT' | 'HEAVY' | string;
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
  deliveryCount?: number;
};

export type OrderItem = {
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
  returnCity: string | null;
  returnState: string | null;
  returnAddress: string | null;
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
  productIds: string[] | null;
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
  waybill: string | null;
  uploadWbn: string | null;
  orderResponseId: string | null;
  vendorCode: string | null;
  referenceNumber: string;

  orderLiveDate: string | null;
  nslCode: string | null;

  status: string | null;
  statusDateTime: string | null;
  statusType: string | null;
  statusLocation: string | null;

  instructions: string | null;

  rtoMarked: boolean;
  deliveryCount: number;
  reverseMarked: boolean;

  channel: string | null;
};
