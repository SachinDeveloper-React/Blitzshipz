import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const FilterApi = {
  excelFilterUser: async (
    body: {
      day: number;
      fromDate: string | null;
      orderId: string;
      paymentMode: string;
      phoneNumber: string;
      productCategory: string;
      referenceNumber: string;
      status: string | null;
      toDate: string | null;
      waybill: string;
    },
    page: string | number,
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.DASHBOARD.OREDERFILTERUSER}?page=${page}&size=400000`,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default FilterApi;
