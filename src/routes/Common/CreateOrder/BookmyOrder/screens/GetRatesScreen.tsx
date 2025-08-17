import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../../navigation';
import {useRateListService} from '../../../../../services';
import {CustomText} from '../../../../../components';
import VendorChart from './components/VendorChart';
import VendorList from './components/VendorList';
import {calculateVendorSavings} from '../../../../../utils';
import ShippingMethodCard from './components/ShippingMethodCard';

type Props = {};

const GetRatesScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'GetRatesScreen'>) => {
  console.log('route', route.params.ids);
  const {data, error, loading, getBatchRatesList} = useRateListService();

  useEffect(() => {
    getBatchRatesList(route.params.ids);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={20} />
      </View>
    );
  }

  if (error)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomText variant="subtitle" style={{color: 'red'}}>
          {error}
        </CustomText>
        ;
      </View>
    );

  const savings = calculateVendorSavings(
    data?.vendorTotalStrategy?.vendorOptions,
  );
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 26}}>
        <VendorChart vendorOptions={data?.vendorTotalStrategy?.vendorOptions} />
        <VendorList vendors={savings} />
        <ShippingMethodCard
          vendorOptions={data?.vendorTotalStrategy?.vendorOptions}
        />
      </ScrollView>
    </View>
  );
};

export default GetRatesScreen;

const styles = StyleSheet.create({});
