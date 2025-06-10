import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CodApi} from '../../networking';
import {useCodStore} from '../../store';

type Props = {};

const useCodService = () => {
  const {
    setSummary,
    summary,
    appendRemittances,
    remittances,
    setPagination,
    pagination,
    setRemittances,
  } = useCodStore();
  const [loading, setLoading] = useState({
    codLoading: true,
    refreshCodLoading: true,
  });
  const fetchSummary = async () => {
    try {
      const response = await CodApi.codSummary();
      setSummary(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const fetchPaymentUser = async (page: number) => {
    try {
      const response = await CodApi.codPaymentUser(page);

      if (page === 0) {
        setRemittances(response.data.content);
      } else {
        appendRemittances(response.data.content);
      }

      const pagination = {
        currentPage: page + 1,
        totalPages: response.data.totalPages,
        pageSize: response.data.size,
        totalItems: response.data.totalElements,
      };
      setPagination(pagination);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const fetchData = async (refresh?: boolean) => {
    try {
      if (refresh) setLoading(prev => ({...prev, refreshCodLoading: true}));
      else setLoading(prev => ({...prev, codLoading: true}));
      await Promise.all([fetchSummary(), fetchPaymentUser(0)]);
    } catch (error) {
    } finally {
      setLoading(prev => ({
        ...prev,
        refreshCodLoading: false,
        codLoading: false,
      }));
    }
  };

  const loadMore = async () => {
    await fetchPaymentUser(pagination?.currentPage);
  };

  const onRefresh = async () => {
    await fetchData(true);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {summary, loadMore, remittances, onRefresh, loading};
};

export default useCodService;
