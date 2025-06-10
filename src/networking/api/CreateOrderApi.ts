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
};

export default CreateOrderApi;
