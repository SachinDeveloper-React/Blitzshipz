import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Transaction} from '../../../../store/fundStore';
import {CustomIcons} from '../../../../components';

type Props = {
  transaction: Transaction;
};

const FundStatusCard: React.FC<Props> = ({transaction}) => {
  const isSuccess = transaction.status === 'SUCCESS';

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <CustomIcons
            type="MaterialIcons"
            name={isSuccess ? 'arrow-circle-down' : 'arrow-circle-up'}
            size={24}
            color={isSuccess ? '#2ecc71' : '#e74c3c'}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.description}>{transaction.description}</Text>
          <Text style={styles.date}>
            {new Date(transaction.createDate).toLocaleString()}
          </Text>
          <Text style={styles.meta}>{transaction.transactionId}</Text>
        </View>
        <View style={styles.amountBox}>
          <Text
            style={[styles.amount, {color: isSuccess ? '#2ecc71' : '#e74c3c'}]}>
            ₹{transaction.amount}
          </Text>
          <Text style={styles.balance}>Bal: ₹{transaction.balance}</Text>
        </View>
      </View>
    </View>
  );
};

export default FundStatusCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBox: {
    marginRight: 12,
    marginTop: 3,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  meta: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 4,
  },
  amountBox: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  balance: {
    fontSize: 11,
    color: '#555',
    marginTop: 2,
  },
});
