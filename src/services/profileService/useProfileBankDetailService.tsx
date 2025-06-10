import React, {useEffect, useState} from 'react';
import {useAuthStore, useProfileBankDetailDataStore} from '../../store';
import {ProfileApi} from '../../networking';
import ImagePickerService from '../ImagePickerService';
import {Asset} from 'react-native-image-picker';
import {showToast} from '../../utils';

type Props = {};

const useProfileBankDetailService = () => {
  const {user} = useAuthStore();
  const {bankDetailData, setBankDetailData, setSingleValue} =
    useProfileBankDetailDataStore();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageData, setImageData] = useState<Asset>();
  const [loading, setLoading] = useState({
    bankDetail: true,
    refreshBankDetail: false,
  });
  const [error, setError] = useState({
    bankDetailError: '',
  });

  const getBankDetails = async (refresh?: boolean) => {
    try {
      if (!user) return;
      if (refresh) setLoading(prev => ({...prev, refreshBankDetail: true}));
      else setLoading(prev => ({...prev, bankDetail: true}));
      const response = await ProfileApi.getProfileBankDetails(user?.id);
      setBankDetailData(response.data);
    } catch (error: any) {
      console.log(error);
      setError(prev => ({...prev, bankDetailError: error.message}));
    } finally {
      setLoading(prev => ({
        ...prev,
        bankDetail: false,
        refreshBankDetail: false,
      }));
    }
  };

  const onRefresh = async () => {
    await getBankDetails(true);
  };

  const handleSelectImage = () => {
    ImagePickerService.pickImageWithPrompt(image => {
      if (image?.uri) {
        setImageUri(image.uri);
        setImageData(image);
      }
    });
  };

  const handleBankDetails = async () => {
    if (bankDetailData?.verify) {
      showToast('Post verification details can not be updated!');
      return;
    }
    try {
      const response = await ProfileApi.editBankDetails({
        beneficiaryName: bankDetailData?.beneficiaryName ?? '',
        accountNumber: bankDetailData?.accountNumber ?? '',
        accountType: bankDetailData?.accountType ?? '',
        bankName: bankDetailData?.bankName ?? '',
        ifscCode: bankDetailData?.ifscCode ?? '',
        ...(imageData && {documents: imageData}),
      });

      if (response.code === 200 && !response.error) {
        if (response.data.statusCode !== 200) {
          showToast(
            response?.data?.message ?? 'Operation failed. Please try again.',
          );
          return;
        }
        showToast(
          response?.data?.message ?? 'Operation completed successfully.',
        );
      } else {
        showToast(
          response?.data?.message ??
            'Something went wrong. Please try again later.',
        );
      }
    } catch (error: any) {
      showToast(
        error?.message ?? 'An unexpected error occurred. Please try again.',
      );
    }
  };
  useEffect(() => {
    getBankDetails();
  }, []);

  return {
    bankDetailData,
    loading,
    onRefresh,
    handleSelectImage,
    imageUri,
    setSingleValue,
    handleBankDetails,
  };
};

export default useProfileBankDetailService;
