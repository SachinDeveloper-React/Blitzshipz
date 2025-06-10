import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useLostStore} from '../../store';
import {DashboardApi} from '../../networking';

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
        0,
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

  const onRefresh = async () => {
    await getLostOrderList(0, true);
  };
  const loadMore = async () => {
    if (Number(currentPage) < Number(totalPages)) {
      await getLostOrderList(currentPage, false, true);
    }
  };

  useEffect(() => {
    getLostOrderList(0);
  }, []);

  return {currentPage, lostData, onRefresh, loadMore, loading};
};

export default useDashboardLostService;

const styles = StyleSheet.create({});
