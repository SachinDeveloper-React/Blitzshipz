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

const DeductionsScreen = (props: Props) => {
  const {deductions, getFilterTransactions, loadMore, loading, onRefresh} =
    useFundService();

  useLayoutEffect(() => {
    getFilterTransactions('deductions', 0);
  }, []);

  if (loading.deductions) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={deductions}
        renderItem={({index, item, separators}) => {
          return <FundStatusCard transaction={item} />;
        }}
        keyExtractor={(_, i) => i.toString()}
        onEndReached={() => loadMore('deductions')}
        refreshControl={
          <RefreshControl
            refreshing={loading.refreshDeductions}
            onRefresh={() => onRefresh('deductions')}
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

export default DeductionsScreen;

const styles = StyleSheet.create({});
