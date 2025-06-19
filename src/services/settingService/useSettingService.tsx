import {Alert} from 'react-native';
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {useTicketStore} from '../../store';
import {SettingApi} from '../../networking';
import {categories} from '../../routes/Settings/Support/components/helper';
import {DateType} from 'react-native-ui-datepicker';

type Props = {
  initial: boolean;
};

const useSettingService = ({initial}: Props) => {
  const {
    setTickets,
    appendTickets,
    setPaginationInfo,
    setCurrentPage,
    setLoading,
    setRefreshLoading,
    setLoadMoreLoading,
    setError,
    tickets,
    loading,
    refreshLoading,
    loadMoreLoading,
    error,
    totalPages,
    currentPages,
  } = useTicketStore();

  const [raisedTicket, setRaisedTicket] = useState({
    category: categories[0],
    subCategory: '',
    awbNumber: '',
    description: '',
    loadingTicket: false,
  });

  const [filterInput, setFilterInput] = useState<{
    status: string | null;
    category: string | null;
    subCategory: string;
    orderId: string;
    awbNumber: string;
    createdDateFrom: string;
    createdDateTo: string;
    ticketNumber: string;
  }>({
    status: null,
    category: null,
    subCategory: '',
    orderId: '',
    awbNumber: '',
    createdDateFrom: '',
    createdDateTo: '',
    ticketNumber: '',
  });

  const categoryList = useMemo(
    () => [
      {id: 1, label: 'All', filterOption: null},
      {id: 2, label: 'NDR', filterOption: 'NDR'},
      {id: 3, label: 'Technical', filterOption: 'Technical'},
      {id: 4, label: 'OPS', filterOption: 'OPS'},
      {id: 5, label: 'Finance', filterOption: 'Finance'},
      {id: 6, label: 'Lost', filterOption: 'Lost'},
    ],
    [],
  );

  const filterInputList = useMemo(
    () => [
      {id: 1, label: 'All', filterOption: null},
      {id: 2, label: 'Open', filterOption: 'OPEN'},
      {id: 3, label: 'Raised', filterOption: 'RAISED'},
      {id: 4, label: 'In Progress', filterOption: 'IN_PROGRESS'},
      {id: 5, label: 'Pending', filterOption: 'PENDING'},
      {id: 6, label: 'Resolved', filterOption: 'RESOLVED'},
    ],
    [],
  );

  const resetInputs = useCallback(() => {
    setRaisedTicket({
      category: categories[0],
      subCategory: '',
      awbNumber: '',
      description: '',
      loadingTicket: false,
    });
  }, []);

  const handleInputs = useCallback(
    (
      type: 'category' | 'subCategory' | 'awbNumber' | 'description',
      text: (typeof categories)[0] | string,
    ) => {
      setRaisedTicket(prev => ({...prev, [type]: text}));
    },
    [],
  );

  const handleFilter = useCallback(
    (
      type:
        | 'status'
        | 'category'
        | 'subCategory'
        | 'orderId'
        | 'awbNumber'
        | 'createdDateFrom'
        | 'createdDateTo'
        | 'ticketNumber',
      text: string | null,
    ) => {
      setFilterInput(prev => ({...prev, [type]: text}));
    },
    [],
  );

  const onSubmit = useCallback(async () => {
    const {category, subCategory, awbNumber, description} = raisedTicket;

    if (
      !category?.title?.trim() ||
      !subCategory.trim() ||
      !awbNumber.trim() ||
      !description.trim()
    ) {
      Alert.alert('All fields are required.');
      return;
    }

    try {
      setRaisedTicket(prev => ({...prev, loadingTicket: true}));
      const body = {
        awbNumber: awbNumber.trim(),
        category: category.title.trim(),
        subCategory: subCategory.trim(),
        description: description.trim(),
      };

      const response = await SettingApi.raisedTicket(body);

      if (response.code === 200 && !response.error) {
        Alert.alert('✅ Success', 'Your ticket has been raised.');
        resetInputs();
        onRefresh();
      } else {
        Alert.alert('❌ Error', response.data || 'Ticket could not be raised.');
      }
    } catch (error) {
      Alert.alert('⚠️ Error', 'Something went wrong while raising the ticket.');
    } finally {
      setRaisedTicket(prev => ({...prev, loadingTicket: false}));
    }
  }, [raisedTicket, resetInputs]);

  const getTicketList = useCallback(
    async (
      refresh = false,
      next = false,
      customFilterInput?: typeof filterInput,
    ) => {
      const filters = customFilterInput ?? filterInput;
      const page = next ? currentPages : 0;

      try {
        if (refresh) setRefreshLoading(true);
        else if (next) setLoadMoreLoading(true);
        else setLoading(true);

        const response = await SettingApi.getTicketList(filters, page);

        if (response.code === 200 && response.data.status === 200) {
          const data = response.data.data;

          if (next) appendTickets(data.content);
          else setTickets(data.content);

          setPaginationInfo(data.totalPages, data.totalElements);
          setCurrentPage(page + 1);
        } else {
          setTickets([]);
          setError('Something went wrong.');
        }
      } catch (error) {
        console.log('DEBUG: API call failed', error);
        setError('Something went wrong.');
      } finally {
        setRefreshLoading(false);
        setLoadMoreLoading(false);
        setLoading(false);
      }
    },
    [filterInput, currentPages],
  );

  const loadMore = useCallback(async () => {
    if (currentPages >= totalPages || loadMoreLoading) return;
    await getTicketList(false, true);
  }, [currentPages, totalPages, loadMoreLoading, getTicketList]);

  const onRefresh = useCallback(async () => {
    await getTicketList(true);
  }, [getTicketList]);

  const applyFilter = useCallback(
    async (body: {
      status: string | null;
      category: string | null;
      subCategory: string;
      orderId: string;
      awbNumber: string;
      createdDateFrom: string;
      createdDateTo: string;
      ticketNumber: string;
    }) => {
      await getTicketList(true, false, {
        status: body.status,
        category: body.category,
        subCategory: body.subCategory,
        orderId: body.orderId,
        awbNumber: body.awbNumber,
        createdDateFrom: body.createdDateFrom,
        createdDateTo: body.createdDateTo,
        ticketNumber: body.ticketNumber,
      });
    },
    [getTicketList],
  );

  // Initial load
  useEffect(() => {
    if (!initial) return;
    const timeout = setTimeout(() => {
      getTicketList(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [initial]);

  // Debounced filter change
  useEffect(() => {
    if (!initial) return;

    const timeout = setTimeout(() => {
      getTicketList(true, false, filterInput);
    }, 600);
    return () => clearTimeout(timeout);
  }, [filterInput]);

  return {
    tickets,
    refreshLoading,
    loading,
    error,
    onRefresh,
    handleInputs,
    handleFilter,
    onSubmit,
    raisedTicket,
    resetInputs,
    filterInputList,
    categoryList,
    filterInput,
    loadMore,
    applyFilter,
  };
};

export default useSettingService;
