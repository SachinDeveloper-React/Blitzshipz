import React, {useCallback, useEffect, useState} from 'react';
import {useLostStore} from '../../store';
import {DashboardApi, fetchFilterData} from '../../networking';
import {DateType} from 'react-native-ui-datepicker';
import {exportExcel, formatDate, showToast} from '../../utils';
import debounce from 'lodash.debounce';

type Props = {};

const useDashboardLostService = () => {
  const {
    currentPage,
    lostData,
    setCurrentPage,
    setLostData,
    setTotalPages,
    totalPages,
    addLostData,
  } = useLostStore();

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [excelLoading, setExcelLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{
    toDate: DateType | null;
    fromDate: DateType | null;
  }>({
    toDate: null,
    fromDate: null,
  });

  const [loading, setLoading] = useState({
    lost: true,
    refreshLost: false,
    loadmoreLost: false,
  });

  const getLostOrderList = async (
    page: number | string,
    refresh?: boolean,
    next?: boolean,
  ) => {
    try {
      if (refresh) setLoading(prev => ({...prev, refreshLost: true}));
      else if (next) setLoading(prev => ({...prev, loadmoreLost: true}));
      else setLoading(prev => ({...prev, lost: true}));
      const response = await DashboardApi.orderFilterUser(
        {status: ['LOST']},
        page,
      );
      page === 0
        ? setLostData(response.data.content)
        : addLostData(response.data.content);
      setCurrentPage(Number(page) + 1);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setLoading(prev => ({
        ...prev,
        lost: false,
        loadmoreLost: false,
        refreshLost: false,
      }));
    }
  };

  const exportExcelSheet = async () => {
    try {
      if (!dateRange.fromDate || !dateRange.toDate) {
        showToast('Please select both a start and end date to continue.');
        return;
      }

      setExcelLoading(true);
      const body = {
        day: 0,
        fromDate: formatDate(dateRange.fromDate) ?? '',
        orderId: '',
        paymentMode: '',
        phoneNumber: '',
        productCategory: '',
        referenceNumber: '',
        status: 'RTO',
        toDate: formatDate(dateRange.toDate) ?? '',
        waybill: '',
      };

      const excelData = await fetchFilterData(body);

      if (excelData.data.content.length === 0) {
        showToast('No records available to export.');
        return;
      }

      await exportExcel(excelData.data.content || [], 'lost');
      setIsDatePickerVisible(false);
    } catch (error) {
      console.error('Excel export failed:', error);
      showToast('Failed to export data. Please try again.');
    } finally {
      setExcelLoading(false);
    }
  };

  const onRefresh = async () => {
    await getLostOrderList(0, true);
  };
  const loadMore = async () => {
    if (loading.loadmoreLost) return;
    if (Number(currentPage) < Number(totalPages)) {
      await getLostOrderList(currentPage, false, true);
    }
  };

  const debouncedLoadMore = useCallback(() => {
    debounce(loadMore, 300);
  }, [currentPage, totalPages, loading.loadmoreLost]);

  useEffect(() => {
    getLostOrderList(0);
  }, []);

  return {
    currentPage,
    lostData,
    onRefresh,
    loadMore,
    loading,
    isDatePickerVisible,
    excelLoading,
    dateRange,
    setIsDatePickerVisible,
    setExcelLoading,
    setDateRange,
    exportExcelSheet,
    debouncedLoadMore,
  };
};

export default useDashboardLostService;
