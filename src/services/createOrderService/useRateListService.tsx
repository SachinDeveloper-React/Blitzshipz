import React, {useState} from 'react';
import {CreateOrderApi} from '../../networking';

const useRateListService = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getBatchRatesList = async (ids: string[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await CreateOrderApi.getBatchRateList({orderIds: ids});
      console.log('response', response);
      if (response.code === 200) setData(response?.data);
      else setError(response?.data || 'Something went wrong');
    } catch (err: any) {
      console.error('getBatchRatesList error:', err);
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getBatchRatesList,
  };
};

export default useRateListService;
