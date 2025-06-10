import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {OrderCard} from './components';
import {navigate} from '../../../../../navigation';
import {useDashboardService} from '../../../../../services';
import {OrderDetails} from '../../../../../types';
import CustomListing from '../../../../../components/CustomListing';

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

  const renderItem = ({item}: {item: OrderDetails}) => (
    <OrderCard
      order={item}
      onPress={() =>
        navigate('ProductTracking', {
          id: item.id,
          wayBill: item.waybill,
        })
      }
    />
  );

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
  },
  waybill: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e2e2e',
  },
  orderId: {
    fontSize: 13,
    color: '#616161',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  city: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  status: {
    fontSize: 14,
    color: '#b00020',
    marginTop: 4,
  },
  date: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    color: '#007b55',
  },
});

export default CancelledOrders;
