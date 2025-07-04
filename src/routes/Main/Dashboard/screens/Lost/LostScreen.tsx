import {
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {CustomListing} from '../../../../../components';
import {useDashboardLostService} from '../../../../../services';
import {exportExcel} from '../../../../../utils';

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
      console.log('Error on excel ->', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 16,
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity onPress={exportExcelSheet}>
          <Image
            source={require('../../../../../assets/excelImage.png')}
            style={{width: 60, height: 60}}
            resizeMethod="scale"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
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
