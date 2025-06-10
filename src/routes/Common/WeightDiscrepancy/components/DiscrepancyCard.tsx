import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

type DiscrepancyItem = {
  id: string;
  orderRef: string;
  waybill: string;
  weight: number;
  newWeight: number;
  oldAmount: number;
  newAmount: number;
  createDate: string;
  deduction: boolean;
};

type Props = {
  item: DiscrepancyItem;
  onPress: () => void;
};

const DiscrepancyCard: React.FC<Props> = ({item, onPress}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderRef}>#{item.orderRef}</Text>
        <Text style={styles.date}>
          {new Date(item.createDate).toLocaleString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Waybill:</Text>
        <Text style={styles.value}>{item.waybill}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Old Weight:</Text>
        <Text style={styles.value}>{item.weight}g</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>New Weight:</Text>
        <Text style={styles.value}>{item.newWeight}g</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>₹{item.oldAmount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Deduction:</Text>
        <Text style={[styles.value, {color: item.deduction ? 'red' : 'green'}]}>
          {item.deduction ? 'Yes' : 'No'}
        </Text>
      </View>
    </Pressable>
  );
};

export default DiscrepancyCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderRef: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
});
