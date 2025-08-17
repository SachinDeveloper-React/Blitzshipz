import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {CustomButton} from '../../../../../../components';

const ShippingMethodCard = ({vendorOptions}: any) => {
  const [isSelected, setIsSelected] = useState(true); // radio button state

  const chartData = Object.values(vendorOptions).map((vendor: any) => ({
    label: vendor.vendorName,
    value: vendor.vendorName, // use vendorName as unique value
    amount: vendor.totalAmount,
  }));

  // dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState(chartData);

  // find selected vendor details
  const selectedVendor = useMemo(
    () => chartData.find(v => v.value === value),
    [value, chartData],
  );

  return (
    <View style={styles.card}>
      <TouchableOpacity
        disabled
        style={styles.radioRow}
        onPress={() => setIsSelected(true)}>
        <View
          style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.radioLabel}>Single Vendor</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>
        Use the same courier service for all orders
      </Text>

      <Text style={styles.dropdownLabel}>Select vendor</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select vendor"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Total Cost */}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Cost:</Text>
        <Text style={styles.totalValue}>
          {selectedVendor ? `Rs. ${selectedVendor.amount}` : 'Rs. --'}
        </Text>
      </View>

      <CustomButton
        title="Placed Order"
        onPress={() => Alert.alert('Comming Soon')}
      />
    </View>
  );
};

export default ShippingMethodCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5faff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d0e3f5',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioOuterActive: {
    borderColor: '#1a73e8',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1a73e8',
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#444',
  },
  dropdownLabel: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: '600',
    color: '#1a73e8',
  },
  dropdown: {
    borderColor: '#1a73e8',
    marginTop: 6,
    minHeight: 45,
  },
  dropdownContainer: {
    borderColor: '#1a73e8',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
});
