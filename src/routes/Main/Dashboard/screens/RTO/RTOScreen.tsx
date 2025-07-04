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
import {formatDate} from '../../../../../utils';
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
  } = useDashboardRTOService();

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowStatusDropdown(false)}>
      <View style={styles.header}>
        <CustomText style={styles.title}>
          {selectedTab} {totalElements || 0}
        </CustomText>

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

      <View
        style={{
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => setIsDatePickerVisible(true)}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <Text style={styles.dateText}>
                {formatDate(dateRange.fromDate as any) || 'Select From Date'}
              </Text>
              <Text style={styles.dateText}>-</Text>
              <Text style={styles.dateText}>
                {formatDate(dateRange.toDate as any) || 'Select To Date'}
              </Text>
            </View>
          </TouchableOpacity>
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
          />
        </View>
        <TouchableOpacity onPress={exportExcelSheet}>
          <Image
            source={require('../../../../../assets/excelImage.png')}
            style={{width: 60, height: 60}}
            resizeMethod="scale"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {loading.rto ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <OrderList
          orders={rtoData as any}
          onRefresh={onRefresh}
          refresh={loading.refreshRTO}
          onLoad={moreLoad}
        />
      )}
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
    padding: 16,
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
