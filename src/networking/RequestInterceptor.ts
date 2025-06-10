import {AxiosInstance} from 'axios';
import * as Keychain from 'react-native-keychain';
export const attachRequestInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(
    async (config: any) => {
      const token = await getBearerToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    },
  );
};

export const getBearerToken = async () => {
  const storedCredentials = await Keychain.getGenericPassword();
  if (storedCredentials) {
    const credentials = JSON.parse(storedCredentials.password);
    return credentials.accessToken;
  }
  return;
};
export const getBearerRefreshToken = async () => {
  const storedCredentials = await Keychain.getGenericPassword();
  if (storedCredentials) {
    const credentials = JSON.parse(storedCredentials.password);

    return credentials.refreshToken;
  }
  return;
};
