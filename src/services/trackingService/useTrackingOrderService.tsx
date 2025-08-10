import React, {useEffect, useState} from 'react';
import {useTrackingOrderStore} from '../../store';
import {TrackingApi} from '../../networking';
import {DateType} from 'react-native-ui-datepicker';

const useTrackingOrderService = () => {
  const {
    data,
    filter,
    currentPage,
    setTrackingOrderData,
    addTrackingOrderData,
    filterApply,
    setCurrentPage,
    setTotalElements,
    setTotalPages,
    clearFilter,
    setFilter,
    setFilterApply,
    clearTrackingOrderData,
    totalElements,
    totalPages,
  } = useTrackingOrderStore();

  const [loading, setLoading] = useState({
    trackOrderData: false,
    refreshTrackOrderData: false,
    loadMoreTrackOrderData: false,
    excelDataLoading: false,
  });

  const [excelData, setExcelData] = useState([]);
  const [excelLoading, setExcelLoading] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateRange, setDateRange] = useState<{
    toDate: DateType | null;
    fromDate: DateType | null;
  }>({
    toDate: null,
    fromDate: null,
  });

  const trackOrderDeatils = async (
    body: {
      day?: number;
      fromDate?: DateType | null;
      orderId?: string;
      paymentMode?: string;
      phoneNumber?: string;
      productCategory?: string;
      referenceNumber?: string;
      status?: string | null;
      toDate?: DateType | null;
      vendorCode?: string;
      waybill?: string;
    },
    page: number,
    refresh?: boolean,
    next?: boolean,
  ) => {
    try {
      if (refresh) setLoading(prev => ({...prev, refreshTrackOrderData: true}));
      else if (next)
        setLoading(prev => ({...prev, loadMoreTrackOrderData: true}));
      else setLoading(prev => ({...prev, trackOrderData: true}));

      const response = await TrackingApi.trackOrderListWithFilter(body, page);

      if (response.code === 200 && !response.error) {
        page === 0
          ? setTrackingOrderData(response.data.content)
          : addTrackingOrderData(response.data.content);
        setCurrentPage(page + 1);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.log(`DEBUG: ${error}`);
    } finally {
      setLoading(prev => ({
        ...prev,
        refreshTrackOrderData: false,
        trackOrderData: false,
        loadMoreTrackOrderData: false,
      }));
    }
  };

  const trackOrderDeatilsForExcel = async (body: {
    day?: number;
    fromDate?: Date | null;
    orderId?: string;
    paymentMode?: string;
    phoneNumber?: string;
    productCategory?: string;
    referenceNumber?: string;
    status?: string | null;
    toDate?: Date | null;
    vendorCode?: string;
    waybill?: string;
  }) => {
    try {
      setLoading(prev => ({
        ...prev,
        excelDataLoading: true,
      }));
      const response = await TrackingApi.trackOrderListWithExcelSheet(body, 0);

      if (response.code === 200 && !response.error) {
        setExcelData(response.data.content);
      } else {
        setExcelData([]);
      }
    } catch (error) {
      console.log(`DEBUG: ${error}`);
      setExcelData([]);
    } finally {
      setLoading(prev => ({
        ...prev,
        excelDataLoading: false,
      }));
    }
  };

  const onRefresh = (body: {
    day?: number;
    fromDate?: DateType | null;
    orderId?: string;
    paymentMode?: string;
    phoneNumber?: string;
    productCategory?: string;
    referenceNumber?: string;
    status?: string | null;
    toDate?: DateType | null;
    vendorCode?: string;
    waybill?: string;
  }) => {
    trackOrderDeatils(body, 0, true);
  };

  const onFilter = async (body: {
    day?: number;
    fromDate?: DateType | null;
    orderId?: string;
    paymentMode?: string;
    phoneNumber?: string;
    productCategory?: string;
    referenceNumber?: string;
    status?: string | null;
    toDate?: DateType | null;
    vendorCode?: string;
    waybill?: string;
  }) => {
    await trackOrderDeatils(body, 0);
  };

  const loadMore = () => {
    trackOrderDeatils(
      filterApply ? filter : {status: null},
      currentPage,
      false,
      true,
    );
  };
  useEffect(() => {
    (async () => {
      await trackOrderDeatils({status: null}, 0);
    })();
  }, []);

  return {
    data,
    onRefresh,
    loading,
    filter,
    filterApply,
    onFilter,
    loadMore,
    excelData,
    clearFilter,
    setFilter,
    setFilterApply,
    clearTrackingOrderData,
    totalElements,
    totalPages,
    excelLoading,
    setExcelLoading,
    isDatePickerVisible,
    setIsDatePickerVisible,
    dateRange,
    setDateRange,
    setLoading,
  };
};

export default useTrackingOrderService;
