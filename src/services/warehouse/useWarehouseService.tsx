import {useEffect, useState} from 'react';
import {WarehouseApi} from '../../networking';
import {Alert, Platform, ToastAndroid} from 'react-native';
import {useProfileService} from '../profileService';
import {goBack} from '../../navigation';

type AddressInfo = {
  name: string;
  email: string;
  address: string;
  pin: string;
  phone: string;
  altPhone: string;
  city: string;
  state: string;
  returnAddress: string;
  returnCity: string;
  returnState: string;
  returnPin: string;
  returnSame: boolean;
  primary: boolean;
};

type AddressField = keyof AddressInfo;
type AddressErrors = Partial<Record<AddressField, string>>;

type Props = {
  type: 'add' | 'edit';
  defaultData?: {
    name: string;
    email: string;
    address: string;
    pin: string;
    phone: string;
    altPhone: string;
    city: string;
    state: string;
    returnAddress: string;
    returnCity: string;
    returnState: string;
    returnPin: string;
    returnSame: boolean;
    primary: boolean;
  };
};
const useWarehouseService = (props: Props) => {
  const {type, defaultData} = props;
  const {onRefresh} = useProfileService({initial: false});
  const [addWarehouse, setAddWarehouse] = useState<AddressInfo>({
    name: '',
    email: '',
    address: '',
    pin: '',
    phone: '',
    altPhone: '',
    city: '',
    state: '',
    returnCity: '',
    returnState: '',
    returnPin: '',
    returnAddress: '',
    returnSame: true,
    primary: false,
  });
  const [errors, setErrors] = useState<AddressErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const updateWarehouseField = (
    field: AddressField,
    value: string | boolean,
  ) => {
    setAddWarehouse(prev => ({...prev, [field]: value}));
    setErrors(prev => ({...prev, [field]: ''}));
  };

  const fetchCityAndStateFromPin = async (
    pin: string,
    type: 'pin' | 'returnPin',
  ) => {
    try {
      const response = await WarehouseApi.fetchCityAndStateFromPin(pin);
      if (response.code === 200) {
        if (type === 'pin') {
          updateWarehouseField('city', response.data.city);
          updateWarehouseField('state', response.data.state);
        } else {
          updateWarehouseField('returnCity', response.data.city);
          updateWarehouseField('returnState', response.data.state);
        }
      }
    } catch (error) {
      console.error('Error fetching city/state:', error);
    }
  };

  const setupPinEffect = (pin: string, type: 'pin' | 'returnPin') => {
    useEffect(() => {
      const timer = setTimeout(() => {
        if (pin.length > 5) {
          fetchCityAndStateFromPin(pin, type);
        }
      }, 500);
      return () => clearTimeout(timer);
    }, [pin]);
  };

  const createWareHouse = async () => {
    try {
      setLoading(true);
      const body =
        type === 'edit'
          ? {
              name: addWarehouse.name,
              email: addWarehouse.email,
              address: addWarehouse.address,
              pin: addWarehouse.pin,
              phone: addWarehouse.phone,
              altPhone: addWarehouse.altPhone,
              city: addWarehouse.city,
              state: addWarehouse.state,
              returnAddress: addWarehouse.returnAddress,
              returnCity: addWarehouse.returnCity,
              returnState: addWarehouse.returnState,
              returnPin: addWarehouse.returnPin,
              returnSame: addWarehouse.returnSame,
              primary: addWarehouse.primary,
            }
          : {
              ...addWarehouse,
            };

      const response =
        type === 'add'
          ? await WarehouseApi.createWareHouse(body)
          : await WarehouseApi.editWareHouse(body);

      console.log('response', response);
      if (response.code === 200) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
        } else {
          Alert.alert(response.data.message);
        }
        if (
          [
            'WareHouse Created Successfully',
            'Warehouse Edited Successfully',
          ].includes(response.data.message)
        ) {
          onRefresh();
          goBack();
        }
      } else {
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            response.data.message ?? 'Unexpacted Error',
            ToastAndroid.BOTTOM,
          );
        } else {
          Alert.alert(response.data.message ?? 'Unexpacted Error');
        }
      }
    } catch (error) {
      console.error('Error creating new warehouse:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateWarehouseInfo = (): boolean => {
    const newErrors: AddressErrors = {};

    if (!addWarehouse.name.trim()) newErrors.name = 'Name is required';
    if (!addWarehouse.email.trim() || !/\S+@\S+\.\S+/.test(addWarehouse.email))
      newErrors.email = 'Valid email is required';
    if (!addWarehouse.address.trim()) newErrors.address = 'Address is required';
    if (!/^\d{6}$/.test(addWarehouse.pin))
      newErrors.pin = '6-digit PIN is required';
    if (!/^\d{10}$/.test(addWarehouse.phone))
      newErrors.phone = 'Valid 10-digit phone is required';
    if (addWarehouse.altPhone && !/^\d{10}$/.test(addWarehouse.altPhone))
      newErrors.altPhone = 'Alternate phone must be 10 digits';
    if (!addWarehouse.returnSame) {
      if (!addWarehouse.returnAddress.trim())
        newErrors.returnAddress = 'Return address is required';
      if (!/^\d{6}$/.test(addWarehouse.returnPin))
        newErrors.returnPin = '6-digit return PIN is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  setupPinEffect(addWarehouse.pin, 'pin');
  setupPinEffect(addWarehouse.returnPin, 'returnPin');

  useEffect(() => {
    if (type === 'edit' && defaultData) {
      setAddWarehouse(defaultData);
    }
  }, []);

  return {
    addWarehouse,
    updateWarehouseField,
    createWareHouse,
    validateWarehouseInfo,
    errors,
    loading,
  };
};

export default useWarehouseService;
