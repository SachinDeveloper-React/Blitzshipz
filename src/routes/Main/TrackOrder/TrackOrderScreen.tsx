import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabParamList} from '../../../navigation';
import {CustomIcons} from '../../../components';
import {FilterModal, OrderTrackCard} from './components';
import {OrderDetails} from '../../../types';
import {useTrackingOrderService} from '../../../services';
import {exportExcel} from '../../../utils/exportExcel';

const TrackOrderScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<BottomTabParamList, 'TrackOrderScreen'>) => {
  const {
    data,
    excelData,
    onRefresh,
    loading,
    onFilter,
    filterApply,
    filter,
    loadMore,
  } = useTrackingOrderService();
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const toggleFilterModal = () => setFilterModalVisible(!filterModalVisible);

  const exportExcelSheet = async () => {
    try {
      if (loading.excelDataLoading) return;
      await exportExcel(excelData || [], 'track');
    } catch (error) {
      console.log('Error on excel ->', error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={exportExcelSheet}>
            {loading.excelDataLoading ? (
              <ActivityIndicator />
            ) : (
              <Image
                source={require('../../../assets/excelImage.png')}
                style={{
                  width: 60,
                  height: 60,
                }}
                resizeMethod="scale"
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, loading]);

  if (loading.trackOrderData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data) {
    return <></>;
  }

  const renderItem: ListRenderItem<OrderDetails> = ({item}) => (
    <OrderTrackCard {...item} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shipments </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={toggleFilterModal}>
          <CustomIcons type="Ionicons" name="filter" size={20} color="#000" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshTrackOrderData}
            onRefresh={() => onRefresh(filterApply ? filter : {status: null})}
          />
        }
        keyExtractor={(item, index) => `${item.waybill}-${index}`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No shipments available.</Text>
        }
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        removeClippedSubviews
        windowSize={10}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={toggleFilterModal}
        applyFilter={onFilter}
      />
    </View>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f6f8fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  filterText: {
    marginLeft: 6,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 130,
    fontWeight: '500',
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#555',
  },
  actions: {
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    paddingTop: 40,
    color: '#888',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f1f1f1',
  },
  filterOptionSelected: {
    backgroundColor: '#2196f3',
  },
  filterOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
