// components/PricingCard.tsx
import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {VendorIcons} from '../../../../../../components';

type Props = {
  vendorName?: string;
  weight: number;
  estimatedPickup: string;
  rtoCharges: number;
  zone: string;
  price: number;
  onChoose: () => void;
};

const PricingCard = ({
  vendorName,
  weight,
  estimatedPickup,
  rtoCharges,
  zone,
  price,
  onChoose,
}: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <VendorIcons vendorCode={vendorName ?? ''} />

        <Text style={styles.weightText}>
          {vendorName ? `${vendorName} ` : ''}
          {weight}kg
        </Text>

        <View style={styles.badges}>
          <Text style={styles.badge}>Estimated pickup: {estimatedPickup}</Text>
          <Text style={styles.badge}>RTO Charges: Rs. {rtoCharges}</Text>
          <Text style={styles.badge}>{zone}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.price}>Rs. {price}</Text>
        <Text style={styles.estimateLabel}>Estimated Price</Text>
        <Pressable style={styles.chooseBtn} onPress={onChoose}>
          <Text style={styles.chooseText}>Choose</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flex: 1.3,
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  vendorName: {
    fontSize: 16,
    marginBottom: 4,
  },
  weightText: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    backgroundColor: '#E5E5E5',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    color: '#0F1E35',
    fontWeight: '600',
    marginRight: 6,
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  estimateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  chooseBtn: {
    backgroundColor: '#0F1E35',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  chooseText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default PricingCard;
