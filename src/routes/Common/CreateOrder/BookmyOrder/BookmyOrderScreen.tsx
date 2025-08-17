import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DropDownPicker from 'react-native-dropdown-picker';
import {FilterSection, OrderCards} from './components';
import {useBookmyOrderAndRateService} from '../../../../services';
import {NotFound} from '../../../../layout';
import {DrawerStackParamList} from '../../../../navigation/types';
import {CustomButton, CustomIcons, CustomText} from '../../../../components';

import {theme} from '../../../../utils';

const BookmyOrderScreen = ({
  navigation,
}: NativeStackScreenProps<DrawerStackParamList, 'BookmyOrderScreen'>) => {
  const {
    handleLoadMore,
    orders,
    loading,
    onRefresh,
    fetchOrders,
    pagination,
    pageSize,
    setPageSize,
    filterForm,
    items,
    missingVolumeWeightOrders,
    modalVisible,
    open,
    selectedOrders,
    setFilterForm,
    setItems,
    setMissingVolumeWeightOrders,
    setModalVisible,
    setOpen,
    setSelectedOrders,
    state,
    handleDelete,
    handleEdit,
    handlePay,
    handlePress,
    onHandleRates,
    toggleSelectAll,
    toggleSelectOrder,
    filtermodalVisible,
    setFilterModalVisible,
    applyFilter,
  } = useBookmyOrderAndRateService();

  useEffect(() => {
    setMissingVolumeWeightOrders([]);
    setSelectedOrders([]);
    fetchOrders(false, false, 0, filterForm);
  }, [state, pageSize]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setMissingVolumeWeightOrders([]);
        setSelectedOrders([]);
      };
    }, []),
  );
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{marginRight: 15}}
            onPress={() => setFilterModalVisible(true)}>
            <CustomIcons
              name="filter"
              type="Feather"
              size={20}
              color={theme.color.primary}
            />
          </TouchableOpacity>
        ),
      });

      return () => {
        navigation.setOptions({headerRight: undefined});
      };
    }, [navigation]),
  );

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

        <TouchableOpacity onPress={onHandleRates}>
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
            isSelected={selectedOrders.includes(item)}
            onSelect={() => {
              toggleSelectOrder(item);
            }}
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

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          paddingHorizontal: 16,
          paddingVertical: 6,
          paddingBottom: StatusBar.currentHeight,
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: -10,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <View>
          <CustomText>Total Item: {pagination.totalItems}</CustomText>
        </View>
        <View>
          <DropDownPicker
            open={open}
            value={pageSize}
            items={items}
            setOpen={setOpen}
            setValue={setPageSize}
            setItems={setItems}
            style={styles.dropdown}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CustomText variant="title">Missing Weight Details</CustomText>
            <CustomText variant="subtitle" style={{textAlign: 'center'}}>
              These orders are missing actual/volumetric weight:
            </CustomText>

            <View style={{borderWidth: 0.5, borderColor: '#ccc', padding: 10}}>
              {missingVolumeWeightOrders.map((item, i) => {
                return (
                  <CustomText
                    key={i}
                    variant="caption"
                    style={{textAlign: 'center'}}>
                    {item.orderId}
                  </CustomText>
                );
              })}
            </View>

            <CustomText variant="caption" style={{textAlign: 'center'}}>
              Kindly update either the volumetric weight or the actual weight to
              make order live. This will help avoid any potential discrepancies
              in weight
            </CustomText>

            <CustomButton
              title="Ok"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>

      <FilterSection
        filterForm={filterForm}
        setFilterForm={setFilterForm}
        onApply={applyFilter}
        filtermodalVisible={filtermodalVisible}
        setFilterModalVisible={setFilterModalVisible}
        onClose={() => setFilterModalVisible(!filtermodalVisible)}
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
    borderColor: theme.color.primary,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxTick: {
    width: 10,
    height: 10,
    backgroundColor: theme.color.primary,
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
    color: theme.color.primary,
  },
  dropdown: {width: 100, borderColor: '#ccc'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    gap: 10,
  },
});
