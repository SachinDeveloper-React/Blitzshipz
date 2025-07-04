import axios, {AxiosInstance, AxiosError} from 'axios';
import {getBearerRefreshToken} from './RequestInterceptor';
import * as Keychain from 'react-native-keychain';
import {BASE_URL} from './Urls';
import {useAuthStore} from '../store';

// Create a separate instance for refreshing the token
const refreshClient = axios.create();

// Shared refresh state
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
};

// Attach response interceptor
export const attachResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      if (!error.response || !originalRequest) {
        return Promise.reject(error);
      }

      const {status} = error.response;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const {logout} = useAuthStore.getState();

        // Queue requests during token refresh
        if (isRefreshing) {
          return new Promise(resolve => {
            subscribeTokenRefresh(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(client(originalRequest));
            });
          });
        }

        isRefreshing = true;
        const newToken = await newAccessToken();

        isRefreshing = false;

        if (!newToken) {
          await Keychain.resetGenericPassword(); // optional: clean up
          logout();
          return Promise.reject(error);
        }

        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return client(originalRequest);
      }

      return Promise.reject(error);
    },
  );
};

// Refresh access token
const newAccessToken = async (): Promise<string | null> => {
  const {logout} = useAuthStore.getState();
  try {
    const refreshToken = await getBearerRefreshToken();
    console.log('Refreshing with token:', refreshToken);

    if (!refreshToken) {
      console.warn('No refresh token found');
      return null;
    }

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
        'password',
        JSON.stringify(credentials),
      );
      return newToken;
    }

    return null;
  } catch (error: any) {
    console.error(
      'Token refresh failed:',
      error?.response?.status,
      error?.response?.data || (error instanceof Error ? error.message : error),
    );
    await Keychain.resetGenericPassword();
    logout(); // Trigger logout if refresh fails
    return null;
  }
};
