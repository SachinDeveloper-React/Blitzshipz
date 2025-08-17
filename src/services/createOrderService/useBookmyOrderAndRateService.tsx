import React, {useEffect, useState} from 'react';
import {useCreateOrderStore, useOrderStore} from '../../store';
import {CreateOrderApi} from '../../networking';
import {showToast} from '../../utils';
import {OrderItem} from '../../types';
import {navigate} from '../../navigation';
import {Alert} from 'react-native';

type Props = {};

const useBookmyOrderAndRateService = () => {
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
  const [pageSize, setPageSize] = useState<number | string>('10');
  const [loading, setLoading] = useState({
    bookmyOrderLoading: true,
    loadMorebookmyOrderLoading: true,
    refreshbookmyOrderLoading: true,
  });

  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtermodalVisible, setFilterModalVisible] = useState(false);
  const [items, setItems] = useState([
    {label: '10', value: '10'},
    {label: '20', value: '20'},
    {label: '30', value: '30'},
    {label: '50', value: '50'},
    {label: '75', value: '75'},
    {label: '100', value: '100'},
  ]);
  const {state, fillFromState, setType} = useCreateOrderStore();
  const [selectedOrders, setSelectedOrders] = useState<OrderItem[]>([]);
  const [missingVolumeWeightOrders, setMissingVolumeWeightOrders] = useState<
    OrderItem[]
  >([]);

  const [filterForm, setFilterForm] = useState<{
    dropName: string;
    orderId: string;
    orderLive: boolean;
    phoneNumber: string;
    referenceNumber: string;
    status: string | null;
  }>({
    dropName: '',
    orderId: '',
    orderLive: false,
    phoneNumber: '',
    referenceNumber: '',
    status: null,
  });

  const [selectionMode, setSelectionMode] = useState(false);

  const fetchOrders = async (
    refresh: boolean,
    next: boolean,
    page: number,
    body: {
      dropName?: string;
      orderId?: string;
      orderLive: boolean;
      phoneNumber?: string;
      referenceNumber?: string;
      status: string | null;
    },
  ) => {
    try {
      if (refresh)
        setLoading(prev => ({...prev, refreshbookmyOrderLoading: true}));
      else if (next)
        setLoading(prev => ({...prev, loadMorebookmyOrderLoading: true}));
      else setLoading(prev => ({...prev, bookmyOrderLoading: true}));
      const response = await CreateOrderApi.getBookmyOrder(
        body,
        page,
        pageSize,
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
    await fetchOrders(false, true, pagination?.currentPage, filterForm);
  };

  const onRefresh = async () => {
    await fetchOrders(true, false, 0, filterForm);
  };

  const deleteMenifestOrder = async (id: string) => {
    const response = await CreateOrderApi.deleteOrder(id);

    if (response.code === 200 && response?.data?.statusCode === 200) {
      showToast(response?.data?.message || 'Manifest deleted.!');
      onRefresh();
    } else {
      showToast(response?.data?.message || 'Manifest Not deleted!');
    }
  };

  const applyFilter = async () => {
    setSelectedOrders([]);
    setMissingVolumeWeightOrders([]);
    setFilterModalVisible(false);
    await fetchOrders(false, false, 0, filterForm);
  };

  // Utils functions

  const handleEdit = (item: any) => {
    setType('edit');
    fillFromState(item);
    navigate('EditOrderScreen');
  };

  const handlePay = (id: string) => {
    navigate('RateScreen', {
      id: id,
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Order', 'Are you sure you want to delete this order?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMenifestOrder(id),
      },
    ]);
  };
  const handlePress = (item: any) => {
    if (selectionMode && selectedOrders.length > 0) {
      toggleSelectOrder(item);
    } else {
      navigate('OrderDetailsScreen', {
        orderDetailsData: item,
      });
    }
  };

  const toggleSelectOrder = (id: any) => {
    setSelectionMode(true);
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
      setSelectionMode(false);
    } else {
      setSelectedOrders(orders);
      setSelectionMode(true);
    }
  };

  const onHandleRates = () => {
    if (selectedOrders.length <= 0) {
      showToast('Please Select Multiple Orders');
      return;
    }
    const missingWeightOrders = selectedOrders.filter(
      (item: any) => !item?.volumentricWeight || item.volumentricWeight === 0,
    );

    if (missingWeightOrders.length > 0) {
      setMissingVolumeWeightOrders(missingWeightOrders);
      setModalVisible(true);
      return;
    }

    // setMissingVolumeWeightOrders([]);
    // setSelectedOrders([]);

    navigate('GetRatesScreen', {
      ids: selectedOrders.flatMap(item => item.id),
    });
  };

  return {
    handleLoadMore,
    orders,
    onRefresh,
    loading,
    fetchRates,
    fetchOrders,
    ratesData,
    deleteMenifestOrder,
    pagination,
    pageSize,
    setPageSize,
    open,
    setOpen,
    modalVisible,
    setModalVisible,
    items,
    setItems,
    state,
    fillFromState,
    setType,
    selectedOrders,
    setSelectedOrders,
    missingVolumeWeightOrders,
    setMissingVolumeWeightOrders,
    selectionMode,
    setSelectionMode,
    filterForm,
    setFilterForm,
    handleEdit,
    handlePay,
    handleDelete,
    handlePress,
    toggleSelectAll,
    onHandleRates,
    toggleSelectOrder,
    filtermodalVisible,
    setFilterModalVisible,
    applyFilter,
  };
};

export default useBookmyOrderAndRateService;
