import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {OrderCards} from './components';
import {useBookmyOrderAndRateService} from '../../../../services';
import {navigate} from '../../../../navigation';
import {NotFound} from '../../../../layout';
import {useCreateOrderStore} from '../../../../store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerStackParamList} from '../../../../navigation/types';
import {CustomText} from '../../../../components';

const BookmyOrderScreen = ({
  navigation,
}: NativeStackScreenProps<DrawerStackParamList, 'BookmyOrderScreen'>) => {
  const {
    handleLoadMore,
    orders,
    loading,
    onRefresh,
    fetchOrders,
    deleteMenifestOrder,
  } = useBookmyOrderAndRateService();
  const {state, fillFromState, setType} = useCreateOrderStore();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const handleEdit = (item: any) => {
    setType('edit');
    fillFromState(item);
    navigate('EditOrderScreen');
  };

  const handlePay = (id: string) => {
    navigate('RateScreen', {
      id: id,
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Order', 'Are you sure you want to delete this order?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMenifestOrder(id),
      },
    ]);
  };
  const handlePress = (item: any) => {
    if (selectionMode && selectedOrders.length > 0) {
      toggleSelectOrder(item.id);
    } else {
      navigate('OrderDetailsScreen', {
        orderDetailsData: item,
      });
    }
  };

  const toggleSelectOrder = (id: string) => {
    setSelectionMode(true);
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
      setSelectionMode(false);
    } else {
      const allIds = orders.map(order => order.id);
      setSelectedOrders(allIds);
      setSelectionMode(true);
    }
  };
  useEffect(() => {
    fetchOrders(false, false, 0);
  }, [state]);

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
      <View style={styles.selectionHeader}>
        <TouchableOpacity style={styles.selectAllBox} onPress={toggleSelectAll}>
          <View style={styles.checkbox}>
            {selectedOrders.length === orders.length && (
              <View style={styles.checkboxTick} />
            )}
          </View>
          <CustomText style={styles.selectAllText}>
            {selectedOrders.length} / {orders.length}{' '}
            {selectedOrders.length === orders.length
              ? 'Deselect All'
              : 'Select All'}
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            /* handle get rates */
          }}>
          <CustomText style={styles.getRatesText}>Get Rates</CustomText>
        </TouchableOpacity>
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <OrderCards
            item={item}
            isSelected={selectedOrders.includes(item.id)}
            onSelect={() => toggleSelectOrder(item.id)}
            onEdit={() => handleEdit(item)}
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
  selectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f7f8fa',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    // marginBottom: 20,
  },
  selectAllBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  getRatesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007bff',
  },
});
