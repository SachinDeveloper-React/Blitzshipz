import React from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {NotFound} from '../../../../../../layout';
import {CustomText} from '../../../../../../components';

type RevenueData = {
  count: number;
  date: string;
  revenue: number;
}[];

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

const ListItem = ({
  item,
}: {
  item: {date: string; count: number; revenue: number};
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.dateText}>📅 {formatDate(item.date)}</Text>
        <Text style={styles.countText}>🛒 Orders: {item.count}</Text>
      </View>
      <Text style={styles.revenueText}>
        💰 Revenue: ₹{item.revenue.toLocaleString()}
      </Text>
    </View>
  );
};

const RevenueList = ({data}: {data: RevenueData}) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => <ListItem item={item} />}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      initialNumToRender={10}
      updateCellsBatchingPeriod={10}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      ListEmptyComponent={() => (
        <CustomText
          variant="subtitle"
          style={{textAlign: 'center', padding: 20}}>
          No Data Found
        </CustomText>
      )}
    />
  );
};

export default RevenueList;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 6,
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
