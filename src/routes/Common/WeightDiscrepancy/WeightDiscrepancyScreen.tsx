import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import React from 'react';
import {useDiscrepancyService} from '../../../services';
import {DiscrepancyCard} from './components';
import {navigate} from '../../../navigation';
import {CustomText} from '../../../components';
import {NotFound} from '../../../layout';

type Props = {};

const WeightDiscrepancyScreen = (props: Props) => {
  const {discrepancies, loading, loadMore, refreshLoading, onRefresh} =
    useDiscrepancyService();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={discrepancies}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshLoading} onRefresh={onRefresh} />
        }
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <DiscrepancyCard
            item={item}
            onPress={() =>
              navigate('ProductTracking', {
                id: item.orderId,
                wayBill: item.waybill,
              })
            }
          />
        )}
        contentContainerStyle={{paddingBottom: 20}}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={10}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<NotFound title="No data found" />}
      />
    </SafeAreaView>
  );
};

export default WeightDiscrepancyScreen;
