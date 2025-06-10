import {
  useDasboardStore,
  useDashboardFilterStore,
  useFundStore,
} from '../../store';
import {DashboardApi, FundApi} from '../../networking';
import {useEffect, useState} from 'react';

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
        await orderFilterUser(body, currentPage, false, true);
        break;
      case 'CancelledFilterUser':
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
      const [overview, graph, revenue, balance] = await Promise.all([
        DashboardApi.overviewOrder(),
        DashboardApi.orderDataGraph(formattedStateDate, formattedEndDate),
        DashboardApi.orderDataRevenue(formattedStateDate, formattedEndDate),
        FundApi.getBalance(),
      ]);

      const overviewResponseData = [
        {
          title: 'Total Orders',
          count: overview.data.data.totalOrder,
          icon: 'truck',
          color: '#6B7FD7',
        },
        {
          title: 'Live Orders',
          count: overview.data.data.inTransitOrder,
          icon: 'truck',
          color: '#F4C03E',
        },
        {
          title: 'Pickup Scheduled',
          count: overview.data.data.pickupScheduleOrder,
          icon: 'truck',
          color: '#7C4DFF',
        },
        {
          title: 'Fulfilled Orders',
          count: overview.data.data.deliveredOrder,
          icon: 'truck',
          color: '#4CAF50',
        },
        {
          title: 'Non Delivered',
          count: overview.data.data.nonDeliveredOrder || '--', // Fix it
          icon: 'truck',
          color: '#9E9E9E',
        },
        {
          title: 'Cancelled Orders',
          count: overview.data.data.canceledOrder,
          icon: 'truck',
          color: '#1E88E5',
        },
        {
          title: 'Return Orders',
          count: overview.data.data.returnOrder,
          icon: 'truck',
          color: '#FF7043',
        },
        {
          title: "Today's Orders",
          count: overview.data.data.todayOrder || '--',
          icon: 'truck',
          color: '#E91E63',
        },
      ];
      const paiData = [
        {
          key: 'Live',
          value: overview.data.data.inTransitOrder,
          color: '#7bbae7',
        },
        {
          key: 'Pickup Scheduled',
          value: overview.data.data.pickupScheduleOrder,
          color: '#6736fe',
        },
        {
          key: 'Fulfilled',
          value: overview.data.data.deliveredOrder,
          color: '#34b579',
        },
        {
          key: 'Non Delivered',
          value: overview.data.data.nonDeliveredOrder,
          color: '#fe6484',
        },
        {
          key: 'Cancelled',
          value: overview.data.data.canceledOrder,
          color: '#5f9fa0',
        },
        {
          key: 'Return',
          value: overview.data.data.returnOrder,
          color: '#c97e7d',
        },
      ];
      setRevenueData(revenue.data.data?.reverse());
      setOverviewData(overviewResponseData);
      setPaiChartData(paiData);
      setGraphData(graph.data.data);
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
  };
};

export default useDashboardService;
