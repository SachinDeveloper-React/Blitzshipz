import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {VendorIcons} from '../../../../../../components';

type Props = {
  data: {
    totalOrders: number;
    vendorOrders: number;
    vendorCode: string;
  }[];
};

const TodayPickupList = ({data}: Props) => {
  const ListItem = ({
    item,
  }: {
    item: {totalOrders: number; vendorOrders: number; vendorCode: string};
  }) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <VendorIcons vendorCode={item.vendorCode} />
          <Text style={styles.revenueText}>{item.vendorOrders}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => <ListItem item={item} />}
      contentContainerStyle={{paddingBottom: 20}}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      initialNumToRender={10}
      updateCellsBatchingPeriod={10}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
    />
  );
};

export default TodayPickupList;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e1e1e',
  },
  countText: {
    fontSize: 14,
    color: '#444',
  },
  revenueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a9d8f',
  },
});
