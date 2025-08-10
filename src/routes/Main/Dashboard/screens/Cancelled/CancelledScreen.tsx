import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, RefreshControl} from 'react-native';
import {useDashboardService} from '../../../../../services';
import {exportExcel, showToast} from '../../../../../utils';
import {CustomListing, ExcelHeader} from '../../../../../components';

const CancelledOrders = () => {
  const {
    CancelledFilterUser,
    filterData,
    loadMore,
    loading,
    onRefresh,
    debouncedCancelLoadMore,
  } = useDashboardService();
  const [excelLoading, setExcelLoading] = useState(false);
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
      setExcelLoading(true);
      await exportExcel(filterData || [], 'cancelled');
    } catch (error) {
      console.error('Excel export failed:', error);
      showToast('Failed to export data. Please try again.');
    } finally {
      setExcelLoading(false);
    }
  };

  return (
    <>
      <ExcelHeader
        loading={excelLoading}
        title={filterData.length > 0 ? 'Cancelled' : 'Order List'}
        onPress={exportExcelSheet}
      />
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
        onEndReached={debouncedCancelLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (loading.loadMoreCancelfilter) {
            return <ActivityIndicator size="large" />;
          }
        }}
      />
    </>
  );
};

export default CancelledOrders;
