import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRTOStore} from '../../store';
import {DashboardApi} from '../../networking';

type Props = {};

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
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    'In Transit' | 'Dispatched' | 'Delivered'
  >('In Transit');

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
    if (Number(currentPage) < Number(totalPages)) {
      await getRTODetailsList(currentPage, false, true);
    }
  };

  const toggleDropdown = () => setShowStatusDropdown(prev => !prev);

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
  };
};

export default useDashboardRTOService;

const styles = StyleSheet.create({});
