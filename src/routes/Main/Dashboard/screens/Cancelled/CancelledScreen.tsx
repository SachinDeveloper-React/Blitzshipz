import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {OrderCard} from './components';
import {navigate} from '../../../../../navigation';
import {useDashboardService} from '../../../../../services';
import {OrderDetails} from '../../../../../types';
import CustomListing from '../../../../../components/CustomListing';
import {exportExcel} from '../../../../../utils/exportExcel';

const CancelledOrders = () => {
  const {CancelledFilterUser, filterData, loadMore, loading, onRefresh} =
    useDashboardService();
  useEffect(() => {
    CancelledFilterUser('Cancelled', 0, false, false);
  }, []);

  if (loading.cancelfilter) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  const exportExcelSheet = async () => {
    try {
      if (filterData.length < 0) return;
      await exportExcel(filterData || [], 'cancelled');
    } catch (error) {
      console.log('Error on excel ->', error);
    }
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: 16,
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity onPress={exportExcelSheet}>
          <Image
            source={require('../../../../../assets/excelImage.png')}
            style={{width: 60, height: 60}}
            resizeMethod="scale"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <CustomListing
        data={filterData}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshCancelfilter}
            onRefresh={() =>
              onRefresh('CancelledFilterUser', {
                status: 'Cancelled',
              })
            }
          />
        }
        onEndReached={() =>
          loadMore('CancelledFilterUser', {
            status: 'Cancelled',
          })
        }
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default CancelledOrders;
