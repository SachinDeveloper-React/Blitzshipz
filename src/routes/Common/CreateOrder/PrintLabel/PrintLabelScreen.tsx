import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {usePrintLabelService} from '../../../../services';
import {NotFound} from '../../../../layout';
import {CustomCard, CustomText} from '../../../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerStackParamList} from '../../../../navigation/types';
import LabelOptionsModal from './components/LabelOptionsModal';

type Props = {};

const PrintLabelScreen = ({
  navigation,
}: NativeStackScreenProps<DrawerStackParamList, 'PrintLabelScreen'>) => {
  const {
    orders,
    fetchOrders,
    onRefresh,
    handleLoadMore,
    error,
    loading,
    selectedOrders,
    handlePress,
    toggleSelectAll,
    toggleSelectOrder,
    askPageCountAndPrintLabel,
    modalLoading,
    setModalLoading,
    printAllLabel,
    printLabelLoading,
  } = usePrintLabelService();

  useEffect(() => {
    fetchOrders(false, false, 0);
  }, []);

  if (loading.loading) {
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
  if (error) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <CustomText>{error}</CustomText>
      </View>
    );
  }

  const renderItem = ({item}: {item: any}) => {
    return (
      <CustomCard
        order={item}
        isSelected={selectedOrders.includes(item.id)}
        onLongPress={() => toggleSelectOrder(item.id)}
        // onLongPress={() => toggleRaisedModel(String(item.waybill))}
        onPress={() => handlePress(item)}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {orders.length > 0 && (
        <View style={styles.selectionHeader}>
          <TouchableOpacity
            style={styles.selectAllBox}
            onPress={toggleSelectAll}>
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

          {selectedOrders.length > 0 && (
            <TouchableOpacity onPress={askPageCountAndPrintLabel}>
              <CustomText style={styles.getRatesText}>
                Print All Shipping Labels
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={orders}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        contentContainerStyle={styles.container}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={10}
        removeClippedSubviews
        ListFooterComponent={() => {
          return <>{loading.loadMoreLoading ? <ActivityIndicator /> : null}</>;
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshLoading}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<NotFound title="No data found" />}
      />

      <LabelOptionsModal
        visible={modalLoading}
        loading={printLabelLoading}
        onClose={() => setModalLoading(false)}
        onDownload={(perPage, showReturn, showMobile) => {
          printAllLabel(perPage as 1 | 2 | 4);
        }}
      />
    </View>
  );
};

export default PrintLabelScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 36,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
