import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const TrackingApi = {
  trackOrder: async (id: string) => {
    try {
      const response = await ApiClient.get(
        `${URLS.TRACK.TRACKORDER}?orderId=${id}`,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  findOrderDeatils: async (
    body: {
      waybill: string;
    },
    page: number | string,
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.DASHBOARD.OREDERFILTERUSER}?page=${page}&size=10`,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  trackOrderListWithFilter: async (
    body: {
      day?: number;
      fromDate?: Date | null;
      orderId?: string;
      paymentMode?: string;
      phoneNumber?: string;
      productCategory?: string;
      referenceNumber?: string;
      status?: string | null;
      toDate?: Date | null;
      vendorCode?: string;
      waybill?: string;
    },
    page: number | string,
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.TRACK.TRACKORDERWITHFILTER}?page=${page}&size=20`,
        body,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default TrackingApi;
