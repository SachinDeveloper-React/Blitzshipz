import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useCodService} from '../../../services';
import {CodSummaryTabs, StatusCard} from './components';
import {navigate} from '../../../navigation';
import {CustomText} from '../../../components';
import {NotFound} from '../../../layout';

type Props = {};

const CodScreen = (props: Props) => {
  const {summary, remittances, loadMore, loading, onRefresh} = useCodService();

  if (loading.codLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <FlatList
          data={remittances}
          renderItem={({index, item}) => {
            return (
              <StatusCard
                onPress={() =>
                  navigate('RemittanceScreen', {
                    list: item.codRemittances,
                  })
                }
                vendorCode={item.vendorCode}
                title={item.remittanceNumber}
                transactionID={item.transactionId}
                subtitle={item.dueDate}
                amount={item.amountPayable.toString()}
                status={item.status as 'Pending' | 'Completed'}
              />
            );
          }}
          ListHeaderComponent={() => (
            <CodSummaryTabs
              summary={{
                codPaidToday: summary?.codPaidToday || 0,
                lastCodRemitted: summary?.lastCodRemitted || 0,
                totalCodRemitted: summary?.totalCodRemitted || 0,
              }}
            />
          )}
          ListEmptyComponent={<NotFound title="No data found" />}
          refreshControl={
            <RefreshControl
              refreshing={loading.refreshCodLoading}
              onRefresh={onRefresh}
            />
          }
          keyExtractor={(_, i) => _.id.toString()}
          removeClippedSubviews
          initialNumToRender={10}
          updateCellsBatchingPeriod={10}
          maxToRenderPerBatch={10}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default CodScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
