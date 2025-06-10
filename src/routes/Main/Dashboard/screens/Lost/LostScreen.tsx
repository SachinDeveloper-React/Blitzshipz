import {
  View,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {CustomListing} from '../../../../../components';
import {useDashboardLostService} from '../../../../../services';

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

  return (
    <View style={{flex: 1}}>
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
