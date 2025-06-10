import axios, {AxiosResponse} from 'axios';

export const responseHandler = (response: AxiosResponse) => {
  return {
    code: response.status,
    status: response.statusText,
    data: response.data,
    error: response.status >= 400,
  };
};
