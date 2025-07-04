import {errorHandler, responseHandler} from '../../utils';
import ApiClient from '../ApiClient';
import {URLS} from '../Urls';

const AuthApi = {
  login: async (body: {email: string; password: string}) => {
    try {
      const response = await ApiClient.post(URLS.AUTH.LOGIN, body);

      console.log('response', response);
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
