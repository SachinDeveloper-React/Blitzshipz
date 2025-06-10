import React, {useEffect} from 'react';
import {useDiscrepancyStore} from '../../store';
import {DiscrepancyApi} from '../../networking';

type Props = {};

const useDiscrepancyService = () => {
  const {
    appendDiscrepancies,
    discrepancies,
    loading,
    setLoading,
    setRefreshLoading,
    refreshLoading,
    pagination,
    setDiscrepancies,
    loadMoreLoading,
    setLoadMoreLoading,
    error,
    setError,
  } = useDiscrepancyStore();

  const fetchData = async ({
    refresh = false,
    page = 0,
    next = false,
  }: {
    refresh?: boolean;
    page?: number;
    next?: boolean;
  }) => {
    try {
      if (refresh) setRefreshLoading(true);
      else if (next) setLoadMoreLoading(true);
      else setLoading(true);
      const response = await DiscrepancyApi.getDiscrepancy(page, 10);

      if (response.code === 200) {
        const paginationData = {
          currentPage: page + 1,
          totalPages: response.data.totalPages,
          pageSize: response.data.size,
          totalItems: response.data.totalElements,
        };

        if (page === 1) {
          setDiscrepancies(response.data.content, paginationData);
        } else {
          appendDiscrepancies(response.data.content, paginationData);
        }
      }
    } catch (err) {
      console.error('Fetch discrepancy error:', err);
    } finally {
      setLoading(false);
      setRefreshLoading(false);
      setLoadMoreLoading(false);
    }
  };

  const onRefresh = () => fetchData({refresh: true, page: 1});
  const loadMore = () =>
    fetchData({refresh: false, page: pagination?.currentPage ?? 1, next: true});
  useEffect(() => {
    fetchData({page: 1});
  }, []);
  return {
    discrepancies,
    loading,
    refreshLoading,
    onRefresh,
    loadMore,
    loadMoreLoading,
  };
};

export default useDiscrepancyService;
