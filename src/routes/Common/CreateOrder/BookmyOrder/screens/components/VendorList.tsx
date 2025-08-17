import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {VendorIcons} from '../../../../../../components';

type Vendor = {
  vendorCode: string;
  vendorName: string;
  totalAmount: number;
  savings: number;
};

type Props = {
  vendors: Vendor[];
};

const VendorList: React.FC<Props> = ({vendors}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Vendor</Text>
        <Text style={[styles.cell, styles.headerText, {textAlign: 'right'}]}>
          Amount
        </Text>
      </View>

      {/* Vendor Rows */}
      <FlatList
        data={vendors}
        keyExtractor={item => item.vendorCode}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={styles.row}>
            {/* Left: Logo + Name */}
            <View style={styles.vendorInfo}>
              {/* <Image source={{uri: item.logo}} style={styles.logo} /> */}
              <Text style={styles.vendorName}>{item.vendorName}</Text>
              <VendorIcons vendorCode={item.vendorCode} />
            </View>

            {/* Right: Price + Savings */}
            <View style={styles.amountBox}>
              <Text style={styles.amount}>Rs. {item.totalAmount}</Text>
              <Text style={styles.savings}>
                (Save Rs.{item.savings} vs most expensive)
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default VendorList;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: '600',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  vendorInfo: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // flex: 1,
  },
  logo: {
    width: 40,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  vendorName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  amountBox: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  savings: {
    fontSize: 12,
    color: 'green',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
