import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

type CodSummary = {
  codPaidToday: number | string;
  lastCodRemitted: number | string;
  totalCodRemitted: number | string;
};

type Props = {
  summary: CodSummary;
};

const CodSummaryTabs: React.FC<Props> = ({summary}) => {
  const items = [
    {label: 'Total COD Remitted', value: summary.totalCodRemitted},
    {label: 'Last COD Remitted', value: summary.lastCodRemitted},
    {label: 'COD Paid Today', value: summary.codPaidToday},
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>₹{item.value.toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  card: {
    minWidth: 150,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4,
  },
});

export default CodSummaryTabs;
