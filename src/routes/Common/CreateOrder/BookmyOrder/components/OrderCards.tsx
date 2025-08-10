import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CustomText} from '../../../../../components';
import {OrderItem} from '../../../../../types';

type Props = {
  item: OrderItem;
  onEdit: (id: string) => void;
  onPay: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (item: OrderItem) => void;
  isSelected: boolean;
  onSelect: () => void;
};

const formatDate = (dateString?: string | null): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const OrderCard: React.FC<Props> = ({
  item,
  onEdit,
  onPay,
  onDelete,
  onPress,
  isSelected,
  onSelect,
}) => {
  return (
    <Pressable
      style={[
        styles.card,
        isSelected && {
          borderWidth: 0.5,
          borderColor: '#05012E',
          backgroundColor: '#D2D1D9',
        },
      ]}
      onLongPress={onSelect}
      onPress={() => onPress(item)}>
      <View style={styles.header}>
        <CustomText variant="subtitle">{item.orderId}</CustomText>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(item.id)}>
            <Icon name="edit" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPay(item.id)}>
            <Icon name="currency-rupee" size={20} color="#34C759" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Icon name="delete" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'column', gap: 4}}>
        <CustomText
          style={{
            color: '#2e2e2e',
          }}
          variant="caption">
          Date: {formatDate(item.createDate)}
        </CustomText>
        <CustomText
          style={{
            color: '#2e2e2e',
          }}>
          {item.productName} - {item.productCategory}
        </CustomText>
        <CustomText
          style={{
            color: '#2e2e2e',
          }}
          variant="caption">
          Qty: {item.productQuantity} | ₹{item.totalAmount}
        </CustomText>
        <CustomText
          style={{
            color: '#2e2e2e',
          }}
          variant="caption">
          Payment: {item.paymentMode}
        </CustomText>
        <CustomText
          style={{
            color: '#2e2e2e',
          }}
          variant="caption">
          Consignee: {item.dropName} ({item.dropCity}, {item.dropState})
        </CustomText>
        <CustomText
          style={{
            color: '#2e2e2e',
          }}
          variant="caption">
          Pickup: {item.pickupCity}, {item.pickupState}
        </CustomText>
        <CustomText
          style={{
            color: '#2e2e2e',
          }}
          variant="caption">
          Weight: {item.actualWeight} kg
        </CustomText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    elevation: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
});

export default OrderCard;
