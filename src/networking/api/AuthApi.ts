import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const AuthApi = {
  login: async (body: {email: string; password: string}) => {
    try {
      const response = await ApiClient.post(URLS.AUTH.LOGIN, body);
      return responseHandler(response);
    } catch (error) {
      console.log('Authapi Login error', error);
      return errorHandler(error);
    }
  },
  register: async (body: {
    email: string;
    mobileNumber: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: string[];
  }) => {
    try {
      const response = await ApiClient.post(URLS.AUTH.SIGNUP, body);
      return responseHandler(response);
    } catch (error) {
      console.log('Authapi Login error', error);
      return errorHandler(error);
    }
  },
  refreshAccessToken: async (token: string) => {
    try {
      const response = await ApiClient.post('/user/auth/refresh-token', {
        token,
      });

      return responseHandler(response);
    } catch (error) {
      return errorHandler(error);
    }
  },
};

export default AuthApi;
