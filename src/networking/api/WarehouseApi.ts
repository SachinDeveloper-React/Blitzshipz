import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const WarehouseApi = {
  fetchCityAndStateFromPin: async (pin: string) => {
    try {
      const response = await ApiClient.get(`${URLS.WAREHOUSE.PINCODE}${pin}`);
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  createWareHouse: async (body: {
    name: string;
    email: string;
    address: string;
    pin: string;
    phone: string;
    altPhone: string;
    city: string;
    state: string;
    returnAddress: string;
    returnCity: string;
    returnState: string;
    returnPin: string;
    returnSame: boolean;
    primary: boolean;
  }) => {
    try {
      const response = await ApiClient.post(URLS.WAREHOUSE.CREATE, body);
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
  editWareHouse: async (body: {
    name: string;
    email: string;
    address: string;
    pin: string;
    phone: string;
    altPhone: string;
    city: string;
    state: string;
    returnAddress: string;
    returnCity: string;
    returnState: string;
    returnPin: string;
    returnSame: boolean;
    primary: boolean;
  }) => {
    try {
      const response = await ApiClient.post(URLS.WAREHOUSE.EDIT, body);
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },

  deleteWareHouse: async (id: string) => {
    try {
      const response = await ApiClient.delete(
        `${URLS.WAREHOUSE.DELETE}?id=${id}`,
      );
      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default WarehouseApi;
