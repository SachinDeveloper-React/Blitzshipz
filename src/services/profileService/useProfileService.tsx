import {Alert, Platform, StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useAuthStore,
  useProfileAddressDataStore,
  useProfileDataStore,
} from '../../store';
import {ProfileApi, WarehouseApi} from '../../networking';
import {Asset} from 'react-native-image-picker';

type Props = {
  initial: boolean;
};

const useProfileService = (props: Props) => {
  const {initial} = props;
  const {user} = useAuthStore();
  const {
    setUserProfileData,
    userProfileData,
    setUserProfileDocData,
    userProfileDoc,
  } = useProfileDataStore();
  const {addressData, setAddressData} = useProfileAddressDataStore();

  const [loading, setLoading] = useState({
    userProfile: true,
    refreshUserProfile: false,
    profileImage: false,
  });
  const [error, setError] = useState({
    userProfileError: '',
    userWarehouses: '',
    profileImageError: '',
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
  const getProfileDocs = async () => {
    try {
      if (!user) return;
      const response = await ProfileApi.getProfileDocs();

      if (response.code === 200) {
        setUserProfileDocData(response.data);
      } else {
        setUserProfileDocData(null);
      }
    } catch (error: any) {
      console.log(error);
      setError(prev => ({...prev, userProfileError: error.message}));
    }
  };

  const fetchAllData = async () => {
    setLoading(prev => ({...prev, userProfile: true}));
    await Promise.all([
      getProfileDetail(),
      getProfileDocs(),
      getProfileWarehouses(),
    ]);
    setLoading(prev => ({...prev, userProfile: false}));
  };
  const onRefresh = async () => {
    setLoading(prev => ({...prev, refreshUserProfile: true}));
    await Promise.all([
      getProfileDetail(),
      getProfileDocs(),
      getProfileWarehouses(),
    ]);
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

  const uploadProfileImage = async (document: Asset) => {
    try {
      setLoading({...loading, profileImage: true});
      const body = {
        documents: document,
        id: userProfileData?.userId ?? '',
      };
      const upload = await ProfileApi.updateProfile(body);
      if (upload.code === 200) {
        if (upload.data.statusCode === 200) {
          await getProfileDocs();
        } else {
          showToast('Somthing wrong');
        }
      } else {
        showToast('Somthing wrong');
      }
    } catch (err: any) {
      setError({
        ...error,
        profileImageError: err?.message ?? 'Unxpected Error',
      });
    } finally {
      setLoading({...loading, profileImage: false});
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
    userProfileDoc,
    uploadProfileImage,
  };
};

export default useProfileService;

const styles = StyleSheet.create({});
