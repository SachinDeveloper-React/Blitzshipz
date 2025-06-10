import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {RootStackParamList} from '../../../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const getVendorLogo = (vendorCode: string) => {
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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const RemittanceCard = ({
  item,
}: {
  item: {
    id: string;
    userId: string;
    userRef: string;
    vendorCode: string;
    orderId: string;
    orderRef: string;
    deliveredDate: string;
    amount: number;
    remittanceDate: string;
    status: string;
    createDate: string;
    modifyDate: string;
  };
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={getVendorLogo(item.vendorCode)}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <Text style={styles.orderRef}>{item.orderRef}</Text>
          <Text style={styles.date}>
            Delivered: {formatDate(item.deliveredDate)}
          </Text>
          <Text style={styles.date}>
            Remit by: {formatDate(item.remittanceDate)}
          </Text>
          <Text style={styles.transactionId}>User Ref: {item.userRef}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'Pending' ? '#FFE9C1' : '#D4EDDA',
            },
          ]}>
          <Text
            style={[
              styles.statusText,
              {color: item.status === 'Pending' ? '#FF9800' : '#388E3C'},
            ]}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.amountSection}>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={styles.amount}>₹{item.amount}</Text>
      </View>
    </View>
  );
};

const RemittanceScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'RemittanceScreen'>) => {
  const {list} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingVertical: 12}}
        renderItem={({item}) => <RemittanceCard item={item} />}
        removeClippedSubviews
        initialNumToRender={10}
        updateCellsBatchingPeriod={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  orderRef: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  date: {
    fontSize: 13,
    color: '#666',
  },
  transactionId: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  amountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  amountLabel: {
    fontSize: 14,
    color: '#999',
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
});

export default RemittanceScreen;
