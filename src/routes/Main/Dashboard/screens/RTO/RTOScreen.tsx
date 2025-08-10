import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
  Image,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {useDashboardRTOService} from '../../../../../services';
import {CustomDatePickerModal, CustomText} from '../../../../../components';
import {OrderList} from '../Orders/components';
import {moderateScale} from 'react-native-size-matters';

type Props = {};

const RTOScreen = (props: Props) => {
  const {
    loading,
    selectedTab,
    setSelectedTab,
    setShowStatusDropdown,
    showStatusDropdown,
    toggleDropdown,
    rtoData,
    onRefresh,
    moreLoad,
    totalElements,
    exportExcelSheet,
    dateRange,
    isDatePickerVisible,
    setDateRange,
    setIsDatePickerVisible,
    excelLoading,
    debouncedLoadMore,
  } = useDashboardRTOService();

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowStatusDropdown(false)}>
      <View style={styles.header}>
        <CustomText style={styles.title}>
          {rtoData.length > 0 ? selectedTab : 'Order List'}{' '}
          {totalElements || ''}
        </CustomText>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => setIsDatePickerVisible(true)}>
            <Image
              source={require('../../../../../assets/excelImage.png')}
              style={{width: 50, height: 50}}
              resizeMethod="scale"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleDropdown}>
            <CustomText style={styles.filterToggle}>{selectedTab} ▾</CustomText>
          </TouchableOpacity>
          {showStatusDropdown && (
            <Pressable
              style={styles.dropdown}
              onStartShouldSetResponder={() => true}
              onTouchEnd={e => e.stopPropagation()}>
              <CustomText
                style={{paddingVertical: 10}}
                onPress={() => {
                  setSelectedTab('In Transit');
                  setShowStatusDropdown(false);
                }}>
                In Transit
              </CustomText>
              <CustomText
                style={{paddingVertical: 10}}
                onPress={() => {
                  setSelectedTab('Dispatched');
                  setShowStatusDropdown(false);
                }}>
                Dispatched
              </CustomText>
              <CustomText
                style={{paddingVertical: 10}}
                onPress={() => {
                  setSelectedTab('Delivered');
                  setShowStatusDropdown(false);
                }}>
                Delivered
              </CustomText>
            </Pressable>
          )}
        </View>
      </View>

      {loading.rto ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <OrderList
          orders={rtoData as any}
          onRefresh={onRefresh}
          refresh={loading.refreshRTO}
          onLoad={debouncedLoadMore}
          ListFooterComponent={() => {
            if (loading.loadMoreRTO) {
              return <ActivityIndicator size="small" />;
            }
          }}
        />
      )}

      <CustomDatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        date={dateRange}
        onSelect={(startDate, endDate) => {
          setDateRange({
            fromDate: startDate ? new Date(startDate as any) : null,
            toDate: endDate ? new Date(endDate as any) : null,
          });
        }}
        title="Pick Order Date"
        onSubmit={exportExcelSheet}
        loading={excelLoading}
      />
    </Pressable>
  );
};

export default RTOScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'relative',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    zIndex: 99999999999,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterToggle: {
    color: '#007bff',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    zIndex: 1000,
    elevation: 4,
    alignItems: 'flex-end',
  },
  loader: {
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: moderateScale(10),
    borderRadius: 999,
  },
  dateText: {
    fontSize: moderateScale(10),
    color: '#000',
  },
});
