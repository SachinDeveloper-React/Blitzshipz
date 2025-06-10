import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import OrderCard from './components/OrderCards';
import {useCreateOrderService} from '../../../../services';
import {navigate} from '../../../../navigation';
import {NotFound} from '../../../../layout';

const BookmyOrderScreen = () => {
  const {handleLoadMore, orders, loading, onRefresh, fetchOrders} =
    useCreateOrderService();
  const handleEdit = (id: string) => {
    console.log('Edit order', id);
  };

  const handlePay = (id: string) => {
    navigate('RateScreen', {
      id: id,
    });
  };

  const handleDelete = (id: string) => {
    console.log('Delete order', id);
  };
  const handlePress = (item: any) => {
    navigate('OrderDetailsScreen', {
      orderDetailsData: item,
    });
  };

  useEffect(() => {
    fetchOrders(false, false, 0);
  }, []);

  if (loading.bookmyOrderLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <OrderCard
            item={item}
            onEdit={handleEdit}
            onPay={handlePay}
            onDelete={handleDelete}
            onPress={handlePress}
          />
        )}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshbookmyOrderLoading}
            onRefresh={onRefresh}
          />
        }
        initialNumToRender={10}
        updateCellsBatchingPeriod={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NotFound title="No data found" />}
      />
    </SafeAreaView>
  );
};

export default BookmyOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
