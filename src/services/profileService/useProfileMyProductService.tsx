import React, {useCallback, useLayoutEffect, useState} from 'react';
import {useProfileMyProductDataStore} from '../../store';
import {ProfileApi} from '../../networking';
import {Alert, Platform, ToastAndroid} from 'react-native';
import {goBack} from '../../navigation';

type Props = {};

const useProfileMyProductService = () => {
  const {
    error,
    loading,
    myProduct,
    refreshLoading,
    setError,
    setLoading,
    setMyProductDetailData,
    setRefreshLoading,
  } = useProfileMyProductDataStore();
  const [categories, setCategories] = useState<
    {
      categoryName: string;
      createDate: string;
      id: string;
      modifyDate: string;
    }[]
  >([]);

  const fetchData = useCallback(async (refresh?: boolean) => {
    try {
      if (refresh) setRefreshLoading(true);
      else setLoading(true);
      const response = await ProfileApi.getProfileMyProduct();
      if (response.code === 200 && !response.error) {
        setMyProductDetailData(response.data);
      } else {
        setError('Failed to fetch product details');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshLoading(false);
    }
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await ProfileApi.getCategories();
      setCategories(response.data);
    } catch (error) {}
  };

  const addProduct = async (body: {
    categoryId: string;
    categoryName: string;
    productPrice: string;
    productName: string;
    weight: string;
    tax: string;
    l: string;
    b: string;
    h: string;
    volume: number;
    productCode: string;
  }) => {
    try {
      const response = await ProfileApi.addProduct(body);
      if (response.code === 200) {
        onRefresh();
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            response.data.message ?? 'Add Product Successfully',
            ToastAndroid.BOTTOM,
          );
        } else {
          Alert.alert(response.data.message ?? 'Add Product Successfully');
        }
        goBack();
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
    } catch (error: any) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          error.message ?? 'Unexpacted Error',
          ToastAndroid.BOTTOM,
        );
      } else {
        Alert.alert(error.message ?? 'Unexpacted Error');
      }
    }
  };
  const editProduct = async (
    id: string,
    body: {
      categoryId: string;
      categoryName: string;
      productPrice: string;
      productName: string;
      weight: string;
      tax: string;
      l: string;
      b: string;
      h: string;
      volume: number;
      productCode: string;
    },
  ) => {
    try {
      const response = await ProfileApi.editProduct(id, body);
      if (response.code === 200) {
        onRefresh();
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            response.data.message ?? 'Edit Product Successfully',
            ToastAndroid.BOTTOM,
          );
        } else {
          Alert.alert(response.data.message ?? 'Edit Product Successfully');
        }
        goBack();
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
    } catch (error: any) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          error.message ?? 'Unexpacted Error',
          ToastAndroid.BOTTOM,
        );
      } else {
        Alert.alert(error.message ?? 'Unexpacted Error');
      }
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      const response = await ProfileApi.deleteProduct(id);
      if (response.code === 200) {
        onRefresh();
        if (Platform.OS === 'android') {
          ToastAndroid.show(
            response.data.message ?? 'Delete Product Successfully',
            ToastAndroid.BOTTOM,
          );
        } else {
          Alert.alert(response.data.message ?? 'Delete Product Successfully');
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
    } catch (error: any) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          error.message ?? 'Unexpacted Error',
          ToastAndroid.BOTTOM,
        );
      } else {
        Alert.alert(error.message ?? 'Unexpacted Error');
      }
    }
  };

  const onRefresh = () => {
    fetchData(true);
  };

  return {
    error,
    loading,
    myProduct,
    refreshLoading,
    setError,
    setLoading,
    setMyProductDetailData,
    setRefreshLoading,
    onRefresh,
    categories,
    fetchCategory,
    fetchData,
    addProduct,
    deleteProduct,
    editProduct,
  };
};

export default useProfileMyProductService;
