import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {CustomCard, CustomText} from '../../../../../../components';
import {navigate} from '../../../../../../navigation';
import LottieView from 'lottie-react-native';
import {NotFound} from '../../../../../../layout';
import {RaisedTicketModal} from '../../../../../Settings/Support';
import CustomListing from '../../../../../../components/CustomListing';

type OrderItem = {
  id: string;
  warehouseName: string;
  pickupEmail: string;
  pickupMobile: string;
  pickupPincode: number;
  pickupCity: string;
  pickupState: string;
  pickupAddress: string;
  sellerName: string;
  sellerAddress: string;
  dropName: string;
  dropEmail: string;
  dropMobile: string;
  dropPincode: number;
  dropCity: string;
  dropState: string;
  dropAddress: string;
  productName: string;
  productCategory: string;
  productQuantity: number;
  productPrice: number;
  l: number;
  b: number;
  h: number;
  fragile: boolean;
  orderLive: boolean;
  paymentMode: string;
  totalAmount: number;
  totalTaxes: number;
  actualWeight: number;
  volumentricWeight: number;
  weightCategory: string;
  orderId: string;
  createDate: string;
  status: 'Delivered' | 'Dispatched' | 'In Transit' | 'Manifested';
  waybill: string;
  zone: string;
  rtoMarked: boolean;
  statusType: string;
  statusDateTime: string;
  statusLocation: string;
  instructions: string;
};

type Props = {
  orders: OrderItem[];
  refresh: boolean;
  onRefresh: () => void;
  onLoad: () => void;
};

const OrderList: React.FC<Props> = ({orders, onRefresh, refresh, onLoad}) => {
  return (
    <View style={styles.container}>
      <CustomListing
        data={orders}
        onEndReached={onLoad}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  itemContainer: {
    backgroundColor: '#f9fafb',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  section: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
  },
});

export default OrderList;
