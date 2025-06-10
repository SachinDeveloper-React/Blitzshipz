import {Alert, Platform, StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useAuthStore,
  useProfileAddressDataStore,
  useProfileDataStore,
} from '../../store';
import {ProfileApi, WarehouseApi} from '../../networking';

type Props = {
  initial: boolean;
};

const useProfileService = (props: Props) => {
  const {initial} = props;
  const {user} = useAuthStore();
  const {setUserProfileData, userProfileData} = useProfileDataStore();
  const {addressData, setAddressData} = useProfileAddressDataStore();

  const [loading, setLoading] = useState({
    userProfile: true,
    refreshUserProfile: false,
  });
  const [error, setError] = useState({
    userProfileError: '',
    userWarehouses: '',
  });

  const getProfileDetail = async () => {
    try {
      const response = await ProfileApi.getProfileDetails();
      setUserProfileData(response.data);
    } catch (error: any) {
      console.log(error);
      setError(prev => ({...prev, userProfileError: error.message}));
    }
  };
  const getProfileWarehouses = async () => {
    try {
      if (!user) return;
      const response = await ProfileApi.getProfileWarehouses(user?.id);
      setAddressData(response.data);
    } catch (error: any) {
      console.log(error);
      setError(prev => ({...prev, userProfileError: error.message}));
    }
  };

  const fetchAllData = async () => {
    setLoading(prev => ({...prev, userProfile: true}));
    await Promise.all([getProfileDetail(), getProfileWarehouses()]);
    setLoading(prev => ({...prev, userProfile: false}));
  };
  const onRefresh = async () => {
    setLoading(prev => ({...prev, refreshUserProfile: true}));
    await Promise.all([getProfileDetail(), getProfileWarehouses()]);
    setLoading(prev => ({...prev, refreshUserProfile: false}));
  };

  const deleteWarehouse = async (id: string) => {
    try {
      const response = await WarehouseApi.deleteWareHouse(id);

      if (response.code === 200 && !response.error) {
        onRefresh();
      } else {
        const message = response.data.message ?? 'Unexpected Error';
        showToast(message);
      }
    } catch (error: any) {
      const message = error.message ?? 'Unexpected Error';
      showToast(message);
    }
  };

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.BOTTOM);
    } else {
      Alert.alert(message);
    }
  };

  useEffect(() => {
    initial && fetchAllData();
  }, []);
  return {
    userProfileData,
    addressData,
    loading,
    error,
    onRefresh,
    deleteWarehouse,
  };
};

export default useProfileService;

const styles = StyleSheet.create({});
