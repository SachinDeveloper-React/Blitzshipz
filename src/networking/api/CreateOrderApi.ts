import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const CreateOrderApi = {
  getBookmyOrder: async (
    body: {orderLive: boolean; status: string | null},
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
    returnAlternative_mobile: string;
    returnCity: string;
    returnEmail: string;
    returnLandmark: string;
    returnMobile: string;
    returnName: string;
    returnPincode: string;
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
};

export default CreateOrderApi;
