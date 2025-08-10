import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTrackingOrderStore} from '../../../../store';
import {CustomIcons, CustomText, CustomTextInput} from '../../../../components';
import {TrackOrderState} from '../../../../store';
import {X} from 'lucide-react-native';
import {DateType} from 'react-native-ui-datepicker';

const today = new Date();
const fiftyYearsAgo = new Date();
fiftyYearsAgo.setFullYear(today.getFullYear() - 50);

const FilterModal = ({
  visible,
  onClose,
  applyFilter,
}: {
  visible: boolean;
  onClose: () => void;
  applyFilter: (body: {
    day?: number;
    orderId?: string;
    paymentMode?: string;
    phoneNumber?: string;
    productCategory?: string;
    referenceNumber?: string;
    status?: string | null;
    fromDate?: DateType | null;
    toDate?: DateType | null;
    vendorCode?: string;
    waybill?: string;
  }) => void;
}) => {
  const {filter, setFilter, clearFilter, setFilterApply} =
    useTrackingOrderStore();
  const defaultFilter = {
    day: 0,
    fromDate: null,
    orderId: '',
    paymentMode: '',
    phoneNumber: '',
    productCategory: '',
    referenceNumber: '',
    status: null,
    toDate: null,
    vendorCode: 'DT',
    waybill: '',
  };

  const isFilterChanged = (filter: TrackOrderState['filter']) => {
    return JSON.stringify(filter) !== JSON.stringify(defaultFilter);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => {
            clearFilter();
            onClose();
          }}
        />
        <View style={styles.modalContent}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.modalTitle}>Filter Orders</Text>
                <X onPress={onClose} />
              </View>

              <Text style={styles.label}>Status</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                {[
                  {label: 'All', value: null},
                  {label: 'Manifested', value: 'Manifested'},
                  {label: 'RTO', value: 'RTO'},
                  {label: 'In Transit', value: 'In Transit'},
                  {label: 'Pending', value: 'Pending'},
                  {label: 'Dispatched', value: 'Dispatched'},
                  {label: 'Delivered', value: 'Delivered'},
                ].map(status => (
                  <Pressable
                    key={status.label}
                    onPress={() => setFilter({status: status.value as any})}
                    style={[
                      styles.chip,
                      filter.status === status.value && styles.chipActive,
                    ]}>
                    <CustomText
                      style={[
                        styles.chipText,
                        filter.status === status.value && styles.chipTextActive,
                      ]}>
                      {status.label}
                    </CustomText>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.label}>Vendor</Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                {[
                  {
                    id: 1,
                    lable: 'Delhivery',
                    symbol: 'DL',
                  },
                  {
                    id: 2,
                    lable: 'DTDC',
                    symbol: 'DT',
                  },
                ].map(v => (
                  <Pressable
                    key={v.id}
                    onPress={() => setFilter({vendorCode: v.symbol})}
                    style={[
                      styles.chip,
                      filter.vendorCode === v.symbol && styles.chipActive,
                    ]}>
                    <CustomText
                      style={[
                        styles.chipText,
                        filter.vendorCode === v.symbol && styles.chipTextActive,
                      ]}>
                      {v.lable}
                    </CustomText>
                  </Pressable>
                ))}
              </View>
              <Text style={styles.label}>Shipment Type</Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginBottom: 20,
                }}>
                {['COD', 'Prepaid'].map(type => (
                  <Pressable
                    key={type}
                    onPress={() => setFilter({paymentMode: type as any})}
                    style={[
                      styles.chip,
                      filter.paymentMode === type && styles.chipActive,
                    ]}>
                    <CustomText
                      style={[
                        styles.chipText,
                        filter.paymentMode === type && styles.chipTextActive,
                      ]}>
                      {type}
                    </CustomText>
                  </Pressable>
                ))}
              </View>
              <CustomTextInput
                label="Drop Phone"
                value={filter.phoneNumber}
                onChangeText={val => setFilter({phoneNumber: val})}
                placeholder="Drop Phone"
                placeholderTextColor="#ccc"
                leftIcon={
                  <CustomIcons
                    type="MaterialIcons"
                    name="local-shipping"
                    size={20}
                    color="gray"
                  />
                }
              />

              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.clearButton}
                  onPress={() => {
                    clearFilter();
                    setFilterApply(false);
                    applyFilter({status: null});
                    onClose();
                  }}>
                  <Text style={styles.clearButtonText}>Clear Filters</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.applyButton,
                    !isFilterChanged(filter) && {opacity: 0.5},
                  ]}
                  onPress={() => {
                    if (!isFilterChanged(filter)) return;
                    setFilterApply(true);
                    applyFilter(filter);
                    onClose();
                  }}
                  disabled={!isFilterChanged(filter)}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </Pressable>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    maxHeight: '90%',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  clearButton: {
    padding: 12,
    backgroundColor: '#f44336',
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  clearButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  applyButton: {
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    flex: 1,
  },
  applyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  chip: {
    borderWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  chipText: {
    fontSize: 13,
    color: '#333',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});
