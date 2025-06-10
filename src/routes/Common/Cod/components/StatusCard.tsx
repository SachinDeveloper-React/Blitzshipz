import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from 'react-native';

type CardProps = {
  title: string;
  subtitle: string;
  amount: string;
  vendorCode: string;
  transactionID: string | number | null;
  status: 'Pending' | 'Completed';
  onPress: () => void;
};

const getVendorLogo = (vendorCode: string): ImageSourcePropType => {
  switch (vendorCode) {
    case 'DT':
      return require('../../../../assets/logo/dtdc.jpg');
    case 'EX':
      return require('../../../../assets/logo/Express.png');
    case 'DL':
      return require('../../../../assets/logo/delhivery.webp');
    default:
      return require('../../../../assets/logo/dtdc.jpg');
  }
};

const StatusCard = ({
  title,
  subtitle,
  amount,
  status,
  transactionID,
  vendorCode,
  onPress,
}: CardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={getVendorLogo(vendorCode)}
            style={styles.logo}
            resizeMode="contain"
          />
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: status === 'Pending' ? '#FFE9C1' : '#D4EDDA',
              },
            ]}>
            <Text
              style={[
                styles.statusText,
                {color: status === 'Pending' ? '#FF9800' : '#388E3C'},
              ]}>
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.subtitle}>Txn ID: {transactionID ?? '--'}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.amountLabel}>Total</Text>
        <Text style={styles.amount}>₹{amount}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
    marginTop: 8,
  },
  amountLabel: {
    fontSize: 14,
    color: '#999',
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
});

export default StatusCard;
