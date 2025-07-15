import {
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {CustomListing, ExcelHeader} from '../../../../../components';
import {useDashboardLostService} from '../../../../../services';
import {exportExcel, showToast} from '../../../../../utils';

type Props = {};

const LostScreen = (props: Props) => {
  const {currentPage, lostData, loadMore, loading, onRefresh} =
    useDashboardLostService();

  if (loading.lost) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const exportExcelSheet = async () => {
    try {
      if (lostData.length < 0) return;
      await exportExcel(lostData || [], 'lost');
    } catch (error) {
      console.error('Excel export failed:', error);
      showToast('Failed to export data. Please try again.');
    }
  };

  return (
    <View style={{flex: 1}}>
      <ExcelHeader title="Lost" onPress={exportExcelSheet} />
      <CustomListing
        data={lostData}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshLost}
            onRefresh={onRefresh}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
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
