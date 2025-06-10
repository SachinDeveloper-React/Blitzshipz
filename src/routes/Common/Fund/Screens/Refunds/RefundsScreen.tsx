import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useFundService} from '../../../../../services';
import {FundStatusCard} from '../../components';

type Props = {};

const RefundsScreen = (props: Props) => {
  const {refundes, getFilterTransactions, loadMore, loading, onRefresh} =
    useFundService();

  useLayoutEffect(() => {
    getFilterTransactions('refunds', 0);
  }, []);

  if (loading.refunds) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={refundes}
        renderItem={({index, item, separators}) => {
          return <FundStatusCard transaction={item} />;
        }}
        keyExtractor={(_, i) => i.toString()}
        onEndReached={() => loadMore('refunds')}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshRefunds}
            onRefresh={() => onRefresh('refunds')}
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

export default RefundsScreen;

const styles = StyleSheet.create({});
