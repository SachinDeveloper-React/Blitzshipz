import {
  useDasboardStore,
  useDashboardFilterStore,
  useFundStore,
} from '../../store';
import {DashboardApi, FundApi} from '../../networking';
import {useCallback, useEffect, useState} from 'react';
import {debounce} from 'lodash';

type Status =
  | 'Delivered'
  | 'Dispatched'
  | 'In Transit'
  | 'Manifested'
  | 'Cancelled';

const useDashboardService = () => {
  const {
    graphData,
    overviewData,
    setGraphData,
    setOverviewData,
    endDate,
    startDate,
    setEndDate,
    setStartDate,
    revenueData,
    setRevenueData,
    setPickupData,
    pickupData,
  } = useDasboardStore();
  const {balance, updateBalance} = useFundStore();
  const [loading, setLoading] = useState({
    orderfilter: true,
    refreshOrderfilter: false,
    loadMoreOrderfilter: false,
    cancelfilter: true,
    refreshCancelfilter: false,
    loadMoreCancelfilter: false,
    orderLineGraph: true,
    refreshOrderLineGraph: false,
    loadMoreOrderLineGraph: false,
    orderRevenue: true,
    refreshOrderRevenue: false,
    loadMoreOrderRevenue: false,
  });
  const [paiChartData, setPaiChartData] = useState<
    {
      key: string;
      value: any;
      color: string;
    }[]
  >([]);

  const [dashBoardLoading, setDashBoardLoading] = useState({
    loading: false,
    refresh: false,
  });

  const {
    empty,
    filterData,
    setEmpty,
    setTotalPages,
    totalPages,
    setFilterData,
    currentPage,
    setCurrentPages,
    addFilterData,
    setTotalElements,
    totalElements,
  } = useDashboardFilterStore();

  const fetchOrderLineGraph = async (
    formattedStateDate: string,
    formattedEndDate: string,
  ) => {
    try {
      setLoading(prev => ({...prev, orderLineGraph: true}));
      const graph = await DashboardApi.orderDataGraph(
        formattedStateDate,
        formattedEndDate,
      );

      setGraphData(graph.data.data);
    } catch (error) {
      console.error('Failed to fetch line graph data:', error);
    } finally {
      setLoading(prev => ({...prev, orderLineGraph: false}));
    }
  };

  const fetchOrderRevenue = async (
    formattedStateDate: string,
    formattedEndDate: string,
  ) => {
    try {
      setLoading(prev => ({...prev, orderRevenue: true}));
      const revenue = await DashboardApi.orderDataRevenue(
        formattedStateDate,
        formattedEndDate,
      );

      setRevenueData(revenue.data.data?.reverse());
    } catch (error) {
      console.error('Failed to fetch line graph data:', error);
    } finally {
      setLoading(prev => ({...prev, orderRevenue: false}));
    }
  };

  const orderFilterUser = async (
    body: {
      waybill: string;
      status: Status;
      rtoMarked: boolean | null;
      orderLive: boolean | null;
    },
    page: number | string,
    refresh?: boolean,
    next?: boolean,
  ) => {
    try {
      if (refresh) {
        setLoading(prev => ({...prev, refreshOrderfilter: true}));
      } else if (next) {
        setLoading(prev => ({...prev, loadMoreOrderfilter: true}));
      } else setLoading(prev => ({...prev, orderfilter: true}));
      const orderFilter = await DashboardApi.orderFilterUser(body, page);

      if (page === 0) {
        setFilterData(orderFilter.data.content);
        setEmpty(orderFilter.data.empty);
        setTotalPages(orderFilter.data.totalPages);
        setTotalElements(orderFilter.data.totalElements);
        setCurrentPages(Number(page) + 1);
      } else {
        addFilterData(orderFilter.data.content, Number(page) + 1);
      }
    } catch (error) {
      console.error('Failed to fetch line graph data:', error);
    } finally {
      setLoading(prev => ({
        ...prev,
        refreshOrderfilter: false,
        loadMoreOrderfilter: false,
        orderfilter: false,
      }));
    }
  };

  const CancelledFilterUser = async (
    status: 'Cancelled',
    page: number | string,
    refresh?: boolean,
    next?: boolean,
  ) => {
    try {
      if (refresh) {
        setLoading(prev => ({...prev, refreshCancelfilter: true}));
      } else if (next) {
        setLoading(prev => ({...prev, loadMoreCancelfilter: true}));
      } else {
        setLoading(prev => ({...prev, cancelfilter: true}));
      }
      const orderFilter = await DashboardApi.orderFilterUser(
        {status: status},
        page,
      );

      if (page === 0) {
        setFilterData(orderFilter.data.content);
        setEmpty(orderFilter.data.empty);
        setTotalPages(orderFilter.data.totalPages);
        setCurrentPages(Number(page) + 1);
      } else {
        addFilterData(orderFilter.data.content, Number(page) + 1);
      }
    } catch (error) {
      console.error('Failed to fetch line graph data:', error);
    } finally {
      setLoading(prev => ({
        ...prev,
        refreshCancelfilter: false,
        loadMoreCancelfilter: false,
        cancelfilter: false,
      }));
    }
  };

  const loadMore = async (
    type: 'orderFilterUser' | 'CancelledFilterUser',
    body: any,
  ) => {
    switch (type) {
      case 'orderFilterUser':
        if (loading.loadMoreOrderfilter) return;
        await orderFilterUser(body, currentPage, false, true);
        break;
      case 'CancelledFilterUser':
        if (loading.loadMoreCancelfilter) return;
        await CancelledFilterUser(
          body?.status as 'Cancelled',
          currentPage,
          false,
          true,
        );
        break;
      default:
        break;
    }
  };

  const debouncedCancelLoadMore = useCallback(
    debounce(() => {
      if (currentPage >= totalPages) return;
      loadMore('CancelledFilterUser', {
        status: 'Cancelled',
      });
    }, 300),
    [currentPage, totalPages, loading.loadMoreCancelfilter],
  );
  const debouncedOrderLoadMore = useCallback(
    debounce(
      () =>
        loadMore('orderFilterUser', {
          status: 'Order',
        }),
      300,
    ),
    [currentPage, totalPages, loading.loadMoreOrderfilter],
  );
  const onRefresh = async (
    type: 'orderFilterUser' | 'CancelledFilterUser',
    body: any,
  ) => {
    switch (type) {
      case 'orderFilterUser':
        await orderFilterUser(body, 0, true);
        break;
      case 'CancelledFilterUser':
        await CancelledFilterUser(body?.status as 'Cancelled', 0, true);
        break;
      default:
        break;
    }
  };

  const fetchDashboardData = async (refresh?: boolean) => {
    if (refresh) setDashBoardLoading(prev => ({...prev, refresh: true}));
    else setDashBoardLoading(prev => ({...prev, loading: true}));

    const formattedStateDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    try {
      const [overview, zoneDistributer, graph, revenue, pickup, balance] =
        await Promise.all([
          DashboardApi.overviewOrder(),
          DashboardApi.zoneDistributer(),
          DashboardApi.orderDataGraph(formattedStateDate, formattedEndDate),
          DashboardApi.orderDataRevenue(formattedStateDate, formattedEndDate),
          DashboardApi.pickedUpDetails(),
          FundApi.getBalance(),
        ]);

      let overviewResponseData = [];
      let paiData = [];
      if (overview.code === 200) {
        if (overview.data.status === 200) {
          overviewResponseData.push(
            ...[
              {
                title: 'Total Orders',
                count: overview.data.data.totalOrder || '--',
                icon: 'truck',
                color: '#6B7FD7',
              },
              {
                title: 'Live Orders',
                count: overview.data.data.inTransitOrder || '--',
                icon: 'truck',
                color: '#F4C03E',
              },
              {
                title: 'Pickup Scheduled',
                count: overview.data.data.pickupScheduleOrder || '--',
                icon: 'truck',
                color: '#7C4DFF',
              },
              {
                title: 'Fulfilled Orders',
                count: overview.data.data.deliveredOrder || '--',
                icon: 'truck',
                color: '#4CAF50',
              },
              {
                title: 'Non Delivered',
                count: overview.data.data.pendingNdrOrder || '--',
                icon: 'truck',
                color: '#9E9E9E',
              },
              {
                title: 'Cancelled Orders',
                count: overview.data.data.canceledOrder || '--',
                icon: 'truck',
                color: '#1E88E5',
              },
              {
                title: 'Return Orders',
                count: overview.data.data.returnOrder || '--',
                icon: 'truck',
                color: '#FF7043',
              },
              {
                title: "Today's Orders",
                count: overview.data.data.todayOrder || '--',
                icon: 'truck',
                color: '#E91E63',
              },
            ],
          );

          console.log(
            'zoneDistributer,',
            zoneDistributer?.data?.zoneDistribution,
          );
          paiData.push(
            ...[
              {
                key: 'ZONEA',
                value: zoneDistributer?.data?.zoneDistribution.ZONEA,
                color: '#7bbae7',
              },
              {
                key: 'ZONEB',
                value: zoneDistributer?.data?.zoneDistribution.ZONEB,
                color: '#6736fe',
              },
              {
                key: 'ZONEC',
                value: zoneDistributer?.data?.zoneDistribution.ZONEC,
                color: '#34b579',
              },
              {
                key: 'ZONED',
                value: zoneDistributer?.data?.zoneDistribution.ZONED,
                color: '#fe6484',
              },
              {
                key: 'ZONEE',
                value: zoneDistributer?.data?.zoneDistribution.ZONEE,
                color: '#5f9fa0',
              },
            ],
          );
        } else {
          overviewResponseData.push(
            ...[
              {
                title: 'Total Orders',
                count: '--',
                icon: 'truck',
                color: '#6B7FD7',
              },
              {
                title: 'Live Orders',
                count: '--',
                icon: 'truck',
                color: '#F4C03E',
              },
              {
                title: 'Pickup Scheduled',
                count: '--',
                icon: 'truck',
                color: '#7C4DFF',
              },
              {
                title: 'Fulfilled Orders',
                count: '--',
                icon: 'truck',
                color: '#4CAF50',
              },
              {
                title: 'Non Delivered',
                count: '--',
                icon: 'truck',
                color: '#9E9E9E',
              },
              {
                title: 'Cancelled Orders',
                count: '--',
                icon: 'truck',
                color: '#1E88E5',
              },
              {
                title: 'Return Orders',
                count: '--',
                icon: 'truck',
                color: '#FF7043',
              },
              {
                title: "Today's Orders",
                count: '--',
                icon: 'truck',
                color: '#E91E63',
              },
            ],
          );

          paiData.push(
            ...[
              {
                key: 'Live',
                value: 0,
                color: '#7bbae7',
              },
              {
                key: 'Pickup Scheduled',
                value: 0,
                color: '#6736fe',
              },
              {
                key: 'Fulfilled',
                value: 0,
                color: '#34b579',
              },
              {
                key: 'Non Delivered',
                value: 0,
                color: '#fe6484',
              },
              {
                key: 'Cancelled',
                value: 0,
                color: '#5f9fa0',
              },
              {
                key: 'Return',
                value: 0,
                color: '#c97e7d',
              },
            ],
          );
        }
      }

      if (revenue.code === 200) {
        if (revenue.data.status === 200) {
          setRevenueData(revenue.data.data?.reverse());
        } else {
          setRevenueData([]);
        }
      }
      if (pickup.code === 200) {
        if (pickup.data.status === 200) {
          setPickupData(pickup.data.data);
        } else {
          setPickupData([]);
        }
      }
      if (graph.code === 200) {
        if (graph.data.status === 200) {
          setGraphData(graph.data.data);
        } else {
          setGraphData([]);
        }
      }

      setOverviewData(overviewResponseData);
      setPaiChartData(paiData);

      if (balance.code === 200 && !balance.error) {
        updateBalance(balance.data ?? 0);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setDashBoardLoading(prev => ({...prev, loading: false, refresh: false}));
    }
  };

  const onDashboardRefresh = () => {
    fetchDashboardData(true);
  };

  useEffect(() => {
    fetchDashboardData(false);
  }, []);

  return {
    graphData,
    overviewData,
    revenueData,
    pickupData,
    setGraphData,
    setOverviewData,
    endDate,
    startDate,
    setEndDate,
    setStartDate,
    fetchOrderLineGraph,
    fetchOrderRevenue,
    setRevenueData,
    orderFilterUser,
    CancelledFilterUser,
    filterData,
    loadMore,
    onRefresh,
    loading,
    onDashboardRefresh,
    dashBoardLoading,
    balance,
    totalElements,
    paiChartData,
    debouncedCancelLoadMore,
    debouncedOrderLoadMore,
  };
};

export default useDashboardService;
