import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  ListRenderItem,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabParamList} from '../../../navigation';
import {
  CustomButton,
  CustomDatePickerModal,
  CustomIcons,
  CustomTextInput,
} from '../../../components';
import {FilterModal, OrderTrackCard} from './components';
import {OrderDetails} from '../../../types';
import {useTrackingOrderService} from '../../../services';
import {exportExcel} from '../../../utils/exportExcel';
import {formatDate, showToast} from '../../../utils';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    setFilter,
    setFilterApply,
    dateRange,
    excelLoading,
    isDatePickerVisible,
    setDateRange,
    setIsDatePickerVisible,
    setLoading,
    clearFilter,
  } = useTrackingOrderService();
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const toggleFilterModal = () => setFilterModalVisible(!filterModalVisible);

  const exportExcelSheet = async () => {
    try {
      if (!filter.fromDate || !filter.toDate) {
        showToast('Please select both a start and end date to continue.');
        return;
      }

      if (loading.excelDataLoading) return;
      onFilter(filter);
      setFilterApply(true);
      // console.log(data?.length);
      // await exportExcel(data || [], 'track');
    } catch (error) {
      console.error('Excel export failed:', error);
      showToast('Failed to export data. Please try again.');
    } finally {
      setLoading(prev => ({
        ...prev,
        excelDataLoading: false,
      }));
      setIsDatePickerVisible(false);
    }
  };
  const exportExcelSheetWithFilter = async () => {
    try {
      if (loading.excelDataLoading) return;
      if (!data) return;
      if (data?.length <= 0) {
        showToast('Data is not availale');
        return;
      }
      await exportExcel(data || [], 'track');
    } catch (error) {
      console.error('Excel export failed:', error);
      showToast('Failed to export data. Please try again.');
    } finally {
      setLoading(prev => ({
        ...prev,
        excelDataLoading: false,
      }));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingRight: 8,
            }}>
            <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
              <Image
                source={require('../../../assets/excelImage.png')}
                style={{
                  width: 60,
                  height: 60,
                }}
                resizeMethod="scale"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!filterApply) return;
                clearFilter();
                setFilterApply(false);
                onFilter({status: null});
              }}>
              <MaterialIcons name="filter-alt-off" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation, loading]);

  const renderItem: ListRenderItem<OrderDetails> = ({item}) => (
    <OrderTrackCard {...item} />
  );

  const hasValue = (val: any) => {
    return val !== null && val !== undefined && val !== '' && val !== 0;
  };

  const hasAnyValue = (obj: any) =>
    Object.values(obj).some(
      val => val !== null && val !== undefined && val !== '' && val !== 0,
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

      <View style={{marginBottom: 10, flexDirection: 'row', gap: 10}}>
        <View style={{flex: 1}}>
          <CustomTextInput
            label="AWB No."
            value={
              filter.orderId.startsWith('ATCOD')
                ? filter.orderId
                : filter.waybill
            }
            keyboardType="default"
            placeholder="AWB No. & Order Id"
            placeholderTextColor="#ccc"
            onChangeText={val => {
              if (val.startsWith('ATCOD')) {
                setFilter({
                  ...filter,
                  orderId: val,
                  waybill: '',
                });
              } else {
                setFilter({
                  ...filter,
                  waybill: val,
                  orderId: '',
                });
              }
            }}
            leftIcon={
              <CustomIcons
                type="MaterialIcons"
                name="local-shipping"
                size={20}
                color="gray"
              />
            }
          />
        </View>
        <CustomButton
          title="Search"
          onPress={() => {
            setFilterApply(true);
            onFilter(filter);
            Keyboard.dismiss();
          }}
        />
      </View>

      {hasAnyValue(filter) && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterCapsultContainer}>
          {Object.entries(filter)
            .filter(([_, value]) => hasValue(value))
            .map(([key, value]) => (
              <View key={key} style={styles.capsule}>
                <Text style={styles.key}>{key}:</Text>
                <Text style={styles.value}>{value?.toString() ?? ''}</Text>
              </View>
            ))}
        </ScrollView>
      )}

      {loading.trackOrderData ? (
        <>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        </>
      ) : (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={loading.refreshTrackOrderData}
                onRefresh={() =>
                  onRefresh(filterApply ? filter : {status: null})
                }
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
        </>
      )}

      <TouchableOpacity
        onPress={exportExcelSheetWithFilter}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#0a2f50',
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}>
        <Foundation name="page-export-csv" size={30} color="#fff" />
      </TouchableOpacity>

      <CustomDatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSubmit={() => {
          exportExcelSheet();
        }}
        date={dateRange}
        loading={excelLoading}
        onSelect={(startDate, endDate) => {
          setFilter({
            fromDate: startDate ? formatDate(startDate) : null,
            toDate: endDate ? formatDate(endDate) : null,
          });
          setDateRange({
            fromDate: startDate ? formatDate(startDate) : null,
            toDate: endDate ? formatDate(endDate) : null,
          });
        }}
        title="Pick Order Date"
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
  filterCapsultContainer: {
    paddingVertical: 8,
    gap: 8,
    height: 50,
    marginBottom: 24,
  },
  capsule: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  key: {
    fontWeight: '600',
    marginRight: 6,
    color: '#555',
    textTransform: 'capitalize',
  },
});
