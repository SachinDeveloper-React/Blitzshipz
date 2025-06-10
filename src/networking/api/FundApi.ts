import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const FundApi = {
  getBalance: async () => {
    try {
      const response = await ApiClient.get(URLS.FUNDS.GETBALANCE);
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  getFilterBalance: async (
    body: {
      orderId: string;
      waybillNumber: string | null;
      transactionType: string | null;
      minAmount: string;
      maxAmount: string;
      status: string | null;
    },
    page: number,
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.FUNDS.GETFILTERBALANCE}?page=${page ?? 0}&size=10`,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};
export default FundApi;
