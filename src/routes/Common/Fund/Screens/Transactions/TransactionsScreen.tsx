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
import {TransactionCard} from '../../components';
import {NotFound} from '../../../../../layout';

type Props = {};

const TransactionsScreen = (props: Props) => {
  const {transactions, loadMore, getFilterTransactions, loading, onRefresh} =
    useFundService();

  useLayoutEffect(() => {
    getFilterTransactions('transaction', 0);
  }, []);

  if (loading.transaction) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={transactions}
        renderItem={({index, item, separators}) => {
          return <TransactionCard transaction={item} />;
        }}
        keyExtractor={(_, i) => i.toString()}
        onEndReached={() => loadMore('transaction')}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshTransaction}
            onRefresh={() => onRefresh('transaction')}
          />
        }
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        updateCellsBatchingPeriod={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews
        renderToHardwareTextureAndroid
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <NotFound title="No Transactions Found" />}
      />
    </View>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({});
