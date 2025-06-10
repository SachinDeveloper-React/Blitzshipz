import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const CodApi = {
  codSummary: async () => {
    try {
      const response = await ApiClient.get(URLS.COD.CODSUMMARY);
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  codPaymentUser: async (page: number, size?: number) => {
    try {
      const response = await ApiClient.get(
        `${URLS.COD.CODPAYMENTUSER}?page=${page}&size=${size ?? 10}`,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default CodApi;
