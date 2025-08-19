import React, {useState} from 'react';
import {CreateOrderApi} from '../../networking';
import {OrderItem} from '../../types';
import {popToTop} from '../../navigation';
import useBookmyOrderAndRateService from './useBookmyOrderAndRateService';

const useRateListService = () => {
  const {
    setMissingVolumeWeightOrders,
    filterForm,
    setSelectedOrders,
    fetchOrders,
  } = useBookmyOrderAndRateService();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [batchLoading, setBatchLoading] = useState<boolean>(false);
  const [batchResponse, setBatchResponse] = useState<any>(null);

  /**
   * Fetch batch rate list for given order IDs
   */
  const getBatchRatesList = async (ids: string[]) => {
    try {
      setLoading(true);
      setError(null);

      const response = await CreateOrderApi.getBatchRateList({orderIds: ids});

      if (response?.code === 200) {
        setData(response.data);
      } else {
        const message = response?.data?.message || 'Failed to fetch rate list.';
        console.warn('[getBatchRatesList] API error:', message);
        setError(message);
      }
    } catch (err: any) {
      console.error('[getBatchRatesList] Unexpected error:', err);
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create batch orders for selected vendor & order items
   */
  const batchCreateOrder = async (
    rates: {amount: number; label: string; value: string}[],
    vendor: {label: string; value: string; amount: number},
    orders: OrderItem[],
  ) => {
    try {
      setBatchLoading(true);
      setError(null);

      const body = {
        strategyType: 'SINGLE_VENDOR',
        orderChoices: orders.map(item => ({
          orderId: item.id,
          vendorCode: vendor.value,
          amount: vendor.amount / orders.length,
          weight: item.actualWeight,
        })),
        vendorCode: vendor.value,
      };

      const response = await CreateOrderApi.createBatchOrderLive(body);

      if (response?.code === 200) {
        setBatchResponse(response.data);
        setMissingVolumeWeightOrders([]);
        setSelectedOrders([]);
        await fetchOrders(false, false, 0, filterForm);
        setModalVisible(true);
      } else {
        const message =
          response?.data?.message || 'Batch order creation failed.';
        console.warn('[batchCreateOrder] API error:', message);
        setError(message);
      }
    } catch (err: any) {
      console.error('[batchCreateOrder] Unexpected error:', err);
      setError(err?.message || 'An unexpected error occurred.');
    } finally {
      setBatchLoading(false);
      setFetchLoading(false);
    }
  };

  const onClose = () => {
    setModalVisible(false);
    popToTop();
  };

  return {
    data,
    loading,
    error,
    batchResponse,
    batchLoading,
    getBatchRatesList,
    batchCreateOrder,
    modalVisible,
    setModalVisible,
    onClose,
    fetchLoading,
  };
};

export default useRateListService;
