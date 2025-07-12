import {useHeaderHeight} from '@react-navigation/elements';
import {
  useAuthStore,
  useCreateOrderStore,
  useSellerStore,
  useWarehouseStore,
} from '../../store';
import {CreateOrderApi, ProfileApi, WarehouseApi} from '../../networking';
import {useEffect} from 'react';
import {
  createDropDetailsSchema,
  createOrderSchema,
  productSchema,
} from '../../validations';
import {goBack, navigate, RootStackParamList} from '../../navigation';
import {showToast} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const useCreateOrderService = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user} = useAuthStore();
  const headerHeight = useHeaderHeight();
  const {state, setOrderField, errors, setError, clearErrors, resetOrder} =
    useCreateOrderStore();
  const {warehouses, setWarehouses} = useWarehouseStore();
  const {
    sellers,
    setSellers,
    sellerError,
    sellerLoading,
    setSellerError,
    setSellerLoading,
  } = useSellerStore();

  // State

  const fetchWarehouse = async () => {
    try {
      const response = await ProfileApi.getProfileWarehouses(user?.id ?? '');

      if (response.code === 200) {
        setWarehouses(response.data);
      } else {
        setWarehouses([]);
        console.warn('Warehouse fetch returned non-200 code:', response.code);
      }
    } catch (error) {
      setWarehouses([]);
      console.error('Failed to fetch warehouses:', error);
    }
  };
  const fetchSeller = async () => {
    try {
      const response = await CreateOrderApi.getSeller(user?.id ?? '');

      if (response.code === 200) {
        setSellers(response.data);
      } else {
        setSellers([]);
        console.warn('Warehouse fetch returned non-200 code:', response.code);
      }
    } catch (error) {
      setSellers([]);
      console.error('Failed to fetch warehouses:', error);
    }
  };

  const fetchCityAndStateFromPin = async (
    pin: string,
    type: 'pin' | 'returnPin',
  ) => {
    try {
      const response = await WarehouseApi.fetchCityAndStateFromPin(pin);
      if (response.code === 200) {
        if (type === 'pin') {
          setOrderField('dropCity', response.data.city);
          setOrderField('dropState', response.data.state);
        } else {
          setOrderField('dropCity', response.data.city);
          setOrderField('dropState', response.data.state);
        }
      }
    } catch (error) {
      console.error('Error fetching city/state:', error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const payload = {...state};
      const response = await CreateOrderApi.createOrder(payload);

      if (response.code === 200) {
        const {statusCode, message} = response.data;

        if (statusCode === 200) {
          showToast(message || 'Order created successfully');
          if (navigation?.canGoBack()) {
            navigation?.pop(2);
            clearErrors();
            resetOrder();
            setTimeout(() => {
              navigation.navigate('Drawer', {
                screen: 'BookmyOrderScreen',
              });
            }, 100);
          }
        } else {
          showToast(message || 'Something went wrong while creating the order');
        }
      } else {
        showToast('Server responded with an unexpected status');
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      showToast('Failed to create order. Please try again later.');
    }
  };

  const handleCreateSeller = async (body: {name: string; address: string}) => {
    try {
      setSellerLoading(true);
      const response = await CreateOrderApi.createSellerDetails(body);
      if (response.code === 200) {
        if (response.data.status == 200) {
          goBack();
          fetchAllData();
        } else {
          showToast(
            response?.data?.message || response?.data || 'Unexpected Error',
          );
          setSellerError(
            response?.data?.message || response?.data || 'Unexpected Error',
          );
        }
      }
    } catch (error: any) {
      setSellerError(error.message);
      showToast(error.message);
    } finally {
      setSellerLoading(false);
    }
  };

  // Handler For Next Step

  const handleToPickup = () => {
    const result = createOrderSchema.validate(state, {abortEarly: false});
    clearErrors();
    if (result.error) {
      result.error.details.forEach(detail => {
        const field = detail.path[0] as string;
        const message = detail.message;
        setError(field, message);
      });
    } else {
      console.log('Validation passed', state);
      navigate('DropingDetailsScreen');
    }
  };
  const handleToDroping = () => {
    const result = createDropDetailsSchema.validate(state, {abortEarly: false});
    clearErrors();
    if (result.error) {
      result.error.details.forEach(detail => {
        const field = detail.path[0] as string;
        const message = detail.message;
        setError(field, message);
      });
    } else {
      console.log('Validation passed', state);
      navigate('ProductDetailsScreen');
    }
  };
  const handleToCreateBooking = () => {
    const result = productSchema.validate(state, {abortEarly: false});
    clearErrors();

    if (result.error) {
      result.error.details.forEach(detail => {
        const field = detail.path[0] as string;
        const message = detail.message;
        setError(field, message);
      });
    } else {
      handleCreateOrder();
    }
  };

  const fetchAllData = async () => {
    await Promise.all([fetchWarehouse(), fetchSeller()]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.dropPincode.length > 5) {
        fetchCityAndStateFromPin(state.dropPincode, 'pin');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [state.dropPincode]);

  return {
    errors,
    state,
    warehouses,
    sellers,
    headerHeight,
    sellerError,
    sellerLoading,
    fetchWarehouse,
    fetchSeller,
    setOrderField,
    handleToPickup,
    handleToDroping,
    handleToCreateBooking,
    handleCreateSeller,
    fetchAllData,
    resetOrder,
  };
};

export default useCreateOrderService;
