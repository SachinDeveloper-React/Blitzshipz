import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const CreateOrderApi = {
  getBookmyOrder: async (
    body: {
      orderLive: boolean;
      status: string | null;
      dropName?: string;
      orderId?: string;
      phoneNumber?: string;
      referenceNumber?: string;
    },
    page: string | number,
    size?: string | number,
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.CREATEORDER.GETBOOKMYORDER}?page=${page}&size=${size || 10}`,
        body,
      );

      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },
  getOrderRates: async (id: string) => {
    try {
      const response = await ApiClient.get(
        `${URLS.CREATEORDER.GETRATES}?orderId=${id}`,
      );

      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },
  getSeller: async (id: string) => {
    try {
      const response = await ApiClient.get(
        `${URLS.CREATEORDER.GETSELLER}?userId=${id}`,
      );

      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },

  createOrder: async (body: {
    fragile: boolean;
    paymentMode: 'COD' | 'Prepaid';
    warehouseName: string;
    pickupAddress: string;
    pickupAlternative_mobile: string;
    pickupCity: string;
    pickupEmail: string;
    pickupLandmark: string;
    pickupMobile: string;
    pickupName: string;
    pickupPincode: string;
    pickupState: string;
    sellerName: string;
    sellerAddress: string;
    returnAddress: string;
    returnAlternative_mobile: string | null;
    returnCity: string | null;
    returnEmail: string | null;
    returnLandmark: string | null;
    returnMobile: string | null;
    returnName: string | null;
    returnPincode: string | null;
    referenceNumber: string;
    returnState: string;
    dropAddress: string;
    dropAlternative_mobile: string;
    dropCity: string;
    dropEmail: string;
    dropLandmark: string;
    dropMobile: string;
    dropName: string;
    dropPincode: string;
    dropState: string;
    productName: string;
    productPrice: number | string;
    productQuantity: number | string;
    productCategory: string;
    invoiceDate: string;
    sameReturnOrder: string;
    totalTaxes: number | string;
    totalAmount: number | string;
    actualWeight: string | number;
    volumentricWeight: number | string;
    l: number | string;
    b: number | string;
    h: number | string;
  }) => {
    try {
      const response = await ApiClient.post(URLS.CREATEORDER.CREATEORDER, body);
      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },
  editOrder: async (
    id: string,
    body: {
      actualWeight: string | number;
      amount: string | number;
      b: string | number;
      channel: string | null;
      channelId: string | null;
      createDate: string;
      deliveryCount: number | string;
      dropAddress: string;
      dropAlternative_mobile: string;
      dropCity: string;
      dropEmail: string;
      dropLandmark: string;
      dropMobile: string;
      dropName: string;
      dropPincode: string;
      dropState: string;
      fragile: boolean;
      h: string | number;
      instructions: null;
      invoiceDate: string;
      l: string | number;
      modifyDate: string;
      nslCode: null;
      orderId: string;
      orderLive: boolean;
      orderLiveDate: null;
      orderResponseId: null;
      paymentMode: 'COD' | 'Prepaid';
      pickupAddress: string;
      pickupAlternative_mobile: string;
      pickupCity: string;
      pickupEmail: string;
      pickupLandmark: string;
      pickupMobile: string;
      pickupName: string;
      pickupPincode: string;
      pickupState: string;
      productCategory: string;
      productIds?: string[]; // Optional
      productName: string;
      productPrice: string | number;
      productQuantity: number | string;
      referenceNumber: string | number;
      returnAddress: string;
      returnAlternative_mobile: string | null;
      returnCity: string;
      returnEmail: string | null;
      returnLandmark: string;
      returnMobile: string | null;
      returnName: string | null;
      returnPincode: string | null;
      returnState: string;
      reverseMarked: boolean;
      rtoMarked: boolean;
      sameReturnOrder: boolean;
      sellerAddress: string;
      sellerName: string;
      status: null;
      statusDateTime: null;
      statusLocation: null;
      statusType: null;
      totalAmount: string | number;
      totalTaxes: string | number;
      uploadWbn: null;
      vendorCode: null;
      volumentricWeight: string | number;
      warehouseName: string;
      waybill: null;
      weightCategory: string;
      zone: string;
    },
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.CREATEORDER.EDITORDER}${id}`,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },

  createSellerDetails: async (body: {name: string; address: string}) => {
    try {
      const response = await ApiClient.post(
        URLS.CREATEORDER.CREATESELLER,
        body,
      );

      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },

  deleteOrder: async (id: string) => {
    try {
      const response = await ApiClient.delete(
        `${URLS.CREATEORDER.DELETEORDER}${id}`,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },

  getPrintLabel: async (
    body: {
      orderLive: boolean;
      rtoMarked: boolean;
      status: 'Manifested';
    },
    page: string | number,
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.CREATEORDER.GETBOOKMYORDER}?page=${page}&size=10`,
        body,
      );

      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },

  savePrintLabel: async (pages: 1 | 2 | 4, body: string[]) => {
    try {
      const UrlPages = {
        1: '/jasper/labels/shipping-labels/bulk-by-orders?returnAddressVisible=false&mobileNumberVisible=false',
        2: '/jasper/labels/shipping-labels/2-per-page/by-orders?returnAddressVisible=false&mobileNumberVisible=false',
        4: '/jasper/labels/shipping-labels/4-per-page/by-orders?returnAddressVisible=false&mobileNumberVisible=false',
      };

      const response = await ApiClient.post(UrlPages[pages], body, {
        responseType: 'arraybuffer',
      });
      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },

  getBatchRateList: async (body: {orderIds: string[]}) => {
    try {
      const response = await ApiClient.post(
        URLS.ORDERRATES.BATCHRATELIST,
        body,
      );

      return responseHandler(response);
    } catch (error) {
      console.log('getBatchRateList error', error);
      return errorHandler(error);
    }
  },

  createOrderLive: async (body: {
    orderId: string;
    weight: number;
    amount: number;
    vendorId: string;
  }) => {
    try {
      const response = await ApiClient.post(
        URLS.CREATEORDER.MAKEORDERLIVE,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('createOrderLive error', error);
      return errorHandler(error);
    }
  },
  createBatchOrderLive: async (body: {
    strategyType: string;
    orderChoices: {
      orderId: string;
      vendorCode: string;
      amount: number;
      weight: number;
    }[];
    vendorCode: string;
  }) => {
    try {
      const response = await ApiClient.post(
        URLS.CREATEORDER.BATCHMAKEORDERLIVE,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      console.log('createBatchOrderLive error', error);
      return errorHandler(error);
    }
  },
};

export default CreateOrderApi;
