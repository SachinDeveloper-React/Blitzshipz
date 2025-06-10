import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {FundStatusCard, TransactionCard} from '../../components';
import {useFundService} from '../../../../../services';

type Props = {};

const RechargesScreen = (props: Props) => {
  const {recharges, getFilterTransactions, loadMore, loading, onRefresh} =
    useFundService();

  useLayoutEffect(() => {
    getFilterTransactions('rechanges', 0);
  }, []);

  if (loading.recharges) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={recharges}
        renderItem={({index, item, separators}) => {
          return <FundStatusCard transaction={item} />;
        }}
        keyExtractor={(_, i) => i.toString()}
        onEndReached={() => loadMore('rechanges')}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshRecharges}
            onRefresh={() => onRefresh('rechanges')}
          />
        }
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        updateCellsBatchingPeriod={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews
        renderToHardwareTextureAndroid
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RechargesScreen;

const styles = StyleSheet.create({});
