import {
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useCallback} from 'react';
import {
  CustomDatePickerModal,
  CustomListing,
  ExcelHeader,
} from '../../../../../components';
import {useDashboardLostService} from '../../../../../services';
import {exportExcel, showToast} from '../../../../../utils';

type Props = {};

const LostScreen = (props: Props) => {
  const {
    currentPage,
    lostData,
    loadMore,
    loading,
    onRefresh,
    dateRange,
    excelLoading,
    isDatePickerVisible,
    setDateRange,
    setExcelLoading,
    setIsDatePickerVisible,
    exportExcelSheet,
    debouncedLoadMore,
  } = useDashboardLostService();

  if (loading.lost) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // const exportExcelSheet = async () => {
  //   try {
  //     if (lostData.length < 0) return;
  //     await exportExcel(lostData || [], 'lost');
  //   } catch (error) {
  //     console.error('Excel export failed:', error);
  //     showToast('Failed to export data. Please try again.');
  //   }
  // };

  return (
    <View style={{flex: 1}}>
      <ExcelHeader
        title={lostData.length > 0 ? 'Lost' : 'Order List'}
        onPress={() => setIsDatePickerVisible(true)}
      />
      <CustomListing
        data={lostData}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshLost}
            onRefresh={onRefresh}
          />
        }
        onEndReached={debouncedLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (loading.loadmoreLost) {
            return <ActivityIndicator size="large" />;
          }
        }}
      />

      <CustomDatePickerModal
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onSubmit={() => {
          exportExcelSheet();
        }}
        date={dateRange}
        loading={excelLoading}
        onSelect={(startDate, endDate) => {
          setDateRange({
            fromDate: startDate ? new Date(startDate as any) : null,
            toDate: endDate ? new Date(endDate as any) : null,
          });
        }}
        title="Pick Order Date"
      />
    </View>
  );
};

export default LostScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
