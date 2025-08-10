import React, {useCallback, useEffect, useState} from 'react';
import {useRTOStore} from '../../store';
import {DashboardApi, fetchFilterData} from '../../networking';
import {exportExcel, formatDate, showToast} from '../../utils';
import {DateType} from 'react-native-ui-datepicker';
import {debounce} from 'lodash';

const useDashboardRTOService = () => {
  const {
    addRTOData,
    currentPage,
    rtoData,
    setCurrentPage,
    setRTOData,
    setTotalPages,
    totalPages,
    totalElements,
    setTotalElements,
  } = useRTOStore();
  const [loading, setLoading] = useState({
    rto: true,
    refreshRTO: false,
    loadMoreRTO: false,
  });
  const [excelLoading, setExcelLoading] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    'In Transit' | 'Dispatched' | 'Delivered'
  >('In Transit');

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState<{
    toDate: DateType | null;
    fromDate: DateType | null;
  }>({
    toDate: null,
    fromDate: null,
  });

  const getRTODetailsList = async (
    page: number | string,
    refresh?: boolean,
    next?: boolean,
  ) => {
    if (refresh) setLoading(prev => ({...prev, refreshRTO: true}));
    else if (next) setLoading(prev => ({...prev, loadMoreRTO: true}));
    else setLoading(prev => ({...prev, rto: true}));
    try {
      const body = {
        rtoMarked: selectedTab === 'Delivered' ? null : true,
        status: selectedTab === 'Delivered' ? 'RTO' : selectedTab,
      };

      const response = await DashboardApi.orderFilterUser(body, page);

      if (page === 0) {
        setRTOData(response.data.content);
      } else {
        addRTOData(response.data.content);
      }
      setCurrentPage(Number(page) + 1);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
    } finally {
      setLoading(prev => ({
        ...prev,
        rto: false,
        loadMoreRTO: false,
        refreshRTO: false,
      }));
    }
  };

  useEffect(() => {
    getRTODetailsList(0);
  }, [selectedTab]);

  const onRefresh = async () => {
    await getRTODetailsList(0, true, false);
  };
  const moreLoad = async () => {
    if (loading.loadMoreRTO) return;

    if (Number(currentPage) < Number(totalPages)) {
      await getRTODetailsList(currentPage, false, true);
    }
  };

  const debouncedLoadMore = useCallback(debounce(moreLoad, 300), [
    currentPage,
    totalPages,
    loading.loadMoreRTO,
  ]);

  const toggleDropdown = () => setShowStatusDropdown(prev => !prev);

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

      await exportExcel(excelData.data.content || [], 'rto');
      setIsDatePickerVisible(false);
    } catch (error) {
      console.error('Excel export failed:', error);
      showToast('Failed to export data. Please try again.');
    } finally {
      setExcelLoading(false);
    }
  };

  return {
    loading,
    setLoading,
    showStatusDropdown,
    setShowStatusDropdown,
    selectedTab,
    setSelectedTab,
    toggleDropdown,
    rtoData,
    onRefresh,
    moreLoad,
    totalElements,
    exportExcelSheet,
    isDatePickerVisible,
    setIsDatePickerVisible,
    dateRange,
    setDateRange,
    excelLoading,
    debouncedLoadMore,
  };
};

export default useDashboardRTOService;
