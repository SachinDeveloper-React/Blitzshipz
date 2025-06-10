import React from 'react';
import {FlatList, View, Text, StyleSheet, Image, Platform} from 'react-native';
import {NotFound} from '../../../../layout';
import {VendorIcons} from '../../../../components';

type RateItem = {
  id: string;
  zone: string;
  rate: number;
  additionalRate: number;
  rto: number;
  rtoAdditional: number;
  weightCategory: string;
  codAmount: number;
  codPercentage: number;
  standard: string;
  vendorCode: string;
  vendorImage?: string;
};

type Props = {
  data: RateItem[];
};

const ShippingRateList: React.FC<Props> = ({data}) => {
  const renderItem = ({item}: {item: RateItem}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.zone}>
          {item.zone} ({item.weightCategory})
        </Text>
        <VendorIcons vendorCode={item.vendorCode ?? ''} />
      </View>

      <Text style={styles.detail}>
        Rate: ₹{item.rate} + ₹{item.additionalRate}/kg
      </Text>
      <Text style={styles.detail}>
        RTO: ₹{item.rto} + ₹{item.rtoAdditional}/kg
      </Text>
      <Text style={styles.detail}>
        COD: ₹{item.codAmount} + {item.codPercentage}%
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>Standard: {item.standard}</Text>
        <Text style={styles.meta}>Vendor: {item.vendorCode}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={<NotFound title="No Data Avaliable" />}
      initialNumToRender={10}
      removeClippedSubviews
      updateCellsBatchingPeriod={10}
      maxToRenderPerBatch={10}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
    // paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 2,
    marginBottom: 12,
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  zone: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    paddingRight: 8,
  },
  vendorImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  detail: {
    fontSize: 14,
    marginBottom: 2,
    color: '#555',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  meta: {
    fontSize: 13,
    color: '#777',
  },
});

export default ShippingRateList;
