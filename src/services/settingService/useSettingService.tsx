import {Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTicketStore} from '../../store';
import {SettingApi} from '../../networking';
import {categories} from '../../routes/Settings/Support/components/helper';

type Props = {
  initial: boolean;
};

const useSettingService = (props: Props) => {
  const {initial} = props;
  const {
    setTickets,
    tickets,
    loading,
    setLoading,
    refreshLoading,
    setRefreshLoading,
    setError,
    error,
  } = useTicketStore();
  const [raisedTicket, setRaisedTicket] = useState({
    category: categories[0],
    subCategory: '',
    awbNumber: '',
    description: '',
    loadingTicket: false,
  });

  const resetInputs = () => {
    setRaisedTicket(prev => ({
      ...prev,
      category: categories[0],
      awbNumber: '',
      description: '',
      subCategory: '',
      loadingTicket: false,
    }));
  };
  const handleInputs = (
    type: 'category' | 'subCategory' | 'awbNumber' | 'description',
    text: (typeof categories)[0] | string,
  ) => {
    setRaisedTicket(prev => ({...prev, [type]: text}));
  };

  const onSubmit = async () => {
    if (
      !raisedTicket.category?.title?.trim() ||
      !raisedTicket.subCategory?.trim() ||
      !raisedTicket.awbNumber?.trim() ||
      !raisedTicket.description?.trim()
    ) {
      Alert.alert('All fields are required.');
      return;
    }

    try {
      setRaisedTicket(prev => ({...prev, loadingTicket: true}));
      const body = {
        awbNumber: raisedTicket.awbNumber.trim(),
        category: raisedTicket.category.title.trim(),
        subCategory: raisedTicket.subCategory.trim(),
        description: raisedTicket.description.trim(),
      };
      const response = await SettingApi.raisedTicket(body);
      if (response.code === 200 && !response.error) {
        Alert.alert('✅ Success', 'Your ticket has been raised.');
        setRaisedTicket(prev => ({
          ...prev,
          category: categories[0],
          awbNumber: '',
          description: '',
          subCategory: '',
        }));
        onRefresh();
      } else {
        Alert.alert('❌ Error', response.data || 'Ticket could not be raised.');
      }
    } catch (error) {
      Alert.alert('⚠️ Error', 'Something went wrong while raising the ticket.');
    } finally {
      setRaisedTicket(prev => ({...prev, loadingTicket: false}));
    }
  };

  const getTicketList = async (refresh?: boolean) => {
    if (refresh) setRefreshLoading(true);
    else setLoading(true);
    try {
      const body = {
        status: null,
        category: '',
        subCategory: '',
        orderId: '',
        awbNumber: '',
        createdDateFrom: '',
        createdDateTo: '',
        ticketNumber: '',
      };
      const response = await SettingApi.getTicketList(body);
      if (response.code === 200) {
        setTickets(response.data.data.content);
      } else {
        console.log('DEBUG: Response give a error');
        setError('Something went wrong.');
      }
    } catch (error) {
      console.log('DEBUG: Response give a error', error);
      setError('Something went wrong.');
    } finally {
      setRefreshLoading(false);
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    await getTicketList(true);
  };

  useEffect(() => {
    if (initial) {
      getTicketList();
    }
  }, []);
  return {
    tickets,
    refreshLoading,
    loading,
    error,
    onRefresh,
    handleInputs,
    onSubmit,
    raisedTicket,
    resetInputs,
  };
};

export default useSettingService;
