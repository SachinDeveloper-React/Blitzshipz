import axios from 'axios';

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      code: error.response?.status || 500,
      status: false,
      data: error.response?.data || 'An unexpected error occurred',
      error: true,
    };
  }
  // Handle non-Axios errors
  return {
    code: 500,
    status: false,
    data: 'An unexpected error occurred',
    error: true,
  };
};
