import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const SettingApi = {
  getTicketList: async (
    body: {
      status: string | null;
      category: string | null;
      subCategory: string;
      orderId: string;
      awbNumber: string;
      createdDateFrom: string;
      createdDateTo: string;
      ticketNumber: string;
    },
    page: number,
  ) => {
    try {
      const response = await ApiClient.post(
        `${URLS.SETTING.SUPPORT}?page=${page}&size=10`,
        body,
      );

      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  raisedTicket: async (body: {
    awbNumber: string;
    category: string;
    subCategory: string;
    description: string;
  }) => {
    try {
      const response = await ApiClient.post(URLS.SETTING.RAISEDTICKET, body);
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  getChatByTicketId: async (ticketId: string) => {
    try {
      const response = await ApiClient.get(
        `${URLS.SETTING.GETCHATBYTICKETID}${ticketId}`,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  sendMessageByCustomer: async (body: {
    response: string;
    ticketId: string;
    userId: string;
    isObject: boolean;
    objectType: 'A' | 'I';
    attachment?: string | null;
  }) => {
    try {
      const response = await ApiClient.post(URLS.SETTING.SENDMESSAGE, body);
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default SettingApi;
