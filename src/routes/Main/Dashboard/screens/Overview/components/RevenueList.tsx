import React from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';

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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

export default RevenueList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f8',
    // padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
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
