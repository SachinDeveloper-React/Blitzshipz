import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../../navigation';
import {useRateListService} from '../../../../../services';
import {CustomText} from '../../../../../components';
import VendorChart from './components/VendorChart';
import VendorList from './components/VendorList';
import {calculateVendorSavings} from '../../../../../utils';
import ShippingMethodCard from './components/ShippingMethodCard';
import OrderSummary from './components/OrderSummary';

type Props = {};

const GetRatesScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'GetRatesScreen'>) => {
  const {
    data,
    error,
    loading,
    getBatchRatesList,
    batchCreateOrder,
    batchLoading,
    batchResponse,
    modalVisible,
    onClose,
  } = useRateListService();

  useEffect(() => {
    getBatchRatesList(route.params.items.flatMap(item => item.id));
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
          batchLoading={batchLoading}
          vendorOptions={data?.vendorTotalStrategy?.vendorOptions}
          onSelect={(
            a: {
              amount: number;
              label: string;
              value: string;
            }[],
            b: {label: string; value: string; amount: number},
          ) => batchCreateOrder(a, b, route.params.items)}
        />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <OrderSummary data={batchResponse} onClose={onClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GetRatesScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // dark transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
