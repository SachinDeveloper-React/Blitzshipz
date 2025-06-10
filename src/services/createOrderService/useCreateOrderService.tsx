import React, {useEffect, useState} from 'react';
import {useOrderStore} from '../../store';
import {CreateOrderApi} from '../../networking';

type Props = {};

const useCreateOrderService = () => {
  const {
    orders,
    isLoading,
    loadOrders,
    appendOrders,
    pagination,
    setPagination,
  } = useOrderStore();

  const [ratesData, setRateData] = useState<{
    basePricing: {
      additionalRate: number;
      amount: number;
      codCharges: number;
      rate: number;
      rto: number;
      standered: string;
      vendorCode: string;
      weight: number;
      weightCategory: string;
      zone: string;
    }[];
    advancePricing: {
      additionalRate: number;
      amount: number;
      codCharges: number;
      rate: number;
      rto: number;
      standered: string;
      vendorCode: string;
      weight: number;
      weightCategory: string;
      zone: string;
    }[];
  }>();
  const [loading, setLoading] = useState({
    bookmyOrderLoading: true,
    loadMorebookmyOrderLoading: true,
    refreshbookmyOrderLoading: true,
  });

  const fetchOrders = async (refresh: boolean, next: boolean, page: number) => {
    try {
      if (refresh)
        setLoading(prev => ({...prev, refreshbookmyOrderLoading: true}));
      else if (next)
        setLoading(prev => ({...prev, loadMorebookmyOrderLoading: true}));
      else setLoading(prev => ({...prev, bookmyOrderLoading: true}));
      const response = await CreateOrderApi.getBookmyOrder(
        {orderLive: false, status: null},
        page,
      );

      if (page === 0) {
        loadOrders(response.data.content);
      } else {
        appendOrders(response.data.content);
      }

      const pagination = {
        currentPage: page + 1,
        totalPages: response.data.totalPages,
        pageSize: response.data.size,
        totalItems: response.data.totalElements,
      };
      setPagination(pagination);
    } catch (error) {
      console.log('Error fetchOrders', error);
    } finally {
      setLoading(prev => ({
        ...prev,
        refreshbookmyOrderLoading: false,
        bookmyOrderLoading: false,
        loadMorebookmyOrderLoading: false,
      }));
    }
  };

  const fetchRates = async (id: string) => {
    try {
      const response = await CreateOrderApi.getOrderRates(id);

      setRateData(response.data);
    } catch (error) {
      console.log('Error fetchRates', error);
    }
  };

  const handleLoadMore = async () => {
    await fetchOrders(false, true, pagination?.currentPage);
  };

  const onRefresh = async () => {
    await fetchOrders(true, false, 0);
  };

  return {
    handleLoadMore,
    orders,
    onRefresh,
    loading,
    fetchRates,
    fetchOrders,
    ratesData,
  };
};

export default useCreateOrderService;
