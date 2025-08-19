import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const OrderSummary = ({data, onClose}: {data: any; onClose?: () => void}) => {
  const {totalOrders, successfulOrders, failedOrders, totalAmount, results} =
    data;

  const renderOrderItem = ({item}: {item: any}) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Order Reference:</Text>
        <Text style={styles.cardValue}>{item.orderReference}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Vendor:</Text>
        <Text style={styles.cardValue}>{item.vendorCode}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Amount:</Text>
        <Text style={styles.cardValue}>₹ {item.amount.toFixed(2)}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Status:</Text>
        <Text
          style={[
            styles.cardValue,
            item.status === 'SUCCESS' ? styles.success : styles.failed,
          ]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Message:</Text>
        <Text style={styles.cardValue}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.headerRow}>
        <Text style={styles.header}>Order Summary</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, {backgroundColor: '#EAF7ED'}]}>
          <Text style={styles.statLabel}>Successful Orders</Text>
          <Text style={[styles.statValue, {color: '#1B7F2A'}]}>
            {successfulOrders}
          </Text>
        </View>
        <View style={[styles.statCard, {backgroundColor: '#FDECEC'}]}>
          <Text style={styles.statLabel}>Failed Orders</Text>
          <Text style={[styles.statValue, {color: '#D32F2F'}]}>
            {failedOrders}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, {backgroundColor: '#F6F6F6'}]}>
          <Text style={styles.statLabel}>Total Orders</Text>
          <Text style={styles.statValue}>{totalOrders}</Text>
        </View>
        <View style={[styles.statCard, {backgroundColor: '#F6F6F6'}]}>
          <Text style={styles.statLabel}>Total Amount</Text>
          <Text style={styles.statValue}>₹ {totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Table Data */}
      <FlatList
        data={results}
        keyExtractor={item => item.orderId}
        renderItem={renderOrderItem}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  closeBtn: {
    fontSize: 20,
    color: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  cell: {
    fontSize: 13,
    color: '#333',
    paddingHorizontal: 6,
  },
  status: {
    fontWeight: '600',
    textAlign: 'center',
    borderRadius: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  cardLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  cardValue: {
    flex: 2,
    fontSize: 13,
    color: '#222',
  },
  success: {
    color: '#1B7F2A',
    fontWeight: '700',
  },
  failed: {
    color: '#D32F2F',
    fontWeight: '700',
  },
});

export default OrderSummary;
