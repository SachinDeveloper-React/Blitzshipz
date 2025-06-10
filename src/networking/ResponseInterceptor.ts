import axios, {AxiosInstance, AxiosError} from 'axios';
import {getBearerRefreshToken} from './RequestInterceptor';
import * as Keychain from 'react-native-keychain';
import {BASE_URL} from './Urls';
// Create a separate instance for refreshing the token
const refreshClient = axios.create();

export const attachResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (!error.response) return Promise.reject(error);

      const {status, config} = error.response as any;

      if (status === 401 && !config?._retry) {
        config!._retry = true; // ✅ Prevent loop

        const newToken = await newAccessToken();

        if (!newToken) return Promise.reject(error); // Logout or redirect user

        config!.headers.Authorization = `Bearer ${newToken}`;
        return client(config!); // ✅ Retry the failed request with a new token
      }

      return Promise.reject(error);
    },
  );
};

// Function to refresh the token using a separate Axios instance
const newAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await getBearerRefreshToken();
    if (!refreshToken) return null;

    const response = await refreshClient.post(
      `${BASE_URL}/user/auth/refresh-token`,
      {
        refreshToken,
      },
    );

    const newToken = response.data?.accessToken;

    if (newToken) {
      const credentials = {
        accessToken: newToken,
        refreshToken: response?.data?.refreshToken,
      };

      await Keychain.setGenericPassword(
        `password`,
        JSON.stringify(credentials),
      );
      // await setBearerAccessToken(newToken);
      return newToken;
    }

    return null;
  } catch (error) {
    // console.error('Token refresh failed:', error);
    console.error(
      'Token refresh failed:',
      error instanceof Error ? error.message : error,
    );

    return null;
  }
};
