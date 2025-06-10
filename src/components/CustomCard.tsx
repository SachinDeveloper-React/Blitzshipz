import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {NDROrder} from '../store/dasboardStore';
import VendorIcons from './VendorIcons';

type Props = {
  order: NDROrder;
  onPress: () => void;
  onLongPress?: () => void;
};

const CustomCard: React.FC<Props> = ({order, onPress, onLongPress}) => {
  const formattedDate = new Date(
    order?.statusDateTime ?? '',
  ).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const statusColor = getStatusColor(order?.status ?? 'pending');

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.waybill}>#{order.waybill}</Text>
          <Text style={[styles.status, {color: statusColor}]}>
            {order.status}
          </Text>
        </View>
        <VendorIcons vendorCode={order.vendorCode ?? ''} />
      </View>

      <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
      <Text style={styles.name}>{order.dropName}</Text>
      <Text style={styles.city}>
        {order.dropCity}, {order.dropState} - {order.dropPincode}
      </Text>

      <View style={styles.footerRow}>
        <Text style={styles.date}>Updated: {formattedDate}</Text>
        <Text style={styles.amount}>₹{order.amount ?? 0}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'cancelled':
      return '#e53935';
    case 'delivered':
      return '#43a047';
    case 'pending':
      return '#fb8c00';
    case 'lost':
      return '#e53935';
    default:
      return '#1e88e5';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  waybill: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e2e2e',
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  topRightImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  orderId: {
    fontSize: 13,
    color: '#616161',
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  city: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  date: {
    fontSize: 12,
    color: '#757575',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e88e5',
  },
});

export default CustomCard;
