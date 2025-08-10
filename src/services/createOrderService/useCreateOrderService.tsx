import {useHeaderHeight} from '@react-navigation/elements';
import {
  useAuthStore,
  useCreateOrderStore,
  useSellerStore,
  useWarehouseStore,
} from '../../store';
import {CreateOrderApi, ProfileApi, WarehouseApi} from '../../networking';
import {useEffect, useState} from 'react';
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
  const {
    type,
    state,
    setOrderField,
    errors,
    setError,
    clearErrors,
    resetOrder,
  } = useCreateOrderStore();

  const {warehouses, setWarehouses} = useWarehouseStore();
  const {
    sellers,
    setSellers,
    sellerError,
    sellerLoading,
    setSellerError,
    setSellerLoading,
  } = useSellerStore();
  const [createOrderLoading, setCreateOrderLoading] = useState(false);

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
      } else {
        setError(
          type === 'pin' ? 'dropPincode' : 'returnPincode',
          'Pincode not found',
        );
        setOrderField('dropCity', '');
        setOrderField('dropState', '');
      }
    } catch (error) {
      console.error('Error fetching city/state:', error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      setCreateOrderLoading(true);
      const payload =
        type === 'create'
          ? {
              fragile: state.fragile,
              paymentMode: state.paymentMode,
              warehouseName: state.warehouseName,
              pickupAddress: state.pickupAddress,
              pickupAlternative_mobile: state.pickupAlternative_mobile,
              pickupCity: state.pickupCity,
              pickupEmail: state.pickupEmail,
              pickupLandmark: state.pickupLandmark,
              pickupMobile: state.pickupMobile,
              pickupName: state.pickupName,
              pickupPincode: state.pickupPincode,
              pickupState: state.pickupState,
              sellerName: state.sellerName,
              sellerAddress: state.sellerAddress,
              returnAddress: state.returnAddress,
              returnAlternative_mobile: state.returnAlternative_mobile,
              returnCity: state.returnCity,
              returnEmail: state.returnEmail,
              returnLandmark: state.returnLandmark,
              returnMobile: state.returnMobile,
              returnName: state.returnName,
              returnPincode: state.returnPincode,
              referenceNumber: state.referenceNumber,
              returnState: state.returnState,
              dropAddress: state.dropAddress,
              dropAlternative_mobile: state.dropAlternative_mobile,
              dropCity: state.dropCity,
              dropEmail: state.dropEmail,
              dropLandmark: state.dropLandmark,
              dropMobile: state.dropMobile,
              dropName: state.dropName,
              dropPincode: state.dropPincode,
              dropState: state.dropState,
              productName: state.productName,
              productPrice: state.productPrice,
              productQuantity: state.productQuantity,
              productCategory: state.productCategory,
              invoiceDate: state.invoiceDate,
              sameReturnOrder: state.sameReturnOrder,
              totalTaxes: state.totalTaxes,
              totalAmount: state.totalAmount,
              actualWeight: state.actualWeight,
              volumentricWeight: state.volumentricWeight,
              l: state.l,
              b: state.b,
              h: state.h,
            }
          : {
              actualWeight: state.actualWeight,
              amount: state.totalAmount,
              b: state.b,
              channel: state.channel,
              channelId: state.channelId,
              createDate: state.createDate,
              deliveryCount: state.deliveryCount,
              dropAddress: state.dropAddress,
              dropAlternative_mobile: state.dropAlternative_mobile,
              dropCity: state.dropCity,
              dropEmail: state.dropEmail,
              dropLandmark: state.dropLandmark,
              dropMobile: state.dropMobile,
              dropName: state.dropName,
              dropPincode: state.dropPincode,
              dropState: state.dropState,
              fragile: state.fragile,
              h: state.h,
              instructions: state.instructions,
              invoiceDate: state.invoiceDate,
              l: state.l,
              modifyDate: state.modifyDate,
              nslCode: state.nslCode,
              orderId: state.orderId,
              orderLive: state.orderLive,
              orderLiveDate: state.orderLiveDate,
              orderResponseId: state.orderResponseId,
              paymentMode: state.paymentMode,
              pickupAddress: state.pickupAddress,
              pickupAlternative_mobile: state.pickupAlternative_mobile,
              pickupCity: state.pickupCity,
              pickupEmail: state.pickupEmail,
              pickupLandmark: state.pickupLandmark,
              pickupMobile: state.pickupMobile,
              pickupName: state.pickupName,
              pickupPincode: state.pickupPincode,
              pickupState: state.pickupState,
              productCategory: state.productCategory,
              productIds: state.productIds,
              productName: state.productName,
              productPrice: state.productPrice,
              productQuantity: state.productQuantity,
              referenceNumber: state.referenceNumber,
              returnAddress: state.returnAddress,
              returnAlternative_mobile: state.returnAlternative_mobile,
              returnCity: state.returnCity,
              returnEmail: state.returnEmail,
              returnLandmark: state.returnLandmark,
              returnMobile: state.returnMobile,
              returnName: state.returnName,
              returnPincode: state.returnPincode,
              returnState: state.returnState,
              reverseMarked: state.reverseMarked,
              rtoMarked: state.rtoMarked,
              sameReturnOrder: state.sameReturnOrder,
              sellerAddress: state.sellerAddress,
              sellerName: state.sellerName,
              status: state.status,
              statusDateTime: state.statusDateTime,
              statusLocation: state.statusLocation,
              statusType: state.statusType,
              totalAmount: state.totalAmount,
              totalTaxes: state.totalTaxes,
              uploadWbn: state.uploadWbn,
              vendorCode: state.vendorCode,
              volumentricWeight: state.volumentricWeight,
              warehouseName: state.warehouseName,
              waybill: state.waybill,
              weightCategory: state.weightCategory,
              zone: state.zone,
            };
      const response =
        type === 'create'
          ? await CreateOrderApi.createOrder(payload as any)
          : await CreateOrderApi.editOrder(state?.id ?? '', payload as any);

      if (response.code === 200) {
        const {statusCode, message} = response.data;

        if (statusCode === 200) {
          showToast(message || 'Order created successfully');
          if (navigation?.canGoBack()) {
            navigation?.pop(3);
            clearErrors();
            resetOrder();

            if (type === 'create') {
              setTimeout(() => {
                navigation.navigate('Drawer', {
                  screen: 'BookmyOrderScreen',
                });
              }, 100);
            }
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
    } finally {
      setCreateOrderLoading(false);
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
    type,
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
    createOrderLoading,
  };
};

export default useCreateOrderService;
