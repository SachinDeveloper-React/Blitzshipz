import React, {useEffect} from 'react';
import {View, ActivityIndicator, RefreshControl} from 'react-native';
import {useDashboardService} from '../../../../../services';
import {exportExcel} from '../../../../../utils';
import {showToast} from '../../../../../utils';
import {CustomListing, ExcelHeader} from '../../../../../components';

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
  const exportExcelSheet = async () => {
    try {
      if (filterData.length < 0) return;
      await exportExcel(filterData || [], 'cancelled');
    } catch (error) {
      console.error('Excel export failed:', error);
      showToast('Failed to export data. Please try again.');
    }
  };

  return (
    <>
      <ExcelHeader title="Cancelled" onPress={exportExcelSheet} />
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
    </>
  );
};

export default CancelledOrders;
