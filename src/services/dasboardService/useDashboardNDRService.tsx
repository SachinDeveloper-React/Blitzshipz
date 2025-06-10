import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNdrStore} from '../../store';
import {DashboardApi} from '../../networking';

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

  const fetchNdrDetails = async (refresh?: boolean) => {
    if (refresh) setLoading(prev => ({...prev, refreshNdr: true}));
    else setLoading(prev => ({...prev, ndr: true}));
    try {
      const [ndrlist, ndrorderoverview, ndrorderlist] = await Promise.all([
        DashboardApi.getNDRList(),
        DashboardApi.ndrOrdersOverview(),
        DashboardApi.ndrOrderList(),
      ]);

      setTotalNDR(ndrlist.data);
      setStatusNDR(ndrorderoverview.data);
      setNdrOrderList(ndrorderlist.data);
    } catch (error) {
      console.log('Error', 'Server');
    } finally {
      setLoading(prev => ({...prev, refreshNdr: false}));
      setLoading(prev => ({...prev, ndr: false}));
    }
  };

  const onRefresh = async () => {
    await fetchNdrDetails(true);
  };

  useEffect(() => {
    fetchNdrDetails();
  }, []);

  return {ndrOrderList, statusNDR, totalNDR, loading, onRefresh};
};

export default useDashboardNDRService;

const styles = StyleSheet.create({});
