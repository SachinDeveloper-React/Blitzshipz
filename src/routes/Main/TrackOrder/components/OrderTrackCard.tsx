import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {OrderDetails} from '../../../../types';
import {navigate} from '../../../../navigation';
import {VendorIcons} from '../../../../components';

const OrderTrackCard = ({
  waybill,
  orderLiveDate,
  vendorCode,
  orderId,
  referenceNumber,
  dropName,
  dropCity,
  dropState,
  status,
  statusDateTime,
  id,
}: OrderDetails) => {
  return (
    <View style={styles.card}>
      <VendorIcons vendorCode={vendorCode ?? ''} />
      <View style={styles.row}>
        <Text style={styles.label}>AWB No.:</Text>
        <Text style={styles.value}>{waybill}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date & Time:</Text>
        <Text style={styles.value}>
          {new Date(orderLiveDate).toLocaleString()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Vendor:</Text>
        <Text style={styles.value}>{vendorCode}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>{orderId}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Reference No.:</Text>
        <Text style={styles.value}>{referenceNumber || '-'}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Consignee:</Text>
        <Text style={styles.value}>{dropName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Destination:</Text>
        <Text style={styles.value}>
          {dropCity}, {dropState}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, {color: '#e91e63'}]}>{status}</Text>
      </View>

      <View style={[styles.row, styles.actions]}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigate('ProductTracking', {
              id: id,
              wayBill: waybill,
            })
          }>
          <Text style={styles.actionText}>Track</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: '#2196f3'}]}>
          <Text style={styles.actionText}>Details</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f8fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  filterText: {
    marginLeft: 6,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 130,
    fontWeight: '500',
    color: '#333',
  },
  value: {
    flex: 1,
    color: '#555',
  },
  actions: {
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  topRightImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});

export default OrderTrackCard;
