import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const DashboardApi = {
  overviewOrder: async () => {
    try {
      const response = await ApiClient.get(URLS.DASHBOARD.OVERVIEWORDER);
      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },
  orderDataGraph: async (start: string, end: string) => {
    try {
      const response = await ApiClient.get(
        `${URLS.DASHBOARD.ORDERDATAGRAPH}?startDate=${start}&endDate=${end}`,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  orderDataRevenue: async (start: string, end: string) => {
    try {
      const response = await ApiClient.get(
        `${URLS.DASHBOARD.ORDERDATAREVENUE}?startDate=${start}&endDate=${end}`,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  pickedUpDetails: async () => {
    try {
      const response = await ApiClient.get(URLS.DASHBOARD.PICKEDUPDETAILS);
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  orderFilterUser: async (
    body: {
      waybill?: string;
      status?:
        | 'Delivered'
        | 'Dispatched'
        | 'In Transit'
        | 'Manifested'
        | 'Cancelled'
        | 'LOST'
        | any;
      rtoMarked?: boolean | null;
      orderLive?: boolean | null;
    },
    page: string | number,
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

  getNDRList: async () => {
    try {
      const response = await ApiClient.get(URLS.DASHBOARD.NDR.NDRLIST);
      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },
  ndrOrdersOverview: async () => {
    try {
      const response = await ApiClient.get(URLS.DASHBOARD.NDR.NDRORDEROVERVIEW);
      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },
  ndrOrderList: async () => {
    try {
      const response = await ApiClient.get(URLS.DASHBOARD.NDR.NDRORDERLIST);
      return responseHandler(response);
    } catch (error) {
      console.log('error', error);
      return errorHandler(error);
    }
  },
};

export default DashboardApi;
