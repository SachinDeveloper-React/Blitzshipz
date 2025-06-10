import React from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {CustomText, CustomIcons, VendorIcons} from '../../../../components';

type RateData = {
  standered: string;
  weightCategory: string;
  vendorCode: string;
  amount: number;
  zone: string;
  rate: number;
  additionalRate: number;
  codCharges: number;
  weight: number;
  rto: number;
  pickupRating?: number;
  dropRating?: number;
};
const RateCard = ({data}: {data: RateData}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <VendorIcons vendorCode={data.vendorCode ?? ''} />
        <View style={styles.headerText}>
          <CustomText style={styles.standered}>{data.standered}</CustomText>
          <CustomText style={styles.weightCategory}>
            {data.weightCategory}
          </CustomText>
        </View>
      </View>

      <View style={styles.row}>
        <CustomIcons
          name="local-shipping"
          type="MaterialIcons"
          size={18}
          color="#007BFF"
        />
        <CustomText style={styles.label}>Vendor:</CustomText>
        <CustomText style={styles.value}>{data.vendorCode}</CustomText>
      </View>

      <View style={styles.row}>
        <CustomIcons
          name="location-on"
          type="MaterialIcons"
          size={18}
          color="#007BFF"
        />
        <CustomText style={styles.label}>Zone:</CustomText>
        <CustomText style={styles.value}>{data.zone}</CustomText>
      </View>

      <View style={styles.row}>
        <CustomIcons
          name="monitor-weight"
          type="MaterialCommunityIcons"
          size={18}
          color="#007BFF"
        />
        <CustomText style={styles.label}>Weight:</CustomText>
        <CustomText style={styles.value}>{data.weight} kg</CustomText>
      </View>

      <View style={styles.ratingRow}>
        <CustomIcons
          name="star"
          type="MaterialIcons"
          size={16}
          color="#FFC107"
        />
        <CustomText style={styles.ratingText}>
          Pickup: {data.pickupRating || '4.3'}
        </CustomText>
        <CustomIcons
          name="star"
          type="MaterialIcons"
          size={16}
          color="#FFC107"
        />
        <CustomText style={styles.ratingText}>
          Drop: {data.dropRating || '4.4'}
        </CustomText>
      </View>

      <View style={styles.breakLine} />

      <View style={styles.priceRow}>
        <CustomText style={styles.priceLabel}>Rate:</CustomText>
        <CustomText style={styles.priceValue}>₹ {data.rate}</CustomText>
      </View>
      <View style={styles.priceRow}>
        <CustomText style={styles.priceLabel}>Additional:</CustomText>
        <CustomText style={styles.priceValue}>
          ₹ {data.additionalRate}
        </CustomText>
      </View>
      <View style={styles.priceRow}>
        <CustomText style={styles.priceLabel}>COD:</CustomText>
        <CustomText style={styles.priceValue}>₹ {data.codCharges}</CustomText>
      </View>
      <View style={styles.priceRow}>
        <CustomText style={styles.priceLabel}>RTO:</CustomText>
        <CustomText style={styles.priceValue}>₹ {data.rto}</CustomText>
      </View>

      <View style={styles.totalBox}>
        <CustomText style={styles.totalText}>Total: ₹ {data.amount}</CustomText>
      </View>
    </View>
  );
};

const RateCardList = ({rates}: {rates: RateData[]}) => {
  return (
    <FlatList
      data={rates}
      scrollEnabled={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => <RateCard data={item} />}
      contentContainerStyle={{padding: 16}}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vendorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  standered: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  weightCategory: {
    fontSize: 13,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  label: {
    fontSize: 14,
    marginLeft: 6,
    color: '#555',
  },
  value: {
    fontSize: 14,
    marginLeft: 4,
    color: '#000',
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 13,
    marginLeft: 4,
    color: '#444',
  },
  breakLine: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  priceLabel: {
    color: '#666',
    fontSize: 14,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  totalBox: {
    marginTop: 12,
    backgroundColor: '#007BFF10',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default RateCardList;
