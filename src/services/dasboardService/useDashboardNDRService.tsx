import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNdrStore} from '../../store';
import {DashboardApi, fetchFilterData} from '../../networking';
import {exportExcel, formatDate, showToast} from '../../utils';
import {DateType} from 'react-native-ui-datepicker';

type Props = {};

const useDashboardNDRService = () => {
  const {
    ndrOrderList,
    setNdrOrderList,
    setStatusNDR,
    setTotalNDR,
    statusNDR,
    totalNDR,
  } = useNdrStore();
  const [loading, setLoading] = useState({
    ndr: true,
    refreshNdr: false,
  });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState<{
    toDate: DateType | null;
    fromDate: DateType | null;
  }>({
    toDate: null,
    fromDate: null,
  });

  const [searchText, setSearchText] = useState('');

  const fetchNdrDetails = async (refresh?: boolean) => {
    if (refresh) setLoading(prev => ({...prev, refreshNdr: true}));
    else setLoading(prev => ({...prev, ndr: true}));
    try {
      const body = {
        day: 0,
        fromDate: null,
        orderId: '',
        paymentMode: '',
        phoneNumber: '',
        productCategory: '',
        referenceNumber: '',
        status: 'Pending',
        toDate: null,
        waybill: '',
      };

      const [ndrlist, ndrorderoverview, ndrorderlist] = await Promise.all([
        DashboardApi.getNDRList(),
        DashboardApi.ndrOrdersOverview(),
        fetchFilterData(body),
      ]);

      setTotalNDR(ndrlist.data);
      setStatusNDR(ndrorderoverview.data);
      setNdrOrderList(ndrorderlist.data.content);
    } catch (error) {
      console.log('Error', 'Server');
    } finally {
      setLoading(prev => ({...prev, refreshNdr: false}));
      setLoading(prev => ({...prev, ndr: false}));
    }
  };

  const fetchNDRData = async (body: {
    day: number;
    fromDate: string | null;
    orderId: string;
    paymentMode: string;
    phoneNumber: string;
    productCategory: string;
    referenceNumber: string;
    status: string | null;
    toDate: string | null;
    waybill: string;
  }) => {
    try {
      const ndrorderlist = await fetchFilterData(body);
      setNdrOrderList(ndrorderlist?.data?.content);
    } catch (error) {}
  };

  const onRefresh = async () => {
    await fetchNdrDetails(true);
  };

  const exportExcelSheet = async () => {
    try {
      const body = {
        day: 0,
        fromDate: formatDate(dateRange.fromDate) ?? '',
        orderId: '',
        paymentMode: '',
        phoneNumber: '',
        productCategory: '',
        referenceNumber: '',
        status: null,
        toDate: formatDate(dateRange.toDate) ?? '',
        waybill: '',
      };

      const excelData = await fetchFilterData(body);

      if (excelData.data.content.length <= 0) {
        showToast('No Data Found');
        return;
      }

      await exportExcel(excelData.data.content || [], 'rto');
    } catch (error) {
      console.log('Error on excel ->', error);
    }
  };

  useEffect(() => {
    fetchNdrDetails();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // if (!searchText) return;

      const isOrderId = searchText.startsWith('AT');
      const body = {
        day: 0,
        fromDate: null,
        orderId: isOrderId ? searchText : '',
        paymentMode: '',
        phoneNumber: '',
        productCategory: '',
        referenceNumber: '',
        status: 'Pending',
        toDate: null,
        waybill: !isOrderId ? searchText : '',
      };

      fetchNDRData(body);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  return {
    ndrOrderList,
    statusNDR,
    totalNDR,
    loading,
    onRefresh,
    exportExcelSheet,
    isDatePickerVisible,
    setIsDatePickerVisible,
    dateRange,
    setDateRange,
    searchText,
    setSearchText,
  };
};

export default useDashboardNDRService;
