import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {OrderDetails, OrderItem} from '../../../../types';
import {VendorIcons} from '../../../../components';

type Props = {
  order: OrderDetails | OrderItem;
};

const ShipmentDetails = ({order}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Shipment Details</Text>

      <Card title="🧾 Order Summary">
        {order.vendorCode && (
          <VendorIcons vendorCode={order.vendorCode ?? ''} />
        )}

        <Field label="Waybill" value={order.waybill ? order.waybill : 'N/A'} />
        <Field label="Order ID" value={order.orderId} />
        <Field
          label="Product"
          value={`${order.productName} (${order.productCategory})`}
        />
        <Field label="Quantity" value={order.productQuantity.toString()} />
        <Field label="Price" value={`₹${order.productPrice}`} />
        <Field label="Payment Mode" value={order.paymentMode} />
        <Field
          label="Total Amount"
          value={`₹${order.totalAmount} (Includes ₹${order.totalTaxes} taxes)`}
        />
      </Card>

      <Card title="📦 Pickup Info">
        <Field label="Name" value={order.pickupName || 'Not specified'} />
        <Field label="Phone" value={order.pickupMobile} />
        <Field label="Email" value={order.pickupEmail} />
        <Field label="Address" value={order.pickupAddress} />
        <Field
          label="City & State"
          value={`${order.pickupCity}, ${order.pickupState} - ${order.pickupPincode}`}
        />
      </Card>

      <Card title="📬 Delivery Info">
        <Field label="Name" value={order.dropName} />
        <Field label="Phone" value={order.dropMobile} />
        <Field label="Email" value={order.dropEmail || '--'} />
        <Field label="Address" value={order.dropAddress} />
        <Field
          label="City & State"
          value={`${order.dropCity}, ${order.dropState} - ${order.dropPincode}`}
        />
      </Card>

      <Card title="📁 Additional Info">
        <Field
          label="Seller & Address"
          value={`${order.sellerName || '--'} (${order.sellerAddress || '--'})`}
        />
        <Field label="Fragile" value={order.fragile ? 'Yes' : 'No'} />
        <Field label="Weight Category" value={`${order.weightCategory}`} />
        <Field
          label="Weight"
          value={`${order.actualWeight} kg (Vol: ${order.volumentricWeight} m³)`}
        />
        <Field
          label="Dimensions"
          value={`L: ${order.l} x B: ${order.b} x H: ${order.h} cm`}
        />
        <Field label="Zone" value={order.zone} />
        <Field
          label="Vendor Code"
          value={order.vendorCode ? order.vendorCode : 'N/A'}
        />
      </Card>

      <Card title="🚚 Current Status">
        <Field label="Status" value={order.status ? order.status : 'N/A'} />
        <Field
          label="Updated At"
          value={
            order.statusDateTime
              ? new Date(order.statusDateTime).toLocaleString()
              : 'N/A'
          }
        />
        <Field
          label="Instructions"
          value={order.instructions ? order.instructions : 'N/A'}
        />
      </Card>
    </View>
  );
};

// Reusable Card
const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    {children}
  </View>
);

// Reusable Field
const Field = ({label, value}: {label: string; value: string}) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1D3557',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#457B9D',
  },
  field: {
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
  topRightImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});

export default ShipmentDetails;
