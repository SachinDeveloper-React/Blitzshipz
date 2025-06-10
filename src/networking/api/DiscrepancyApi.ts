import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const DiscrepancyApi = {
  getDiscrepancy: async (page: number, size?: number) => {
    try {
      const body = {
        orderId: '',
        orderRef: '',
        waybill: '',
        discrepancyStatus: '',
        createDateStart: '',
        createDateEnd: '',
      };
      const response = await ApiClient.post(
        `${URLS.DISCREPANCY.DISCREPANCY}?page=${page}&size=${size ?? 10}`,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default DiscrepancyApi;
